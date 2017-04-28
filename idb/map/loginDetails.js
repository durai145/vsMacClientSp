var log                 = require('../libs/log')(module);
var AuthorizationFailure = require("../../libs/error/AuthorizationFailure");
var mongoose            = require('../libs/gpassov3').mongoose;
var ErrorResponseSchema = require('../../jsonSchema/ErrorResponseSchema.json');
var GPASSO_PROD001MT_Model   = require('../libs/gpassov3').GPASSO_PROD001MT_Model;
var GPASSO_SRVS006MT_Model   = require('../libs/gpassov3').GPASSO_SRVS006MT_Model;
var GPASSO_PRTL002MT_Model   = require('../libs/gpassov3').GPASSO_PRTL002MT_Model;
var GPASSO_ROLE003MT_Model   = require('../libs/gpassov3').GPASSO_ROLE003MT_Model;
var GPASSO_PGGR004MT_Model   = require('../libs/gpassov3').GPASSO_PGGR004MT_Model;
var GPASSO_SSID003MT_Model   = require('../libs/gpassov3').GPASSO_SSID003MT_Model;
var GPASSO_PAGE005MT_Model   = require('../libs/gpassov3').GPASSO_PAGE005MT_Model;
var ObjectId = mongoose.Types.ObjectId;


doLogin1=function(loginDetails, callback) {
	loginDetails= loginDetails|| {};
//		if (loginDetails.username != undefined ||  loginDetails.password  != undefined ||   loginDetails.prtlKey != undefined) {
//			callback&&callback(new Error(""), {});
//		} else {
			GPASSO_SSID003MT_Model.findOne({"username": loginDetails.username},function (err, ssid) {
				if(err) {
					callback&&callback({ "respCode"  : "500" , "respDesc" : "Internal Server Error"}, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"000","responseDesc":"Successfully saved"}]}]}] );
				} else {
					GPASSO_PROD001MT_Model.findOne({ "usrIds"  : { $in : [ssid._id] }}).populate("prtlIds").exec(function (err, prod) {
						GPASSO_PRTL002MT_Model.find({_id : {$in : prod.prtlIds } , prtlName: 'Member Portal'}).exec(function(err,prtl) {
							prtl.forEach(function(prtlObj) {
								GPASSO_ROLE003MT_Model.findOne({ _id: {$in : prtlObj.roleIds} , usrIds : {$in : [ssid._id]}}).populate("pageGrpIds").exec(function(err,role) {
									GPASSO_PGGR004MT_Model.find( { _id : { $in :role.pageGrpIds} }).populate("pageIds").exec( function(err,pggr) {
										callback&&callback(  null, {"respCode" : "200", "respDesc" : "Success", "resp" : pggr});
									});
								});
							});
						});
					});
			}
		});
//	}
}

exports.doLogin=function(inSchema, inJson, inRespSchema, callback) {
	//console.log("in loginDetails.doLogin");
	//console.log(inJson);
	//doLogin1(inJson[0].LoginDetails[0], function(err) {
	var outJson =  [{"loginDetailsResponse":[{	"userDetails":[{"firstName" : "Duraimurugan",
							"lastName" : "Govindaraj",
							"grpName" : "SecAdmin",
							"prodVersion": "A1" ,
							"prtlName" : "MyRoomexpense"}]
					,"entitlement":[{"link": "test1",
							"linkName": "linkName",
							"uid": "001",
							"dataType": "CONTAINER",
							"childs" : [
								{"link": "test1",
								"linkName": "linkName",
								"uid": "001",
								"dataType": "NODE",
								"childs" : []
								},
								{"link": "test2",
								"linkName": "linkName2",
								"uid": "002",
								"dataType": "NODE",
								"childs" : []
								}
							 ]}]
			}]
}];
//[{"loginDetailsRequest":[{"userDeatils":[{"username":"Username","password":"Password"}], "portalDeatils":[{"portalKey":"MYROOMEXPENSE"}]}]}];

console.log(JSON.stringify(inJson));
//[{"loginDetailsRequest":[{"userDeatils":[{"username":"Username","password":"Password"}],"portalDeatils":[{"portalKey":"MYROOMEXPENSE"}]}]}]

var userDetails = inJson[0].loginDetailsRequest[0].userDeatils[0];

console.log(JSON.stringify(inJson[0].loginDetailsRequest[0].userDeatils[0]));

GPASSO_SSID003MT_Model.findOne({"username": userDetails.username},function (err, ssid) {
				if(err) {
					return callback&&callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"000","responseDesc":"Successfully saved"}]}]}] );
				} else {
					if (ssid == null) {
					//	return callback&&callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"002","responseDesc":"Username / password is wrong"}]}]}] );
						return callback&&callback(new AuthorizationFailure("Usernmae / Password is wrong") );
					}
					GPASSO_PROD001MT_Model.findOne({ "usrIds"  : { $in : [ssid._id] }}).populate("prtlIds").exec(function (err, prod) {
						GPASSO_PRTL002MT_Model.find({_id : {$in : prod.prtlIds } , prtlName: 'Member Portal'}).exec(function(err,prtl) {
							prtl.forEach(function(prtlObj) {
								GPASSO_ROLE003MT_Model.findOne({ _id: {$in : prtlObj.roleIds} , usrIds : {$in : [ssid._id]}}).populate("pageGrpIds").exec(function(err,role) {
									GPASSO_PGGR004MT_Model.find( { _id : { $in :role.pageGrpIds} }).populate("pageIds").exec( function(err,pggr) {
										return callback&&callback(  null, {"respCode" : "200", "respDesc" : "Success", "resp" : pggr});
									});
								});
							});
						});
					});
			}
		});
	//});
	
};

