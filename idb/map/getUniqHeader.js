var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');

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

exports.parseBody = parseBody
