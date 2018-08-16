// Header
 // tomg.scr generated version 1.0
 var mongoose    = require('mongoose');
 var log         = require('./log')(module);
 var config      = require('./config');
 var crypto      = require('crypto');
 
 //mongoose.connect(config.get('mongoose:uri'), "primaryPreferred");
 mongoose.connect(config.get('mongoose:uri'));
 var db = mongoose.connection;
 db.on('error', function (err) {
     log.error(config.get('mongoose:uri'));
     log.error('connection error:', err.message);

 });
 db.once('open', function callback () {
     log.info("Connected to DB!");
 });


 exports.getMongoose = function() {
   return mongoose;
 }