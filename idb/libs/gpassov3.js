// Header
 // tomg.scr generated version 1.0
var mongoose    = require('mongoose');
var log         = require('./log')(module);
var config      = require('./config');
var crypto      = require('crypto');

mongoose.connect(config.get('mongoose:uri'), "primaryPreferred");
var db = mongoose.connection;
db.on('error', function (err) {
    log.error(config.get('mongoose:uri'));
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;
module.exports.mongoose=mongoose;

/* Generated from GPASSOV004.sql by n.js  Don't change */
/* All copyrights © 2016 Heaerie Global solutions (P) Ltd.India  */
 var GPASSO_PAGE005MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, pageKey: { type: String, unique: true, dropDups: true, default: ''  } 
, pageTitle: { type: String, unique: false, required: false, default: ''  } 
, dispOrder: { type: Number, unique: false, required: false, default: ''  } 
, services : [{
  method: { type: String, unique: false, required: true, default: ''  } 
, authReqd: { type: Boolean, unique: false, required: true, default: true  } 
, task: { type: String, unique: false, required: true, default: ''  } 
, reqSjson: []
, resSjson: []
}]
});

 GPASSO_PAGE005MT.index({ 
    _id : 1 
	,pageKey: 1
});
 var GPASSO_PAGE005MT_Model = mongoose.model('GPASSO_PAGE005MT', GPASSO_PAGE005MT); 
 module.exports.GPASSO_PAGE005MT_Model = GPASSO_PAGE005MT_Model; 
 
 var GPASSO_PGGR004MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, pageGrpKey: { type: String, unique: false, required: false, default: ''  } 
, pageGrpTitle: { type: String, unique: false, required: false, default: ''  } 
, dispOrder: { type: Number, unique: false, required: false, default: ''  } 
, pageIds:  [{ type: Schema.ObjectId, ref: 'GPASSO_PAGE005MT' }]   
});

 GPASSO_PGGR004MT.index({ 
    _id : 1 
});
 var GPASSO_PGGR004MT_Model = mongoose.model('GPASSO_PGGR004MT', GPASSO_PGGR004MT); 
 module.exports.GPASSO_PGGR004MT_Model = GPASSO_PGGR004MT_Model; 
 
 var GPASSO_SSID003MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, firstName: { type: String, unique: false, required: false, default: ''  } 
, lastName: { type: String, unique: false, required: false, default: ''  } 
, middleName: { type: String, unique: false, required: false, default: ''  } 
, username: { type: String, unique: false, required: false, default: ''  } 
, password: { type: String, unique: false, required: false, default: ''  } 
, empId: { type: String, unique: false, required: false, default: ''  } 
, emailId: { type: String, unique: false, required: false, default: ''  } 
, userType: { type: String, unique: false, required: false, default: ''  } 
, userRole: { type: String, unique: false, required: false, default: ''  } 
});

 GPASSO_SSID003MT.index({ 
    _id : 1 
});
 var GPASSO_SSID003MT_Model = mongoose.model('GPASSO_SSID003MT', GPASSO_SSID003MT); 
 module.exports.GPASSO_SSID003MT_Model = GPASSO_SSID003MT_Model; 
 
 var GPASSO_ROLE003MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, roleName: { type: String, unique: false, required: false, default: ''  } 
, status: { type: String, unique: false, required: false, default: ''  } 
, roleValue: { type: Number, unique: false, required: false, default: ''  } 
, pageGrpIds:  [{ type: Schema.ObjectId, ref: 'GPASSO_PGGR004MT' }]   
, usrIds:  [{ type: Schema.ObjectId, ref: 'GPASSO_SSID003MT' }]   
});

 GPASSO_ROLE003MT.index({ 
    _id : 1 
});
 var GPASSO_ROLE003MT_Model = mongoose.model('GPASSO_ROLE003MT', GPASSO_ROLE003MT); 
 module.exports.GPASSO_ROLE003MT_Model = GPASSO_ROLE003MT_Model; 
 
 var GPASSO_PRTL002MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, prtlName: { type: String, unique: false, required: false, default: ''  } 
