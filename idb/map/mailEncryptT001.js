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
var encrypt = require("./encrypt");
var chiper = require('./chiper');
var Sync = require('sync');
var keys = require('./keys.json');


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
mailBox=function(callback) {


	GPASSO_MAIL001MT_Model.find({ "to" : [
		{
			"user" : "jayagopal.govindaraj",
			"host" : "heaerieglobalsolutions.com",
			"original_host" : "heaerieglobalsolutions.com",
			"original" : "<jayagopal.govindaraj@heaerieglobalsolutions.com>"
		}
	] 

	}, function (err, mail) {

		if(err) {
			console.error("Unable to read from GPASSO_MAIL001MT_Model", err);
			return ;
		}

		console.log("Mail:" + mail.length);	
		Sync(function() {
			var mailBox=new Array();
			mail.forEach(function (mailObj) {
				console.log("mailObj.body = " + mailObj.body);	
				var mailBoxObj=encrypt.encryptBody(mailObj.body, keys.pubkey);
				mailBox.push(mailBoxObj);
			});
			callback(mailBox);
		});


	});
};
//mailBox(function(mail) {
//		console.log(JSON.stringify(mail, null, 4));
		
		Sync(function() {
			var mailBox=new Array();
			mail.forEach(function (mailBoxObj) {
				var mailBoxObj=encrypt.decryptBody(mailBoxObj, keys.privkey);
				mailBox.push(mailBoxObj);
				
			});
			console.log(JSON.stringify(mailBox, null, 4));
		});
			
//});

exports.mailBox = mailBox;
