var heaeriesjson = require("./heaeriesjson");
var req = {
	"grantType": "password",
	"clientId": "CLIENTSP",
	"scope": "GPA",
	"data": {
		"loginDetailsRequest": {
			"userDetails": {
				"username": "H1450002",
				"password": "1qaz2wsx"
			},
			"portalDetails": {
				"portalKey": "Member Portal"
			}
		}
	}
}
var sjson = require("../jsonSchema/loginDetailsRequestSchema")
var json = req.data;
var err = heaeriesjson.valWithSch(sjson, json);
if (err) {
	return console.log(err);
}

console.log("Successfully processed");