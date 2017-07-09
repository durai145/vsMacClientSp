var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');


parseBody = function (body, isHtml) {
		var body =[];
	body.forEach(function (bodyObj) {
		if (bodyObj.state == "end") {
			header = { 
				"from" : bodyObj.header.headers_decoded.from
				,"to" : bodyObj.header.headers_decoded.to
				,"reply-to" : bodyObj.header.headers_decoded["reply-to"]
				,"subject" : bodyObj.header.headers_decoded.subject
				,"x-priority" : bodyObj.header.headers_decoded["x-priority"]
				,"body" : []
			};
			body.push({ "header" : header})	
			
		} else {
			if (bodyObj.is_htmal == isHtml) {
				body.push(utf8.decode(quotedPrintable.decode(bodyObj.body_text_encoded)));
			}
		}
		body.push(parseBody(bodyObj.childern, isHtml));
	});
	return body;
};

exports.parseBody = parseBody
