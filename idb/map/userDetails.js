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
exports.isValidUser=function(inSchema, inJson, inRespSchema, callback) {
	//console.log("in loginDetails.doLogin");
	//console.log(inJson);
	//doLogin1(inJson[0].LoginDetails[0], function(err) {
//[{"isValidUserRequest":[{"userDetails":[{"emailId":"email Id"}],"portalDetails":[{"portalKey":"Portal Key"}]}]}]
	var outJson =  [{"isValidUserResponse":[{"userDetails":[{"firstName":"first Name","lastName":"Last Name","userRole":"User Role"}]}]}];

var userDetails = inJson[0].isValidUserRequest[0].userDetails[0];
var portalDeatils = inJson[0].isValidUserRequest[0].portalDetails[0];

log.info("calling GPASSO_SSID003MT_Model");
GPASSO_SSID003MT_Model.findOne({$or : [{"emailId": userDetails.emailId}, {"empId": userDetails.emailId}]},function (err, ssid) {
				
				if(err) {
					log.error("in doLogin:" , err);
					return callback&&callback(new InternalServer("Interal Server"));
				} else {
					if (ssid == null) {
					//	return callback&&callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"002","responseDesc":"Username / password is wrong"}]}]}] );
						return callback&&callback(new AuthorizationFailure("Username/EmailId is wrong[userDetails.emailId=" + userDetails.emailId +"]" ));
					}
					 
					
					 
					 log.info("calling GPASSO_PROD001MT_Model");
					GPASSO_PROD001MT_Model.findOne({ "usrIds"  : { $in : [ssid._id] }}).populate("prtlIds").exec(function (err, prod) {
						if(err) {
							log.error("in doLogin:" , err);
							return callback&&callback(new InternalServer("Interal Server"));
						}
						log.info("calling GPASSO_PRTL002MT_Model");							
						GPASSO_PRTL002MT_Model.find({_id : {$in : prod.prtlIds } , prtlName: portalDeatils.portalKey}).exec(function(err,prtl) {
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
									
										 outJson[0].isValidUserResponse[0].userDetails[0].lastName = ssid.lastName;
										 outJson[0].isValidUserResponse[0].userDetails[0].firstName = ssid.firstName;
										 outJson[0].isValidUserResponse[0].userDetails[0].userRole = ssid.userRole;
										 //outJson[0].isValidUserResponse[0].userDetails[0].grpName = role.roleName;
										 //outJson[0].isValidUserResponse[0].userDetails[0].prtlName = prod.prodName + " " + prtl[0].prtlName;
										// outJson[0].isValidUserResponse[0].userDetails[0].prodVersion = prod.prodVersion + " " + prtl[0].prtlVersion;
		//								 outJson[0].isValidUserResponse[0].entitlement = entitlement;
										return callback&&callback(  null, inRespSchema, outJson);
									});
								});

							
							
						});
					});
			}
		});
	//});
	
};

