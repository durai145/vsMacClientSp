var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');
var chiper = require('./chiper');
var Sync = require('sync');
var keys = require('./keys.json');

var pubkey = "-----BEGIN PGP PUBLIC KEY BLOCK-----" + "\n"
+ "Version: OpenPGP.js v2.5.13" + "\n"
+ "Comment: https://openpgpjs.org" + "\n"
+ "" + "\n"
+ "xo0EWg0iwAED/0qASipdIaDa4+HanncEJ7ty19v/qWakN4m/bKee5FYvGa8e" + "\n"
+ "r7nW9Rv2g+9M2ppmlIg8X4SZ5n3oRXgJ6sm91T9Ir+VcqV6YoLQuxZ9CmxL/" + "\n"
+ "uqa+hH9dI9ZTl059wR791auIu+wOMQ7x38LOj3Nouu08dqQLT71ZytEd/DjV" + "\n"
+ "9vklABEBAAHNG0pvbiBTbWl0aCA8am9uQGV4YW1wbGUuY29tPsK1BBABCAAp" + "\n"
+ "BQJaDSLBBgsJBwgDAgkQk9HU/Yy7ICMEFQgKAgMWAgECGQECGwMCHgEAANEZ" + "\n"
+ "A/45rq2pIdTCZwUOTK1ElSR+NZZ+3C8pnNCQvU6peRYBycdatSrspsiCdRKJ" + "\n"
+ "XUITu6MMCFrn2w8EzlhZk24IZQ8WzOZhcNbqRRwgAC3AjYX/qzuhmmtcze2F" + "\n"
+ "mdRlfxzfDrChyvSEx0xjpZ5RHCTYPF7wUJg6kyHeSGCOZFBjl6Iw7c6NBFoN" + "\n"
+ "IsEBBAChaMQWCqLMox9YJ0UiDLCvmjwclzkMtTrytC1U+OAIKrLmAKzJ2whc" + "\n"
+ "jFcSOLL6CvDEqr9M2J4PMdrCD9yTTho2isYFdr5xCXMD8q84Qb2NVNR/qt1U" + "\n"
+ "LUIzfz3YmGNkFmHEGwwbuFpAkD/VY6nMuOzBUGToWUX94IxxDwW9zXcRSQAR" + "\n"
+ "AQABwp8EGAEIABMFAloNIsEJEJPR1P2MuyAjAhsMAAD1HAP8DLpnHZyLwejk" + "\n"
+ "qzsg3ZLhdVrgWjC4sYCg4Tz8x/ny7Zv5VLehme7QVYji/sWQrdLJiSkh52wX" + "\n"
+ "QnENlAljylQRPjj9PmaBGNNlDSiYjXnSJsB4e9/RzxK/4VwMgrHosQkfYfQL" + "\n"
+ "tCfZgv/+rR9HTfGxUzRLSo7jUG0QRHfICnmSxi4=" + "\n"
+ "=gy0n" + "\n"
+ "-----END PGP PUBLIC KEY BLOCK-----";


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

decryptDataSync = function(plaintext, key, callback) {
        Sync(function(){
            try {
                result=decryptData.sync(null, plaintext, pubkey);
                callback(result);
            }
            catch (e) {
                return e;
            }
        });
}


//Sync is mandatory to call this function
decryptBody=function(body, key) {
		var bodyDecrypted= [];
		body.forEach(function (bodyObj) {
			try {
				body_text_encoded=chiper.decryptData.sync(null, bodyObj.body_text_encoded, key); 
				bodytext=chiper.decryptData.sync(null, bodyObj.bodytext, key); 
			} catch(e) {
				console.log("exception" + e);
			}
			bodyObj.body_text_encoded=body_text_encoded;
			bodyObj.bodytext=bodytext;
			if (bodyObj.childern.length >0 ) {	
				bodyObj.childern=encryptBody(bodyObj.childern, key);
			}
			bodyDecrypted.push(bodyObj);

		});
		return bodyDecrypted;
}

//Sync is mandatory to call this function
encryptBody=function(body, key) {
		var bodyEncrypted= [];
		body.forEach(function (bodyObj) {
			try {
				body_text_encoded=chiper.encryptData.sync(null,utf8.decode(quotedPrintable.decode(bodyObj.body_text_encoded)), key); 
				bodytext=chiper.encryptData.sync(null,utf8.decode(quotedPrintable.decode(bodyObj.bodytext)), key); 
			} catch(e) {
				console.log("exception" + e);
			}
			bodyObj.body_text_encoded=body_text_encoded;
			bodyObj.bodytext=bodytext;
			if (bodyObj.childern.length >0 ) {	
				bodyObj.childern=encryptBody(bodyObj.childern, key);
			}
			bodyEncrypted.push(bodyObj);

		});
		return bodyEncrypted;
}
/*[
Sync(function () {
	var encryptedBody= encryptBody([{body_text_encoded: "test" , childern : [{ body_text_encoded:"", childern:[]}]}], pubkey);
	console.log("encryptedBody" + JSON.stringify(encryptedBody));
});
]*/
Sync(function () {
	 bodytext = "-----BEGIN PGP MESSAGE-----\r\nVersion: OpenPGP.js v2.5.13\r\nComment: https://openpgpjs.org\r\n\r\nwYwDmiGi9RalvLsBA/4xCVHMPm+gwKBR2yDRzXs/0V0Sr0HkRQWO5poTdMSm\nweb9XMaGx4H1+fyhE+Tc1CtXrTeDF+FmcDtAaAxoX8Vz81UhiY5uOkvR/i31\nUmqafx8/l7MJ1iEsfMBGj1ai+ELZoasjavkH9G215Z0LN5Ysi6cunFWDaADd\nTpOrbGUoKNTAGQGvBTUUlLLdegGasIGxMeP6OScaNWSWbYVZ4pGQLSX/5eMH\nzMWO0IoWSG9Ps6xM+Vvf4HRe4CNLI1h0JMG6qxG8uxPXq9QDyCFPl1Fr5eE9\nBj1PnThEvWnpVtmdpETRNrRunpvYnNrkd5O1OdEFzUsIPVC0d7yXuQJfVwOt\naesh5FjEv6xTpnv81/DI4PV5di87FyyKNJ4i1VeyOT9QOZ3yinvqo+yjnkNh\nYHOREPmRPKp1426BjV13KKwFXY3kn+2t0OZ6R41E0XtAAUA9K0F+k3Ds5rLd\nPw4=\r\n=IAyF\r\n-----END PGP MESSAGE-----\r\n";
	var decryptedBody= decryptBody([{body_text_encoded: bodytext , childern : [{ body_text_encoded:bodytext, childern:[]}]}], keys.privkey);
	console.log("encryptedBody" + JSON.stringify(encryptedBody));
});



exports.parseBody = parseBody;
exports.encryptBody = encryptBody;
exports.decryptBody = decryptBody;
exports.encryptData = encryptData;
