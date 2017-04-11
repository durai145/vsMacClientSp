var log                 = require('../libs/log')(module);
var mongoose            = require('../libs/gpassov3').mongoose;
var GPASSO_PROD001MT_Model   = require('../libs/gpassov3').GPASSO_PROD001MT_Model;
var GPASSO_SRVS006MT_Model   = require('../libs/gpassov3').GPASSO_SRVS006MT_Model;
var GPASSO_PRTL002MT_Model   = require('../libs/gpassov3').GPASSO_PRTL002MT_Model;
var GPASSO_ROLE003MT_Model   = require('../libs/gpassov3').GPASSO_ROLE003MT_Model;
var GPASSO_PGGR004MT_Model   = require('../libs/gpassov3').GPASSO_PGGR004MT_Model;
var GPASSO_SSID003MT_Model   = require('../libs/gpassov3').GPASSO_SSID003MT_Model;
var GPASSO_PAGE005MT_Model   = require('../libs/gpassov3').GPASSO_PAGE005MT_Model;
var ObjectId = mongoose.Types.ObjectId;


doLogin=function(loginDetails, callback) {
	loginDetails= loginDetails|| {};
		if (loginDetails.username != undefined ||  loginDetails.password  != undefined ||   loginDetails.prtlKey != undefined) {
			callback&&callback( { "respCode"  : "400" , "respDesc" : "Invalid Parameter"} , {});
		} else {
			GPASSO_SSID003MT_Model.findOne({"username": "H1450001"},function (err, ssid) {
				if(err) {
					callback&&callback({ "respCode"  : "500" , "respDesc" : "Internal Server Error"},{} );
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
	}
}

exports.getLoginDetails=function(inSchema, inJson, callback) {
	
	doLogin(inJson[0].LoginDetails[0], function(err, ) {
	});
	return callback(null,inSchema,outJson);
	});
}

