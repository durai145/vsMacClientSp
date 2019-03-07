// Header
 // tomg.scr generated version 1.0
var mongoose    = require('./gpassov3').mongoose;
var log         = require('./log')(module);
var config      = require('./config');
var crypto      = require('crypto');
var Schema = mongoose.Schema;

/* Generated from MAILCSP001.sql by n.js  Don't change */
/* All copyrights © 2016 Heaerie Global solutions (P) Ltd.India  */
 var MAILCSP_MAIL001MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, uuid: { type: String, unique: false, required: false, default: ''  } 
, msgId: { type: String, unique: false, required: false, default: ''  } 
, replyId: { type: String, unique: false, required: false, default: ''  } 
, linkId: { type: String, unique: false, required: false, default: ''  } 
, subject: { type: String, unique: false, required: false, default: ''  } 
, shortBody: []
, body: []
, receivedDate: { type: Date, unique: false, required: false, default: ''  } 
, sentDate: { type: Date, unique: false, required: false, default: ''  } 
, fromList: []
, toList: []
, isNewMail: { type: Boolean, unique: false, required: false, default: ''  } 
, isFlag: { type: Boolean, unique: false, required: false, default: ''  } 
, grpId: { type: Number, unique: false, required: false, default: ''  } 
, hasAttachment: { type: Boolean, unique: false, required: false, default: ''  } 
});

 var MAILCSP_MAIL001MT_Model = mongoose.model('MAILCSP_MAIL001MT', MAILCSP_MAIL001MT); 
 module.exports.MAILCSP_MAIL001MT_Model = MAILCSP_MAIL001MT_Model; 