, prtlVersion: { type: String, unique: false, required: false, default: ''  } 
, basePath: { type: String, unique: false, required: false, default: ''  } 
, roleIds:  [{ type: Schema.ObjectId, ref: 'GPASSO_ROLE003MT' }]   
, pageGrpIds:  [{ type: Schema.ObjectId, ref: 'GPASSO_PGGR004MT' }]   
});

 GPASSO_PRTL002MT.index({ 
    _id : 1 
});
 var GPASSO_PRTL002MT_Model = mongoose.model('GPASSO_PRTL002MT', GPASSO_PRTL002MT); 
 module.exports.GPASSO_PRTL002MT_Model = GPASSO_PRTL002MT_Model; 
 
 var GPASSO_PROD001MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, prodName: { type: String, unique: false, required: false, default: ''  } 
, prodVersion: { type: String, unique: false, required: false, default: ''  } 
, prtlIds:  [{ type: Schema.ObjectId, ref: 'GPASSO_PRTL002MT' }]   
, usrIds:  [{ type: Schema.ObjectId, ref: 'GPASSO_SSID003MT' }]   
});

 GPASSO_PROD001MT.index({ 
    _id : 1 
});

 var GPASSO_PROD001MT_Model = mongoose.model('GPASSO_PROD001MT', GPASSO_PROD001MT); 
 module.exports.GPASSO_PROD001MT_Model = GPASSO_PROD001MT_Model; 
 
 var GPASSO_SRVS006MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, serviceName: { type: String, unique: true, dropDups: true, required: true, default: ''  } 
, services : [{
  method: { type: String, unique: false, required: true, default: ''  } 
, authReqd: { type: Boolean, unique: false, required: true, default: true  } 
, task: { type: String, unique: false, required: true, default: ''  } 
, reqSjson: []
, resSjson: []
}]
});

GPASSO_SRVS006MT.index({ 
    _id : 1 
, serviceName : 1
});
 var GPASSO_SRVS006MT_Model = mongoose.model('GPASSO_SRVS006MT', GPASSO_SRVS006MT); 
 module.exports.GPASSO_SRVS006MT_Model = GPASSO_SRVS006MT_Model; 
 
 var GPASSO_MAIL001MT  = new Schema({
  uuid: { type: String, unique: true, required: true, default: ''  } 
, timeSlot: { type: Date, unique: false, required: false, default: ''  } 
, threadId: { type: Number, unique: false, required: false, default: ''  } 
, status: { type: Number, unique: false, required: false, default: ''  } 
, mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, to: []
, mailFrom: []
, headers: []
, headers_decoded: []
, header_list: []
, body: []
, attachments: []
});

GPASSO_MAIL001MT.index({ 
    _id : 1 ,
   timeSlot: 1
});
 var GPASSO_MAIL001MT_Model = mongoose.model('GPASSO_MAIL001MT', GPASSO_MAIL001MT); 
 module.exports.GPASSO_MAIL001MT_Model = GPASSO_MAIL001MT_Model; 
 
 var GPASSO_IOT006MT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, deviceName: { type: String, unique: false, dropDups: true, required: true, default: ''  } 
, vibration: { type: String, unique: false, dropDups: true, required: true, default: ''  } 
});

GPASSO_IOT006MT.index({ 
    _id : 1 
});
 var GPASSO_IOT006MT_Model = mongoose.model('GPASSO_IOT006MT', GPASSO_IOT006MT); 
 module.exports.GPASSO_IOT006MT_Model = GPASSO_IOT006MT_Model; 

 
/***
* Restart Pointer 
*/
 var GPASSO_RSPT007PT  = new Schema({
  mkrId: { type: Number, unique: false, required: false, default: ''  } 
, dtCreated: { type: Date, unique: false, required: false, default: ''  } 
, athId: { type: Number, unique: false, required: false, default: ''  } 
, dtModified: { type: Date, unique: false, required: false, default: ''  } 
, restartName: { type: String, unique: true, dropDups: true, required: true, default: ''  } 
, restartPoint: { type: Date, unique: false, required: false, default: ''  } 
, paramType: { type: String, unique: false, dropDups: true, required: true, default: ''  } 
});

GPASSO_RSPT007PT.index({ 
    _id : 1 
});
 var GPASSO_RSPT007PT_Model = mongoose.model('GPASSO_RSPT007PT', GPASSO_RSPT007PT); 
 module.exports.GPASSO_RSPT007PT_Model = GPASSO_RSPT007PT_Model; 
