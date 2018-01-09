var log = require('../libs/log')(module);
var mongoose = require('../libs/gpassov3').mongoose;
var ErrorResponseSchema = require('../../jsonSchema/ErrorResponseSchema.json');
var GPASSO_PROD001MT_Model = require('../libs/gpassov3').GPASSO_PROD001MT_Model;
var GPASSO_SRVS006MT_Model = require('../libs/gpassov3').GPASSO_SRVS006MT_Model;
var GPASSO_PRTL002MT_Model = require('../libs/gpassov3').GPASSO_PRTL002MT_Model;
var GPASSO_ROLE003MT_Model = require('../libs/gpassov3').GPASSO_ROLE003MT_Model;
var GPASSO_PGGR004MT_Model = require('../libs/gpassov3').GPASSO_PGGR004MT_Model;
var GPASSO_SSID003MT_Model = require('../libs/gpassov3').GPASSO_SSID003MT_Model;
var GPASSO_PAGE005MT_Model = require('../libs/gpassov3').GPASSO_PAGE005MT_Model;
var ObjectId = mongoose.Types.ObjectId;

exports.saveRegisterUser = function (inSchema, inJson, inRespSchema, callback) {
	console.log(inJson);

	var outJson =  [
		{
			"registerUserResponse": [
				{
					"statusDetails": [
						{
							"statusCode": "000",
							"statusDescr": "Successfully saved."
						}
					]
				}
			]
		}
	] ;

	var prodQuery = {
		prodVersion: inJson[0].registerUserRequest[0].prodDetails[0].prodVersion,
		prodName: inJson[0].registerUserRequest[0].prodDetails[0].prodName
	};
	GPASSO_PROD001MT_Model.findOne(prodQuery, function (err, prod) {

		if (err) {
			return callback && callback(err, {
				"status": "Unable to select product" + JSON.stringify(prodQuery)
			});
		}
		if (!prod) {
			return callback && callback(new Error("Invalid product details [" + JSON.stringify(prodQuery) + "]"), null);
		}

		var prtlQuery = {
			prtlVersion: inJson[0].registerUserRequest[0].prodDetails[0].prtlVersion,
			prtlName: inJson[0].registerUserRequest[0].prodDetails[0].prtlName
		};
		GPASSO_PRTL002MT_Model.findOne(prtlQuery, function (err, prtl) {

			if (err) {
				return callback && callback(err, {
					"status": "Unable to select protal " + JSON.stringify(prtlQuery)
				});
			}
			if (!prtl) {
				return callback && callback(new Error("Invalid protal details [" + JSON.stringify(prtlQuery) + "]"), null);
			}
			//raise portal is not found
			/*
			inJson[0].registerUserRequest[0].userDetails[0].userRole
			inJson[0].registerUserRequest[0].userDetails[0].userType
			inJson[0].registerUserRequest[0].userDetails[0].empId
			inJson[0].registerUserRequest[0].userDetails[0].emailId
			inJson[0].registerUserRequest[0].userDetails[0].username
			inJson[0].registerUserRequest[0].userDetails[0].lastName
			inJson[0].registerUserRequest[0].userDetails[0].firstName

			inJson[0].registerUserRequest[0].prodDetails[0].prodName
			inJson[0].registerUserRequest[0].prodDetails[0].prodVersion
			inJson[0].registerUserRequest[0].prodDetails[0].prtlName
			inJson[0].registerUserRequest[0].prodDetails[0].prtlVersion
			inJson[0].registerUserRequest[0].prodDetails[0].roleName
			*/
			//dob can be added
			var roleQuery = {
				status: 'ACTIVE',
				roleName: inJson[0].registerUserRequest[0].prodDetails[0].roleName
			};
			GPASSO_ROLE003MT_Model.findOne(roleQuery, function (err, role) {
				if (err) {
					return callback && callback(err, {
						"status": "Unable to select role " + JSON.stringify(roleQuery)
					});
				}
				if (!role) {
					return callback && callback(new Error("Invalid Role [" + JSON.stringify(roleQuery) + "]"), null);
				}
				var ssidDupQuery= {
					lastName: inJson[0].registerUserRequest[0].userDetails[0].lastName,
					firstName: inJson[0].registerUserRequest[0].userDetails[0].firstName,
					emailId: inJson[0].registerUserRequest[0].userDetails[0].emailId
				};
				GPASSO_SSID003MT_Model.find(ssidDupQuery, function (err, dupSid) {
					//handle database 
					if (err) {
						return callback && callback(err, {
							"status": "Unable to select ssid " + JSON.stringify(ssidDupQuery)
						});
					}

					if (dupSid.length != 0) {
						return callback && callback(new Error("Alerady Exists [" + JSON.stringify(ssidDupQuery)+ "]"), {
							"status": "Already exists"
						});
					}
					var ssid = new GPASSO_SSID003MT_Model({
						userRole: inJson[0].registerUserRequest[0].userDetails[0].userRole,
						userType: inJson[0].registerUserRequest[0].userDetails[0].userType,
						empId: inJson[0].registerUserRequest[0].userDetails[0].empId,
						emailId: inJson[0].registerUserRequest[0].userDetails[0].emailId,
						password: '1qaz2wsx',
						username: inJson[0].registerUserRequest[0].userDetails[0].username,
						middleName: '',
						lastName: inJson[0].registerUserRequest[0].userDetails[0].lastName,
						firstName: inJson[0].registerUserRequest[0].userDetails[0].firstName,
						dtModified: new Date(),
						athId: 1,
						dtCreated: new Date(),
						mkrId: 1
					});


					ssid.save(function (err) {
						if (err) {
							return callback && callback(err, {
								"status": "Unable to save ssid : [" + ssid + "]"
							});
						}
						console.log("ssid saved");
						role.usrIds.push(ssid);
						prod.usrIds.push(ssid);
						GPASSO_ROLE003MT_Model.update({
							"status": "ACTIVE",
							"roleName": inJson[0].registerUserRequest[0].prodDetails[0].roleName
						}, {
							$addToSet: {
								"usrIds": ssid.id
							}
						}, function (err) {
							if (err) {
								return callback && callback(err, {
									"status": "Unable to save role : [" + role + "]"
								});
							}
							console.log("role saved");

							GPASSO_PROD001MT_Model.update({
								prodVersion: '1',
								prodName: inJson[0].registerUserRequest[0].prodDetails[0].prodName
							}, {
								$addToSet: {
									"usrIds": ssid.id
								}
							}, function (err) {
								if (err) {
									return callback && callback(err, {
										"status": "Unable to save role : [" + role + "]"
									});
								}
								console.log("prod saved");
								return callback && callback(null, inRespSchema, outJson)
							});
						});
					});
				});
			});
		});
	});
}