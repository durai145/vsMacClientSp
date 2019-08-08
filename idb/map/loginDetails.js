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

var InternalServer = require("../../libs/error/InternalServer");
exports.doLogin=function(inSchema, inJson, inRespSchema, callback) {
	//console.log("in loginDetails.doLogin");
	//console.log(inJson);
	//doLogin1(inJson[0].LoginDetails[0], function(err) {
	var outJson =  {
		"loginDetailsResponse":{	
					"userDetails":
							{
							"firstName" : "Duraimurugan",
							"lastName" : "dummy",
							"grpName" : "role",
							"prodVersion": "A1" ,
							"prtlName" : "MyRoomexpense"}
					,"entitlement":{"link": "test1",
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
							 ]}
			}
};

var userDetails = inJson.loginDetailsRequest.userDetails;
var portalDetails = inJson.loginDetailsRequest.portalDetails;
log.debug("userDetails=" + JSON.stringify(userDetails, null, 4));
log.debug("portalDetails=" + JSON.stringify(portalDetails, null, 4));

log.info("calling GPASSO_SSID003MT_Model=" + JSON.stringify(inJson, null, 4));
GPASSO_SSID003MT_Model.findOne({"username": userDetails.username},function (err, ssid) {
				
				if(err) {
					log.error("in doLogin:" , err);
					return callback&&callback(new InternalServer("Interal Server"));
				} else {
					if (ssid == null) {
					//	return callback&&callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"002","responseDesc":"Username / password is wrong"}]}]}] );
						return callback&&callback(new AuthorizationFailure("Usernmae / Password is wrong") );
					}
					 
					
					 
					 log.info("calling GPASSO_PROD001MT_Model");
					GPASSO_PROD001MT_Model.findOne({ "usrIds"  : { $in : [ssid._id] }}).populate("prtlIds").exec(function (err, prod) {
						if(err) {
							log.error("in doLogin:" , err);
							return callback&&callback(new InternalServer("Interal Server"));
						}
						log.info("calling GPASSO_PRTL002MT_Model");							
						GPASSO_PRTL002MT_Model.find({_id : {$in : prod.prtlIds } , prtlName: portalDetails.portalKey}).exec(function(err,prtl) {
						if(err) {
							log.error("in doLogin:" , err);
							return callback&&callback(new InternalServer("Interal Server"));
						} 
						
						if ((prtl == null) || (prtl == undefined) || (prtl.length == 0)) {
							log.error("raising AuthorizationFailure Exception");
							return callback&&callback(new AuthorizationFailure("Your access is denied for Portal:[ " + portalDeatils.portalKey  + "]") );
						}
							var roleIds = new Array();
							prtl.forEach(function(prtlObj) {
									prtlObj.roleIds.forEach(function(roleId) { roleIds.push(roleId); });
							});
							
						//	console.log("roleIds:" , roleIds);
								GPASSO_ROLE003MT_Model.findOne({ _id: {$in : roleIds } , usrIds : {$in : [ssid._id]}}).populate("pageGrpIds").exec(function(err, role) {
									if(err) {
										log.error("in doLogin:" , err);
										return callback&&callback(new InternalServer("Interal Server"));
									} 
									if (role == null ) {
										return callback&&callback(new AuthorizationFailure("No rolse is found") );
									}
									
									
									GPASSO_PGGR004MT_Model.find( { _id : { $in :role.pageGrpIds} }).populate("pageIds").exec( function(err,pggr) {

										log.info("pggr:"  + pggr);
										log.info("pggr.pageGrpIds:"  + pggr[0].pageIds);
										var entitlement = new Array();
										pggr.forEach(function(pageGrpId) {
											
												var childs = new Array();
												pageGrpId.pageIds.forEach( function (pageId) {
														childs.push(
														{	"link": pageId.pageKey,
															"linkName": pageId.pageTitle,
															"uid": pageId._id,
															"dataType": "NODE",
															"childs" : []
														});
												}); 
												
												entitlement.push(
												{"link":   pageGrpId.pageGrpKey,
													"linkName": pageGrpId.pageGrpTitle,
													"uid": pageGrpId._id,
													"dataType": "CONTAINER",
													"childs" : childs
												
												});
											
										}); 
									
										 outJson.loginDetailsResponse.userDetails.lastName = ssid.lastName;
										 outJson.loginDetailsResponse.userDetails.firstName = ssid.firstName;
										 outJson.loginDetailsResponse.userDetails.grpName = role.roleName;
										 outJson.loginDetailsResponse.userDetails.prtlName = prod.prodName + " " + prtl[0].prtlName;
										 outJson.loginDetailsResponse.userDetails.prodVersion = prod.prodVersion + " " + prtl[0].prtlVersion;
										 outJson.loginDetailsResponse.entitlement = entitlement;
										return callback&&callback(  null, inRespSchema, outJson);
									});
								});

							
							
						});
					});
			}
		});
	//});
	
};

