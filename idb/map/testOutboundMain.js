var outbound=require("./outboundMail");
var GPASSO_MAIL001MT_Model   = require('../libs/gpassov3').GPASSO_MAIL001MT_Model;
 var timeSlot  =  new Date();
  timeSlot.setTime(timeSlot.getTime() -(timeSlot.getTime() % 60000))
var mail001mt= new GPASSO_MAIL001MT_Model(
{
  attachments: [],
  body: [],
  uuid : "UUID",
  mailFrom : ["test@myroomexpense.com"],
  to : ["to@myroomexpense.com"],
  header_list: [],
  headers_decoded: [],
  headers: [],
  body: [],
  attachments: [],
  dtModified: new Date(),
  athId: 2,
  dtCreated: new Date(),
  mkrId: 2 ,
  timeSlot: timeSlot
});

console.log(mail001mt);

outbound.saveToMail001mt(mail001mt, function (err, resp) {
	if (err) {
		console.log("Error on saving to mail001mt",err);

	}


});

