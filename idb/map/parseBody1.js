var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');

parseBody = function (body, isHtml) {
	body.forEach(function (bodyObj) {
		var body= [];
		var header ={};
		if (bodyObj.state == "end") {
			console.log(bodyObj.header.headers_decoded.from)
			console.log(bodyObj.header.headers_decoded.to)
			console.log(bodyObj.header.headers_decoded["reply-to"])
			console.log(bodyObj.header.headers_decoded.subject)
			console.log(bodyObj.header.headers_decoded["x-priority"])
		header = { 
				"from" : bodyObj.header.headers_decoded.from
				,"to" : bodyObj.header.headers_decoded.to
				,"reply-to" : bodyObj.header.headers_decoded["reply-to"]
				,"subject" : bodyObj.header.headers_decoded.subject
				,"x-priority" : bodyObj.header.headers_decoded["x-priority"]
				, "body" : []
			};
			
		} else {
			if (bodyObj.is_htmal == isHtml) {
				console.log(utf8.decode(quotedPrintable.decode(bodyObj.body_text_encoded)));
				try  {
					body.push(utf8.decode(quotedPrintable.decode(bodyObj.body_text_encoded)));
				} catch(e) {
					console.log("Exception:", e);
					console.log(bodyObj);
				}
			}
		}
		try {	
			body.push(parseBody(bodyObj.childern, isHtml));
		} catch(e) {
					console.log("Exception 2:", e);
					console.log(bodyObj);
		}
		
		if (header.body  == undefined ) {
			header.body = body;
		} else {
			header.body.push(body);
		}
		
	});
};

exports.parseBody = parseBody
