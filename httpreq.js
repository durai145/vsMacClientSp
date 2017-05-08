var log = require('./libs/log')(module);
Promise = require('bluebird'),
request = Promise.promisify(require('request')); 
var config = require('./config/config.json');

httpRequest = function(options, callback) {
	console.log(options);
	log.info("call request");
	request(options).then(function (resp) {
		log.info("call resp:["+ resp.body +"]"); 
			
		return callback(null, resp.body);
	}).catch(function (err) {
		log.error("call err:" + err.message);
		return callback(err);
	});

}

var isValidUserRequest =[{"isValidUserRequest":[{"userDetails":[{"emailId":"H1450001"}], "portalDetails":[{"portalKey":"Member Portal"}]}]}];

var body = {"grantType":"password","clientId":"CLIENTSP","scope":"GPA","isValidUserRequest":"[{\"isValidUserRequest\":[{\"userDetails\":[{\"emailId\":\"H1450001\"}], \"portalDetails\":[{\"portalKey\":\"Member Portal\"}]}]}];"}

console.log(JSON.stringify(opt));
var respObj= {};

var opt = {
			method: 'POST',
			uri: 'http://localhost:' + config.port + '/service/userDetails/isValidUser',
			form: body,
			headers: respObj
		};

httpRequest(opt, function(err, resp) {
if (err) {
	console.error(err);
}
console.log(resp);
});

exports.httpRequest=httpRequest;
