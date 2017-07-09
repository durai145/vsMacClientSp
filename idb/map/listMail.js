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
var parseBody = require("../parseBody");

var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');

var InternalServer = require("../../libs/error/InternalServer");
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
console.log(utf8.decode(quotedPrintable.decode('foo=3Dbar')));


	console.log("Mail:" + mail.length);	
	
	mail.forEach(function (mailObj) {
		
		parseBody.parseBody(mailObj.body, false);

	});
		

		
	});


	
};

mailBox();

exports.mailBox = mailBox;
