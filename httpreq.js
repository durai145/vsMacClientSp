var log = require('./libs/log')(module);
Promise = require('bluebird'),
request = Promise.promisify(require('request')); 

exports.httpRequest = function(options, callback) {
	console.log(options);
	log.info("call request");
	request(options).then(function (resp) {
		log.info("call resp:", resp); 
		return callback(null, resp.body);
	}).catch(function (err) {
		log.info("call err:", err);
		return callback(err);
	});

}
