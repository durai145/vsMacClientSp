var log                 = require('../libs/log')(module);
var AuthorizationFailure = require("../../libs/error/AuthorizationFailure");
var mongoose            = require('../libs/gpassov3').mongoose;
var ErrorResponseSchema = require('../../jsonSchema/ErrorResponseSchema.json');
var GPASSO_PROD001MT_Model   = require('../libs/gpassov3').GPASSO_PROD001MT_Model;
var GPASSO_MAIL001MT_Model   = require('../libs/gpassov3').GPASSO_MAIL001MT_Model;
var GPASSO_PRTL002MT_Model   = require('../libs/gpassov3').GPASSO_PRTL002MT_Model;
var GPASSO_ROLE003MT_Model   = require('../libs/gpassov3').GPASSO_ROLE003MT_Model;
var GPASSO_PGGR004MT_Model   = require('../libs/gpassov3').GPASSO_PGGR004MT_Model;
var GPASSO_SSID003MT_Model   = require('../libs/gpassov3').GPASSO_SSID003MT_Model;
var GPASSO_PAGE005MT_Model   = require('../libs/gpassov3').GPASSO_PAGE005MT_Model;
var ObjectId = mongoose.Types.ObjectId;

var InternalServer = require("../../libs/error/InternalServer");
exports.outboundMail=function(inSchema, inJson, inRespSchema, callback) {
	//console.log("in loginDetails.doLogin");
	//console.log(inJson);
	//doLogin1(inJson[0].LoginDetails[0], function(err) {
var outJson =  [
    {
        "outboundMailResponse": [
            {
                "statusDetails": [
                    {
                        "statusCode": "000",
                        "statusDescr": "Mail is Saved in HSMAIL"
                    }
                ]
            }
        ]
    }
] ;


  var timeSlot  =  new Date();
  timeSlot.setTime(timeSlot.getTime() -(timeSlot.getTime() % 60000)) 
var mail001mt= new GPASSO_MAIL001MT_Model(
{
  attachments: [],
  body: [],
  uuid : inJson[0].outboundMailRequest[0].uuid,
  mailFrom : inJson[0].outboundMailRequest[0].mailFrom,
  to : inJson[0].outboundMailRequest[0].to,
  header_list: inJson[0].outboundMailRequest[0].header_list,
  headers_decoded: inJson[0].outboundMailRequest[0].headers_decoded,
  headers: inJson[0].outboundMailRequest[0].headers,
  body: inJson[0].outboundMailRequest[0].body,
  attachments: inJson[0].outboundMailRequest[0].attachments,
  dtModified: new Date(),
  athId: 1,
  dtCreated: new Date(),
  mkrId: 1 ,
  timeSlot: timeSlot
});
log.info(""+mail001mt+"");

saveToMail001mt(mail001mt, inRespSchema, outJson, callback);

	
};

saveToMail001mt = function(mail001mt, inRespSchema, outJson, callback)  {
	mail001mt.save(function(err) {
		if(err) {
			log.error("unable to mail: ", err);
			return	callback && callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"001","responseDesc": "unable to save on database"}]}]}]);
		}
		return callback&&callback(  null, inRespSchema, outJson);
		console.log(" Successfully saved");
			
	});


}

exports.saveToMail001mt = saveToMail001mt;

