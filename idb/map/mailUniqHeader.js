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
//var parseBody = require("./parseBody1");
var parseBody = require("./getUniqHeader");

var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');

var InternalServer = require("../../libs/error/InternalServer");

intersect = function(a, b) {
	var r = new Set();
	a.forEach(function(aObj) {
		if (b.has(aObj)) {
			r.add(aObj);
		}

	});
	return r;
}

mailBox=function(inSchema, inJson, inRespSchema, callback) {


	GPASSO_MAIL001MT_Model.find({ "to" : [
		{
			"user" : "jayagopal.govindaraj",
			"host" : "myroomexpense.com",
			"original_host" : "myroomexpense.com",
			"original" : "<jayagopal.govindaraj@myroomexpense.com>"
		}
	] 

	}, function (err, mail) {

		if(err) {
			console.error("Unable to read from GPASSO_MAIL001MT_Model", err);
			return ;
		}

		console.log("Mail:" + mail.length);	

		var mailBox=new Array();
		mail.forEach(function (mailObj) {
			var mailBoxObj=parseBody.parseBody(mailObj.body, true);
			mailBox.push(mailBoxObj);
		});
//		console.log(mailBox.length);
//		console.log(mailBox);
		var headerSet = new Set();
		var uniqSet = null;
		var uniqValueSet = new Array(); 
		var uniqValueCount = new Array(); 
		mailBox.forEach(function(obj) {
			var currentSet = new Set();
			for (key in obj) {

				if (key == "body") {
					continue;
				}
				if (uniqValueSet[key] == undefined ) {
					uniqValueSet[key] = new Set();
					uniqValueCount[key] = 0;
				}
				uniqValueCount[key]++;
				obj[key].forEach(function(value) {
					uniqValueSet[key].add(value);
				});
				console.log(key);
				headerSet.add(key);
				currentSet.add(key);
			}
			if (uniqSet != null) {
				uniqSet=intersect(uniqSet, currentSet)
			} else {
				uniqSet=currentSet
			}
			
//			console.log(uniqSet);

		});
		console.log(headerSet);
		console.log(uniqSet);
		console.log(uniqValueSet);
		console.log(uniqValueCount);


	});
};

mailBox();

exports.mailBox = mailBox;
