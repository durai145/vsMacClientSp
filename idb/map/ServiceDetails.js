var log                 = require('../libs/log')(module);
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



exports.getServiceDetails=function(inSchema, inJson, inRespSchema, callback) {
	var serviceObj = new GPASSO_PAGE005MT_Model();
	GPASSO_PAGE005MT_Model.find({"pageKey" : inJson[0].ServiceDetails[0].serviceName }, function(err, srvs006mt) {
	var outJson=[{"ServiceDetails":[{"services":[{"resSjson":"Response schema json","reqSjson":"Request schema json","authReqd":"Request Schema Json"}],"serviceName":""}]}];

	if (err) {
		return callback(inSchema,outJson);
	}
	if ((srvs006mt.length === undefined)||(srvs006mt.length == 0)) {
		return	callback(new Error("No data found [ page_key=" + inJson[0].ServiceDetails[0].serviceName + "]"));
		
	}

	outJson[0].ServiceDetails[0].services[0].resSjson = srvs006mt[0].services[0].resSjson;
	outJson[0].ServiceDetails[0].services[0].reqSjson = srvs006mt[0].services[0].reqSjson;
	outJson[0].ServiceDetails[0].services[0].authReqd = srvs006mt[0].services[0].authReqd;
	outJson[0].ServiceDetails[0].services[0].task = srvs006mt[0].services[0].task;
	outJson[0].ServiceDetails[0].services[0].method = srvs006mt[0].services[0].method;
	outJson[0].ServiceDetails[0].serviceName = srvs006mt[0].pageKey;

	return callback(null, inRespSchema, outJson);
	});
}



exports.saveServiceDetails=function(inSchema, inJson, inRespSchema, callback) {
	var service = new GPASSO_PAGE005MT_Model({
	services: inJson[0].ServiceDetails[0].services,
	pageKey: inJson[0].ServiceDetails[0].serviceName,
	dtModified: new Date(),
	athId: 1,
	dtCreated: new Date(),
	mkrId: null});
	service.save(function(err) {
		if(err) {
			log.error("unable to save service: ", err);
			return	callback && callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"001","responseDesc":"unable to save in database"}]}]}]);
		}
		return	callback && callback(null,ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"000","responseDesc":"Successfully saved"}]}]}]);
		console.log(" Successfully saved");
		
	});
}
