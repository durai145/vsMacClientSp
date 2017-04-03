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



exports.getServiceDetails=function(inSchema, inJson, callback) {

	var serviceObj = new GPASSO_SRVS006MT_Model();
	GPASSO_SRVS006MT_Model.find({"serviceName" : inJson[0].ServiceDetails[0].ServiceName }, function(err, srvs006mt) {
	var outJson=[{"ServiceDetails":[{"services":[{"resSjson":"Response schema json","reqSjson":"Request schema json","authReqd":"Request Schema Json"}],"ServiceName":""}]}];

	log.info(" GSD:001");

	if (err) {
		return callback(inSchema,outJson);

	}
	log.info("GSD:002 ",srvs006mt);
	log.info("GSD:003 ",typeof srvs006mt);
	if ((srvs006mt.length === undefined)||(srvs006mt.length == 0)) {
		return	callback(new Error("No data found"));
		
	}

	outJson[0].ServiceDetails[0].services[0].resSjson = srvs006mt[0].services[0].resSjson;
	outJson[0].ServiceDetails[0].services[0].reqSjson = srvs006mt[0].services[0].reqSjson;
	outJson[0].ServiceDetails[0].services[0].authReqd = srvs006mt[0].services[0].authReqd;
	outJson[0].ServiceDetails[0].services[0].task = srvs006mt[0].services[0].task;
	outJson[0].ServiceDetails[0].services[0].method = srvs006mt[0].services[0].method;
	outJson[0].ServiceDetails[0].serviceName=srvs006mt[0].serviceName;
	console.log(JSON.stringify(srvs006mt));
	console.log(JSON.stringify(outJson));
	return callback(null,inSchema,outJson);
	});
}

exports.saveServiceDetails=function(inSchema,inJson,callback) {
	var service = new GPASSO_SRVS006MT_Model({
	  services: [{
		method: "POST"
		, authReqd: false
		, task: "getUserDetails"
		, reqSjson: [{"name" : "test"}]
		, resSjson: [{"name" : "test"}]
		}],
	  serviceName: 'UserDetails',
	  dtModified: new Date(),
	  athId: 1,
	  dtCreated: new Date(),
	  mkrId: null});
	service.save(function(err) {
		if(err) {
			log.error("unable to save service:" + JSON.stringify(service) + " , error Object: " + JSON.stringify(err));
			return	callback && callback(null,[], []);
		}
		console.log(service);
		console.log(" Successfully saved");
		
	});
}
