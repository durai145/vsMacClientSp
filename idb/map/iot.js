var log                 = require('../libs/log')(module);
var AuthorizationFailure = require("../../libs/error/AuthorizationFailure");
var mongoose            = require('../libs/gpassov3').mongoose;
var ErrorResponseSchema = require('../../jsonSchema/ErrorResponseSchema.json');
var GPASSO_PROD001MT_Model   = require('../libs/gpassov3').GPASSO_PROD001MT_Model;
var GPASSO_IOT006MT_Model   = require('../libs/gpassov3').GPASSO_IOT006MT_Model;
var GPASSO_PRTL002MT_Model   = require('../libs/gpassov3').GPASSO_PRTL002MT_Model;
var GPASSO_ROLE003MT_Model   = require('../libs/gpassov3').GPASSO_ROLE003MT_Model;
var GPASSO_PGGR004MT_Model   = require('../libs/gpassov3').GPASSO_PGGR004MT_Model;
var GPASSO_SSID003MT_Model   = require('../libs/gpassov3').GPASSO_SSID003MT_Model;
var GPASSO_PAGE005MT_Model   = require('../libs/gpassov3').GPASSO_PAGE005MT_Model;
var ObjectId = mongoose.Types.ObjectId;

var InternalServer = require("../../libs/error/InternalServer");
exports.postVibration = function(inSchema, inJson, inRespSchema, callback) {
	//console.log("in loginDetails.doLogin");
	//console.log(inJson);
	//doLogin1(inJson[0].LoginDetails[0], function(err) {
var outJson =  [
    {
        "iotResponse": [
            {
                "statusDetails": [
                    {
                        "statusCode": "000",
                        "statusDescr": "IOT is saved"
                    }
                ]
            }
        ]
    }
] ;


var iot006mt = new GPASSO_IOT006MT_Model({ 
  dtModified: new Date(),
  athId: 1,
  dtCreated: new Date(),
  mkrId: 1,
  deviceName: "Adithya",
  vibration: inJson[0].iotRequest[0].appTest[0].value
});

log.info(""+iot006mt+"");


iot006mt.save(function(err) {
		if(err) {
			log.error("unable to mail: ", err);
			return	callback && callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"001","responseDesc": "unable to save on database"}]}]}]);
		}
		return callback&&callback(  null, inRespSchema, outJson);

console.log(" Successfully saved");
		
	});


	
};

