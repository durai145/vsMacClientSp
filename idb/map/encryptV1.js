var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');
var chiper = require('./chiper');
var Sync = require('sync');

parseBody = function (body, isHtml) {
	var header ={};
	var bodyList = new Array();
	body.forEach(function (bodyObj) {
		if (bodyObj.state == "end") {
			header = bodyObj.header.headers_decoded;
			header.body = header.body || [];
			header.body.push(parseContext(bodyObj.childern, isHtml));
		} else if (bodyObj.state == "body") {
			header = bodyObj.header.headers_decoded;
			header.body = header.body || [];
			header.body.push(parseContext(bodyObj.childern, isHtml));
		} 
	});
	return header;	
};

parseContext = function(body, isHtml) {
	var bodyList = new Array();
	body.forEach(function (bodyObj) {
//		console.log(bodyObj);
//		if (bodyObj.state == "end") {
//			throw new Error("end state found on child");
//		} 
	
		if (bodyObj.is_htmal == isHtml) {
			try  {
				bodyList.push(utf8.decode(quotedPrintable.decode(bodyObj.body_text_encoded)));
				
			} catch(e) {
				console.error("Exception:", e);
				console.error(bodyObj);
			}
		}
		if (bodyObj.childern.length >0 ) {	
			bodyList.push(parseContext(bodyObj.childern))
		}
	});
	return bodyList;		
}

encyptDataSync = function(plaintext, key, callback) {
        Sync(function(){
            try {
                result=encryptData.sync(null, plaintext, pubkey);
                callback(result);
            }
            catch (e) {
                return e;
            }
        });
}


encryptBody=function(body, key) {
	Sync(function () {
	var bodyEncrypted= [];
	body.forEach(function (bodyObj) {
		console.log("call decoded=" + utf8.decode(quotedPrintable.decode(bodyObj.body_text_encoded)));
		try {
			encryptedData=chiper.encryptData.sync(null,utf8.decode(quotedPrintable.decode(bodyObj.body_text_encoded)), key); 
		} catch(e) {
			console.log("exception" + e);
		}
		console.log("in chiper.encryptData [encryptedData = " + encryptedData + "]");
		bodyObj.body_text_encoded = encryptedData;
		console.log("bodyObj.childern.length = " + bodyObj.childern.length);
		if (bodyObj.childern.length >0 ) {	
			bodyObj.childern=encryptBody(bodyObj.childern, key);
		}
		bodyEncrypted.push(bodyObj);

	});
	console.log("bodyEncrypted" + JSON.stringify(bodyEncrypted));
	return bodyEncrypted;
	});
}

exports.parseBody = parseBody;
exports.encryptBody = encryptBody;
exports.encryptData = encryptData;
