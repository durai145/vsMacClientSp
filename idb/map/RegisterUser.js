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
	GPASSO_PROD001MT_Model.findOne({
		prodVersion: '1',
		prodName: 'GLOBAL_PROD_ADMIN'
	}, function (err, prod) {
// raise prod is not found
		GPASSO_PRTL002MT_Model.findOne({
			prtlVersion: '001',
			prtlName: 'Member Portal'
		}, function (err, prtl) {

			//raise portal is not found

			//dob can be added
			var ssid = new GPASSO_SSID003MT_Model({
				userRole: 'Internal',
				userType: 'Member',
				empId: 'H1450004',
				emailId: 'sakthi.govindaraj',
				password: '1qaz2wsx',
				username: 'H1450003',
				middleName: '',
				lastName: 'Govindaraj',
				firstName: 'Sakthi',
				dtModified: new Date(),
				athId: 1,
				dtCreated: new Date(),
				mkrId: 1
			});

			GPASSO_ROLE003MT_Model.findOne({
				status: 'ACTIVE',
				roleName: 'SEC_ADMIN'
			}, function (err, role) {

				// role is invalid

				GPASSO_SSID003MT_Model.find({
					lastName: ssid.lastName,
					firstName: ssid.firstName,
					emailId: ssid.emailId
				}, function (err, dupSid) {
					//handle database 
					if (err) {

					}

					if (dupSid.length != 0) {
						return callback && callback(new Error("Duplcate Check"), {
							"status": "Already exists"
						});
					}


					ssid.save(function (err) {
						if (err) {
							return callback && callback(err, {
								"status": "Unable to save ssid : [" + ssid + "]"
							});
						}
						console.log("ssid saved");


						console.log(role);
						role.usrIds.push(ssid);
						prod.usrIds.push(ssid);
						GPASSO_ROLE003MT_Model.update({
							"status": "ACTIVE",
							"roleName": "SEC_ADMIN"
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
								prodName: 'GLOBAL_PROD_ADMIN'
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
								return callback && callback(new Error("Schema"), {
									"status": "Saved"
								})

							});


						});

					});

				});

			});

		});
	});
}