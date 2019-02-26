/**
* 1. read timeslot from param table 
* 	a. if timeslot is null then compute and set time slot
* 2. read mails from mail001mt for timeslot
* 3. change the status to in process and update thread id 
* 	a. build folder table 
* 	b. build mail detail table
* 	c. update stutus to completed 
* 4. move timesloe to next  
* 
*/
var log                 = require('../libs/log')(module);
var AuthorizationFailure = require("../../libs/error/AuthorizationFailure");
var mongoose            = require('../libs/gpassov3').mongoose;
var ErrorResponseSchema = require('../../jsonSchema/ErrorResponseSchema.json');

var GPASSO_MAIL001MT_Model   = require('../libs/gpassov3').GPASSO_MAIL001MT_Model;
var GPASSO_RSPT007PT_Model   = require('../libs/gpassov3').GPASSO_RSPT007PT_Model;

var parseBody = require("./parseBody2");
var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');
var uuid= require("uuid/v1");

var inRespSchema = [], outJson= [];
saveToRspt007pt = function(rspt007pt, callback) {
        rspt007pt.save(function(err) {
                if(err) {
				log.error("unable to save: ", err);
                        return  callback && callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"001","responseDesc": "unable to save on database"}]}]}]);
                }
                return callback&&callback(  null, inRespSchema, outJson);
                console.log(" Successfully saved");

        });
}

var restartPoint = new  GPASSO_RSPT007PT_Model();
log.info("find GPASSO_RSPT007PT_Model.findOne");
GPASSO_RSPT007PT_Model.findOne({"restartName" : "MAIL_PROCESS_RESTART"}, function(err, restartPointObj) {
	if (err) {
		console.log("Error", err);	
	}
	var startTimeSlot  =  new Date();
	var endTimeSlot  =  new Date();
	endTimeSlot.setTime(((parseInt(startTimeSlot.getTime()/60000)) * 60000) - 60000)
	if (restartPointObj == null) {
		log.info("No record found", restartPointObj);
		startTimeSlot.setTime(((parseInt(startTimeSlot.getTime()/60000)) * 60000) - 60000)
	} else {
		log.info("Record found", restartPointObj.restartPoint);
		startTimeSlot = restartPointObj.restartPoint
	}
	log.info("startTimeSlot:" + startTimeSlot.toISOString() + ", endTimeSlot:" + endTimeSlot.toISOString());
	GPASSO_MAIL001MT_Model.find({$and: [{timeSlot: {$gte: startTimeSlot}},{timeSlot:{$lte : endTimeSlot}}]}, function (err, mailArr) {	
	
		if (err) {
			log.error("Error", err);
		}
		
	//	console.log(mailArr);
		mailArr.forEach(function (mailObj) {

			parsedMail = parseBody.parseBody(mailObj.body, true);
			console.log(JSON.stringify(mailObj, null, 4)); 
			var subject= "";
			var msgId= "";
			var bodytext= "";
			console.log(typeof mailObj);
			if (typeof mailObj.body == "object") {
				if (mailObj.body.length != 0 ) {
					subject = mailObj.body[0].header.headers_decoded.subject;
					msgId = mailObj.body[0].header.headers_decoded["message-id"];
					bodytext = mailObj.body[0].bodytext;
				}
			}

			var tableObj=	{ 
				uuid : mailObj.uuid,
			 	msgId : msgId,
				replyId : "",
				linkId : "",
				subject : subject,
				shortBody : "",
				body : bodytext,
				receivedDate : mailObj.dtModified,
				sentDate : mailObj.dtCreated,
				fromList : mailObj.mailFrom,
				to : mailObj.to,
				isNew : true,
				isFlag : true,
				hasAttachment : false
				
			};
	
			console.log("parsedMail:");
			console.log(JSON.stringify(tableObj, null, 4));
			

		});


		var rspt = new GPASSO_RSPT007PT_Model({ 
		  paramType: 'DATE',
		  restartPoint: startTimeSlot,
		  restartName: 'MAIL_PROCESS_RESTART',
		  dtModified: new Date(),
		  athId: 2,
		  dtCreated: new Date(),
		  mkrId: 2 }
		);
		log.info ("endTimeSlot:" + endTimeSlot);
		updateRespt007pt( rspt, endTimeSlot, function(err) {
			if (err) {
				console.log("Error :", err);
			}

		});

		if (restartPointObj  == null) {
			log.info("call saveToRspt007pt");
			saveToRspt007pt(rspt, function(err) {
				if (err) {
					console.log("Error :", err);
				}
			});
		}
		

	});

	 
});

updateRespt007pt = function (rspt, timeSlot, callback) {
	GPASSO_RSPT007PT_Model.update({ restartName : "MAIL_PROCESS_RESTART"} , 
		{$set:{restartPoint : timeSlot}}, 
	/*	{ multi: true, writeConcern: { w: "majority", wtimeout: 5000 }}, */
		function(err, resp) {
			if(err) {
				log.error("unable to update: ", err);
				return  callback && callback(null, ErrorResponseSchema, [{"ErrorResponse":[{"status":[{"responseCode":"001","responseDesc": "unable to save on database"}]}]}]);
			}

			console.log(resp);
			/*
			{ ok: 1,
  nModified: 0,
  n: 0,
  lastOp: Timestamp { _bsontype: 'Timestamp', low_: 0, high_: 0 },
  electionId: 590d55c6b0943e35ac8afd21 }

	*/
			return callback&&callback(  null, inRespSchema, outJson);

	});
}

/*

 {
     multi: true,
     writeConcern: { w: "majority", wtimeout: 5000 }
 }

*/

