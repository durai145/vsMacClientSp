var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var requestIp = require('request-ip');
var useragent = require('useragent');
var geoip = require('geoip-lite');
var cookieParser = require('cookie-parser');
var config = require('./config/config.json');
var device = require('express-device')
var ms = require('ms');
var jwt = require('jsonwebtoken');
var app = express();
var heaeriesjson = require("./uss/heaeriesjson");
var https = require('https');
var http = require('http');
var fs = require('fs');
var idb = require('./idb/InvokeDB');
var uss = require('./idb/USS_10');
var log = require('./libs/log')(module);

var AuthorizationFailure = require("./libs/error/AuthorizationFailure");
var TaskNotFound = require("./libs/error/TaskNotFound");
var MethodIsNotFound = require("./libs/error/MethodIsNotFound");

Promise = require('bluebird'),
request = Promise.promisify(require('request'));
var secretkey = "KEY1";
var sessionExpSec = 60*15;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(device.capture());
app.set('view options', { layout: true });
device.enableViewRouting(app);
app.use(cookieParser());
app.use(session({secret: 'glbladmin', resave: false, saveUninitialized: true}));
var sess ;


app.all('*', function(req, res, next) {
	var agent = useragent.parse(req.headers['user-agent']);
	var geo = geoip.lookup(requestIp.getClientIp(req));
	var browser ="";
	if( useragent.is(req.headers['user-agent']).chrome == true)
	{
		browser ="CHROME";
	}
	else if( useragent.is(req.headers['user-agent']).firefox == true)
	{
		browser +="FIREFOX";
	}
	else if( useragent.is(req.headers['user-agent']).ie  == true)
	{
		browser +="IE";
	}
	else if( useragent.is(req.headers['user-agent']).mobile_safari  == true)
	{
		browser +="MOBILE_SAFARI";
	}
	else if( useragent.is(req.headers['user-agent']).mozilla  == true)
	{
		browser +="MOZILLA";
	}
	else if( useragent.is(req.headers['user-agent']).opera  == true)
	{
		browser +="OPERA";
	}
	else if( useragent.is(req.headers['user-agent']).safari  == true)
	{
		browser +="SAFARI";
	}
	else if( useragent.is(req.headers['user-agent']).webkit  == true)
	{
		browser +="WEBKIT";
	}
	else if( useragent.is(req.headers['user-agent']).android  == true)
	{
		browser +="ANDROID";
	}
	browser += " " + useragent.is(req.headers['user-agent']).version;

	if ( geo == null) {
		geo={
		country:'NA'
		,city:'NA'
		,region:'NA'
		};
	}
	var BrowserInfo=
	{
	 BRWSR_NAME : browser
	,DEVICE : agent.device.toString()
	,OS : agent.os.toString()
	,LOGIN_DATE : ''
	,LOGOUT_DATE : ''
	,LOGIN_STATUS : ''
	,LOGIN_DESRC : ''
	,CLIENT_IP : requestIp.getClientIp(req) 
	,CLIENT_HOST : requestIp.getClientIp(req)
	,GEO_COUNTRY : geo.country
	,LANG : ''
	,USR_ID : ''
	,GRP_ID : ''
	,PROD_ID : ''
	,GEO_CITY : geo.city
	,GEO_DTL : req.headers['user-agent']
	,GEO_REGION : geo.region
	};
	res.locals.BrowserInfo  = BrowserInfo;
	next();
});   

function insertLogin(BrowserInfo) {
	var now = new Date();
	var jsonDate = now.toJSON();
	var then = new Date(jsonDate);
	BrowserInfo.MKR_ID= BrowserInfo.USR_ID;
	BrowserInfo.ATH_ID= BrowserInfo.USR_ID;
	BrowserInfo.LOGIN_DATE= then;
	BrowserInfo.DT_CREATED= then;
	BrowserInfo.DT_MODIFIED= then;
	console.log( 'INSERT INTO LOGIN HIST TABLE' + BrowserInfo);
}

app.get('/appstatus', function(req, res){
	res.send('Heaerie Mail Server Active');
});

app.post('/jsonSchema/:sjson' , function(req,res) {
	if(req.params.sjson == "basicDet.bson" )
	{
		res.send(  'E19D74C103555353C2086261736963446574C30D42617369632044657461696c73C4024541C500C60450414745C70B4e4f4e524541444f4e4c59DF120131DF130130C800C9014eCA0450414745CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fE19C00C103555353C2046e616d65C3054e616d6520C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01056e616d6531DF120131DF130130DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fC103555353C208626f647954797065C309426f64792054797065C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B424e4f4e457c4e6f6e657c534c494d7c536c696d7c415645524147457c417665726167657c4154484c455449437c4174686c657469637c48454156597c486561767920DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20A636f6d706c6578696f6eC30A636f6d706c6578696f6eC4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B604e4f4e457c4e6f6e657c56464149527c5665727920466169727c464149527c46616972207c57484541544953487c57686561746973687c4257484541544953487c5768656174697368207c42524f574e7c62726f776e7c4441524b7c4461726bDF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C203616765C30441676520C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C9014eCA064e554d424552CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C203646f62C30D44617465206f66204269727468C4044e4f4e45C500C60444415445C70B4e4f4e524541444f4e4c59C800C90159CA0444415445CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF041944442f4d4d2f59595959206f722044442f4d4f4e2f59595959DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C2087068795374617573C310506879736963616c2053746174757320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B424e4f4e457c4e6f6e657c4e4f524d414c7c4e6f726d616c7c504859534943414c4c594348414c4c454e4745447c506879736963616c6c79206368616c6c656e676564DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C206686569676874C30748656967687420C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20777656967687420C30757656967687420C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C6d6f74686572546f6e677565C30E4d6f7468657220546f6e67756520C4044e4f4e45C500C603444956C70B4e4f4e524541444f4e4c59C800C90159CA03444956CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C6d61726974616c5374617573C30F4d61726974616c2053746174757320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B264e4f4e457c4e6f6e657c557c556e6d6172726965647c4e4d7c4e65766572206d617272696564DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C656174696e67486162697473C30E456174696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B284e4f4e457c4e6f6e657c4e567c4e6f6e205665676574617269616e7c567c5665676574617269616eDF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20E6472696e6b696e67486162697473C3104472696e6b696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B224e4f4e457c4e6f6e657c4e447c4e6f6e2d6472696e6b65727c447c4472696e6b6572DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20D736d6f6b696e67486162697473C30F536d6f6b696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B204e4f4e457c4e6f6e657c4e537c4e6f6e2d736d6f6b65727c537c536d6f6b6572DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130');
	}
	else if(req.params.sjson == "basicDet.sjson" )
	{
		res.send(  '[{"group":"USS","name":"basicDet","label":"Basic Details","task":"EA","desc":"","htmlType":"PAGE","entitle":"NONREADONLY", maxCol:4, col: 1,"enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"name","label":"Name ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"name1",maxCol:4, col: 1,"min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"bodyType","label":"Body Type","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"complexion","label":"complexion","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"age","label":"Age ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"NUMBER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"dob","label":"Date of Birth","task":"NONE","desc":"","htmlType":"DATE","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"DATE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"DD/MM/YYYY or DD/MON/YYYY","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"phyStaus","label":"Physical Status ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"height","label":"Height ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"weight ","label":"Weight ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"motherTongue","label":"Mother Tongue ","task":"NONE","desc":"","htmlType":"DIV","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"DIV","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"maritalStaus","label":"Marital Status ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|U|Unmarried|NM|Never married","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"eatingHabits","label":"Eating Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NV|Non Vegetarian|V|Vegetarian","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"drinkingHabits","label":"Drinking Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|ND|Non-drinker|D|Drinker","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"smokingHabits","label":"Smoking Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NS|Non-smoker|S|Smoker","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');
	}
	else if(req.params.sjson == "signup.sjson" )
	{
		res.send('[{"group":"USS","name":"register","label":"Register","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"fName","label":"First Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"First Name / Given Name","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"lName","label":"Last Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"Lasr Name/Surname","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"mName","label":"Middle Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"20","tips":"Initial / Middle Name ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"email","label":"email address","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"email@myroomexpense.com","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"password","label":"New Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"verify","label":"Confirm Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');
	}
	else if(req.params.sjson == "signup.bson" )
	{
		res.send("E19D74C103555353C2086261736963446574C30D42617369632044657461696c73C4024541C500C60450414745C70B4e4f4e524541444f4e4c59C800C9014eCA0450414745CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120134DF130130E19C00C103555353C2046e616d65C3054e616d6520C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01056e616d6531DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120134DF130130C103555353C208626f647954797065C309426f64792054797065C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B424e4f4e457c4e6f6e657c534c494d7c536c696d7c415645524147457c417665726167657c4154484c455449437c4174686c657469637c48454156597c486561767920DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20A636f6d706c6578696f6eC30A636f6d706c6578696f6eC4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B604e4f4e457c4e6f6e657c56464149527c5665727920466169727c464149527c46616972207c57484541544953487c57686561746973687c4257484541544953487c5768656174697368207c42524f574e7c62726f776e7c4441524b7c4461726bDF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C203616765C30441676520C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C9014eCA064e554d424552CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C203646f62C30D44617465206f66204269727468C4044e4f4e45C500C60444415445C70B4e4f4e524541444f4e4c59C800C90159CA0444415445CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF041944442f4d4d2f59595959206f722044442f4d4f4e2f59595959DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C2087068795374617573C310506879736963616c2053746174757320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B424e4f4e457c4e6f6e657c4e4f524d414c7c4e6f726d616c7c504859534943414c4c594348414c4c454e4745447c506879736963616c6c79206368616c6c656e676564DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C206686569676874C30748656967687420C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20777656967687420C30757656967687420C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C6d6f74686572546f6e677565C30E4d6f7468657220546f6e67756520C4044e4f4e45C500C603444956C70B4e4f4e524541444f4e4c59C800C90159CA03444956CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C6d61726974616c5374617573C30F4d61726974616c2053746174757320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B264e4f4e457c4e6f6e657c557c556e6d6172726965647c4e4d7c4e65766572206d617272696564DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C656174696e67486162697473C30E456174696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B284e4f4e457c4e6f6e657c4e567c4e6f6e205665676574617269616e7c567c5665676574617269616eDF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20E6472696e6b696e67486162697473C3104472696e6b696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B224e4f4e457c4e6f6e657c4e447c4e6f6e2d6472696e6b65727c447c4472696e6b6572DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20D736d6f6b696e67486162697473C30F536d6f6b696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B204e4f4e457c4e6f6e657c4e537c4e6f6e2d736d6f6b65727c537c536d6f6b6572DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130");
	}
	else
	{
		res.send("{resp:'test'}");
	}
});

function addCoreFunction(req,callback) {
	req.getHeader=function(arg) {
		var retVal="";
		try {
			retVal=req.headers[arg]
		} catch(e) {
			retVal="";
		}
		return retVal;
	}
	req.setHeader=function(arg,value) {
		try {
			req.headers[arg]=value;
		} catch(e) {
			retVal="";
		}
	}
	req.getParam = function(arg) {
		var retVal="";
		if(req.method == "POST") {
			try {
				retVal=req.params[arg] || req.body[arg]  ;	
			} catch(e) {
				retVal="";
			}
		} else if (req.method == "GET") {
			try {
				retVal=req.query[arg]  || req.body[arg];	
			} catch(e) {
				retVal="";
			}
		}
		return retVal;
	}
	req.getMethod = function(arg) {
		return req.method;
	}
	callback(req);
}

function validInput(req, callback) {
	addCoreFunction(req, function(req) {
	var accessToken = req.getHeader("x-access-token");
	var grantType = req.getParam("grantType");
	var clientId = req.getParam("clientId");
	var scope = req.getParam("scope");
	var state = req.getHeader("user-agent");
	var respObj = {
		respCode : 0
		,respDescr : ""
		,accessToken : accessToken
		,userName : ""
		,error : ""
		,grantType : ""
		,isAccessTokenFound : false
		,clientId : ""
		,isClientIdFound : false
		,isValidGrantType : false
		,isScopeFound : false
		,redirectURI : ""
		,scope : ""
		,state : ""
	};
	respObj.state = state;
	if(respObj.accessToken != null) {
		respObj.isAccessTokenFound = true; 
	}
	if(grantType == "password") {
		respObj.isValidGrantType = true;
		respObj.grantType=grantType;
	} else {
		respObj.respCode=1;
		respObj.grantType=grantType;
		respObj.error="Invalid Grant Type";
	}
	if(clientId == "CLIENTSP") {
		respObj.isClientIdFound = true;
		respObj.clientId=clientId;
	} else {
		respObj.respCode=2;
		respObj.clientId=clientId;
		respObj.error="Invalid Client Id";
	}
	if(scope == "GSA") {
		respObj.isScopeFound = true;
		respObj.SCOPE=scope;
	} else {
		respObj.respCode=3;
		respObj.SCOPE=scope;
		respObj.error="Invalid Scope";
	}
	callback(req,respObj);
	});
}

function authvalidInput(req,callback) {
	addCoreFunction(req,function(req) {
	var accessToken=	req.getHeader("x-access-token");
	var grantType=req.getParam("grantType");
	var clientId=req.getParam("clientId");
	var scope=req.getParam("scope");
	var state =req.getHeader("user-agent");
	var respObj = {
		respCode : 0
		,respDescr : ""
		,accessToken : accessToken
		,userName : ""
		,error : ""
		,grantType : ""
		,isAccessTokenFound : false
		,clientId : ""
		,isClientIdFound: false
		,isValidGrantType : false
		,isScopeFound: false
		,redirectURI : ""
		,scope: ""
		,state: "" };
	respObj.state=state;
	if (respObj.accessToken != null) {
		respObj.isAccessTokenFound = true; 
	}
	/*need To be introduce table*/
	if (grantType == "password") {
		respObj.isValidGrantType = true;
		respObj.grantType=grantType;
	} else {
		respObj.respCode=1;
		respObj.grantType=grantType;
		respObj.error="Invalid Grant Type";
	}
	if (clientId == "CLIENTSP") {
		respObj.isClientIdFound = true;
		respObj.clientId=clientId;
	} else {
		respObj.respCode=2;
		respObj.clientId=clientId;
		respObj.error="Invalid Client Id";
	}
	if (scope == "GSA") {
		respObj.isScopeFound = true;
		respObj.SCOPE=scope;
	} else {
		respObj.respCode=3;
		respObj.SCOPE=scope;
		respObj.error="Invalid Scope";
	}
	log.info("in validate input :resp OBJ:")
	callback(req,respObj);
	});
}

function clientValidInput(req,callback)
{
	addCoreFunction(req,function(req) {
	var accessToken=	req.getHeader("x-access-token");
	var grantType=req.getParam("grantType");
	var clientId=req.getParam("clientId");
	var scope=req.getParam("scope");
	var state =req.getHeader("user-agent");
	var respObj= {
		respCode : 0
		,respDescr :""
		,accessToken :accessToken
		,userName    :""
		,error : ""
		,grantType : true
		,isAccessTokenFound : true
		,clientId :""
		,isClientIdFound: false
		,isValidGrantType : true
		,isScopeFound: true
		,redirectURI :""
		,scope:""
		,state: ""
	};
	respObj.state=state;
	if(respObj.accessToken != null)
	{
		respObj.isAccessTokenFound = true; 
	}
	/*need To be introduce table*/
/*
	if(grantType == "password")
	{
	 respObj.isValidGrantType = true;
	 respObj.grantType=grantType;
		
	}
	else
	{
		respObj.respCode=1;
		respObj.grantType=grantType;
		respObj.error="Invalid Grant Type";
	}
	*/
	if(clientId == "CLIENTSP")
	{
		respObj.isClientIdFound = true;
		respObj.clientId=clientId;
	}
	else
	{
		respObj.respCode=2;
		 respObj.clientId=clientId;
		respObj.error="Invalid Client Id";
	}
	/*[
	if(scope == "GSA") {
		respObj.isScopeFound = true;
		respObj.SCOPE=scope;
	} else {
		respObj.respCode=3;
		respObj.SCOPE=scope;
		respObj.error="Invalid Scope";
	}
]*/
	callback(req,respObj);
	});
}

function clientParamInput(req,callback)
{
	var accessToken=	req.getHeader("x-access-token");
	var grantType=req.getParam("grantType");
	var clientId=req.getParam("clientId");
	var scope=req.getParam("scope");
	var state =req.getHeader("user-agent");
	var respObj= {
		respCode : 0
		,respDescr :""
		,accessToken :accessToken
		,userName    :""
		,error : ""
		,grantType : true
		,isAccessTokenFound : true
		,clientId :""
		,isClientIdFound: false
		,isValidGrantType : true
		,isScopeFound: true
		,redirectURI :""
		,scope:""
		,state: ""
	};
	
	respObj.state=state;
	if(respObj.accessToken != null)
	{
		respObj.isAccessTokenFound = true; 
	}
	/*need To be introduce table*/

	if (["password", "token"].some(function(elem) { return elem ==  grantType})) {
	 respObj.isValidGrantType = true;
	 respObj.grantType=grantType;
	} else {
		return callback(new Error("Invalid grantType"))
	}

	if (clientId == "CLIENTSP") {
		respObj.isClientIdFound = true;
		respObj.clientId=clientId;
	} else {
		return callback(new Error("Invalid clientId"));
	}
	
	if( ["GPA", "CLIENTSP"].some( function(elem) { return elem ==  scope}) ) {
		respObj.isScopeFound = true;
		respObj.SCOPE=scope;
	} else {
		return callback(new Error("Invalid scope"));
	}
	
	callback(null, req,respObj);
}


function signToken(res,secretkey,callback)
{
	var payload={
		iss: "Heaerie GSL"
		,aud: "www.myroomexpense.com"
		,iat: sessionExpSec
		,name : "iat"
		};
		console.log(payload);
	var token = jwt.sign(payload, secretkey,{ });
	res.setHeader("x-access-token",token);
	callback(res);
}

function verifyToken(accessToken,secretkey,callback)
{
	var rslt=false;
	try {
		log.info("in verifyToken");
		var token = jwt.verify(accessToken,secretkey );
		rslt=true;
	} catch(e) {
		rslt=false;
		token={};
	}
	log.info("in verifyToken:token");
	callback(rslt,token);
}

function token(req,res)
{

//res.setHeader("x-access-token","tests" );
	log.info("in token :001");
	var successRespObj={
		token_type:"jwt"
	};
	var errorArr=[
	"invalid_request"
	,"unauthorized_client"
	,"access_denied"
	,"unsupported_response_type"
	,"invalid_scope"
	,"server_error"
	,"temporarily_unavailable"
	];
	var errorRespObj={
		error : ""
		,error_uri:""
	};

	log.info("in token :002");
	validInput(req, function(req,respObj)
	{
		if (respObj.respCode == 0)
		{
			var username=req.getParam("username");
			var password=req.getParam("password");
			//log.info("userName:" + username);
			//log.info("password:" + password);
			doLogin( username,password, function( result,chkRespMessage, logindata ){
					if(result ==false)
					{
						res.respObj=4;
						res.error="Access Denied";
						log.info("af : 001 : checkpwd");
						errorRespObj.error=errorArr[2];
						res.statusCode=304;
						res.send(JSON.stringify(errorRespObj));
					}
					else
					{
						var entitlement=[
							{
							'link' :'dashboard'
							,'linkName' :'Home'
							,'uid' :'dashboard'
							,'dataType' :'CONTAINER'
							,'child' : [{
									'link' :'dashboard'
									,'linkName' :'Dashboard'
									,'uid' :'dashboard2'
									, 'dataType' :'NODE'
									,'child'  : []
									}
									,
									{
									'link' :'basicDetUSSAdd'
									,'linkName' :'Basic Details'
									,'uid' :'basicDetUSSAdd'
									, 'dataType' :'NODE'
									,'child'  : []
									}
								]
							} , {
							'link' :'group'
							,'linkName' :'Group Service'
							,'uid' :'groupservice'
							,'dataType' :'CONTAINER'
							,'child' : [{
								'link' :'groupUSSView'
								,'linkName' :'Group'
								,'uid' :'group'
								,'dataType' :'NODE'
								,'child'  : []
								} , {
								'link' :'rollUSSView'
								,'linkName' :'Roll Details'
								,'uid' :'SchemaGenerator'
								,'dataType' :'NODE'
								,'child' : []
									}
								]
							} , {
							'link' :'admin'
							,'linkName' :'Admin Service'
							,'uid' :'admin'
							,'dataType' :'CONTAINER'
							,'child' : [{
								'link' :'SchemaGenerator'
								,'linkName' :'Schema Generator'
								,'uid' :'SchemaGenerator'
								,'dataType' :'NODE'
								,'child'  : []
									}
									,
									{
									'link' :'SchemaGeneratorView'
									,'linkName' :'Schema Generator View'
									,'uid'  :'SchemaGenerator'
									, 'dataType' :'NODE'
									,'child'  : []
									},
									{
									'link' :'KeyBoard'
									,'linkName' :'Documents'
									,'uid'  :'KeyBoard'
									, 'dataType' :'NODE'
									,'child'  : []
									}
								]
							}
						];
						/*successRespObj.entitlement= {entitle : 'dashboard'};*/
						successRespObj.entitlement= entitlement;
						successRespObj.logindata= logindata;
						log.info('send response S001');
						signToken(res,secretkey, function(res){
							log.error('send response');
							res.send(JSON.stringify(successRespObj));	
						});
					}
			});
		}
		else
		{
			if(respObj.isClientIdFound == false) {
				errorRespObj.error=errorArr[1];
			} else if (respObj.isValidGrantType ==false) {
				errorRespObj.error=errorArr[0];
			}
			errorRespObj.error=errorArr[3];
			res.statusCode=302;										
			res.send(JSON.stringify(errorRespObj));
			//res.send(JSON.stringify(res.respObj));
		}
	});
}

function validInputSSO(req,callback)
{
	addCoreFunction(req,function(req){
	//var contentType = response.getHeader('content-type');
	//console.log(req);
	var accessToken=	req.getHeader("x-access-token");
	var grantType=req.getParam("grantType");
	var clientId=req.getParam("clientId");
	var scope=req.getParam("scope");
	var state =req.getHeader("user-agent");
	var respObj= {
		respCode : 0
		,respDescr :""
		,accessToken :accessToken
		,userName    :""
		,error : ""
		,grantType : grantType
		,isAccessTokenFound : false
		,clientId :clientId
		,isClientIdFound: false
		,isValidGrantType : false
		,isScopeFound: false
		,redirectURI :""
		,scope:scope
		,state: state
	};
	respObj.state=state;
	if(respObj.accessToken != null)
	{
		respObj.isAccessTokenFound = true; 
	}
	callback(req,respObj);
	});
}

function tokenSSO(req,res)
{
	log.info("in token :001");
	var successRespObj={
		token_type:"jwt"
	};
	var errorArr=[
	"invalid_request"
	,"unauthorized_client"
	,"access_denied"
	,"unsupported_response_type"
	,"invalid_scope"
	,"server_error"
	,"temporarily_unavailable"
	];
	var errorRespObj={
		error : ""
		,error_uri:""
	};
	log.info("in token :002");
	validInputSSO(req, function(req,respObj) {
		log.info("AF:001:validInput ");
		var options = {
			method: 'POST',
			uri: 'http://localhost:' + config.port + '/gpasso/token',
			form: {            
						"grantType"     : "password" 
						,'clientId'    : req.getParam('clientId')
						,'scope'       : req.getParam('scope')
						,'username'    : req.getParam('username')
						,'password'    : req.getParam('password')
						,'redirectURI' : req.getParam('redirectURI')
				},
			headers: respObj
		};
		console.log(options);
		log.info("call request");
		request(options).then(function (resp) {
			log.info("call resp:", resp);
			res.send(resp.body);
		}).catch(function (err) {
			log.info("call err:", err);
			res.send(err);
		});
		log.info("after request");
	});
	log.info("in token :004");
}

function authorize(req,res)
{
	var successRespObj={
		token_type:"jwt"
	};
	var errorArr=[
	"invalid_request"
	,"unauthorized_client"
	,"access_denied"
	,"unsupported_response_type"
	,"invalid_scope"
	,"server_error"
	,"temporarily_unavailable"
	];
	var errorRespObj={
		error : ""
		,error_uri:""
	};
	authvalidInput(req, function(req,respObj)
	{
		log.info("AF:001:validInput ");
		//console.log(res.respObj);
		
		if (respObj.respCode == 0)
		{
			log.info("tocken:" + respObj.accessToken);
			verifyToken(respObj.accessToken, secretkey,function(result,token)
			{
				if(result ==false)
				{
					res.respObj=4;
					res.error="Access Denied";
					log.info("af : 001 : checkpwd");
					//res.statusCode =302;
					//res.end(302,JSON.stringify(res.respObj));
					errorRespObj.error=errorArr[2];
					res.statusCode=302;
					res.send(JSON.stringify(errorRespObj));
				}
				else
				{
					log.info("T:001:Sign Token");
					console.log(token);
					signToken(res,secretkey, function(res){
						res.send(JSON.stringify(successRespObj));	
					});
				}
			});
		} else {
			if(respObj.isClientIdFound == false) {
				errorRespObj.error=errorArr[1];
			} else if (respObj.isValidGrantType ==false) {
				errorRespObj.error=errorArr[0];
			}
			errorRespObj.error=errorArr[3];
			res.statusCode=302;
			res.send(JSON.stringify(errorRespObj));
		}
	});
}

function authorizeSSO(req,res)
{
	log.info("in token");
	var successRespObj={
		token_type:"jwt"
	};
	var errorArr=[
	"invalid_request"
	,"unauthorized_client"
	,"access_denied"
	,"unsupported_response_type"
	,"invalid_scope"
	,"server_error"
	,"temporarily_unavailable"
	];
	var errorRespObj={
		error : ""
		,error_uri:""
	};
	authvalidInput(req, function(req,respObj)
	{
		log.info("AF:001:validInput ");
		if (respObj.respCode == 0)
		{
			log.info("tocken:" + respObj.accessToken);
			verifyToken(respObj.accessToken, secretkey,function(result,token) {
			if (result == false) {
				res.respObj=4;
				res.error="Access Denied";
				log.info("af : 001 : checkpwd");
				errorRespObj.error=errorArr[3];
				res.statusCode=302;										
				res.send(JSON.stringify(errorRespObj));
			} else {
				insertLogin(res.locals.BrowserInfo );
				log.info("T:001:Sign Token");
				console.log(token);
				signToken(res,secretkey, function(res){
					res.send(JSON.stringify(successRespObj));	
				});
			}
			});
		} else {
			if(respObj.isClientIdFound == false) {
				errorRespObj.error=errorArr[1];
			} else if (respObj.isValidGrantType ==false) {
				errorRespObj.error=errorArr[0];
			}
			errorRespObj.error=errorArr[3];
			res.statusCode=302;										
			res.send(JSON.stringify(errorRespObj));
		}
	});
}

app.post('/gpasso/tokenSSO' , function(req,res) {
	tokenSSO(req,res);
}
);

app.post('/gpasso/token' , function(req,res) {
	token(req,res);
}); 
app.get('/token' , function(req,res) {
	token(req,res);
});

app.get('/gpasso/token' , function(req,res) {
	token(req,res);
});

app.post('/gpasso/token' , function(req,res) {
	
	token(req,res);
}
);

app.get('/gpasso/authorize' , function(req,res) { 
	authorize(req,res);
});

app.post('/gpasso/authorize' , function(req,res) {
	authorize(req,res);
});



function clientVerifyToken(req,res,next) {
	log.info("in token");
	var successRespObj={
		token_type:"jwt"
	};
	var errorArr=[
"invalid_request"
,"unauthorized_client"
,"access_denied"
,"unsupported_response_type"
,"invalid_scope"
,"server_error"
,"temporarily_unavailable"
];
	var errorRespObj={
		error : ""
		,error_uri:""
	};
	clientValidInput(req, function(req,respObj) {
		if (respObj.respCode == 0) {
			verifyToken(respObj.accessToken, secretkey,function(result,token) {
				if(result ==false)
				{
					res.respObj=4;
					res.error="Access Denied";
					log.info("af : 001 : checkpwd");
					//res.statusCode =302;
					//res.end(302,JSON.stringify(res.respObj));
					errorRespObj.error=errorArr[3];
					res.statusCode=302;										
					res.send(JSON.stringify(errorRespObj));
				} else {
					log.info("T:001:Sign Token");
					next(req,res);
				}
			});
		} else {
			if (respObj.isValidGrantType ==false) {
				errorRespObj.error=errorArr[0];
			}
			errorRespObj.error=errorArr[3];
			res.statusCode=302;										
			res.send(JSON.stringify(errorRespObj));
		}
	});
}

function getUserDetail(inUsrId, inGrpId,callback) {
	log.info("TODO: implement getUserDetails");
}

function registerUser(inUsrId, inGrpId,callback) {
	log.info("TODO: implement registerUser");
}

function getCardDetail( inUsrId, inGrpId,callback) {
	log.info("TODO: getCardDetails");
}

function USSField() {
	var retObj={
		'group'      : 'USS', /*it has been chabged by durai on 02-Feb-2010*/
		'name'       : 'name',
		'label'      : 'label',
		'task'       : 'NONE',
		'desc'       : '',
		'htmlType'   : 'text', /* newly introduced in USS05*/
		'entitle'    : 'READONLY', // Editable /Readonly
		'enttlname'  : '',//Entitle name to db
		'mndf'       : 'N',
		'dataType'   : 'VARCHAR',  // NUMBER/VARCHAR/DATE/EMAIL/AMOUNT/LIST/DIV/
		'cclass'     : 'ctable',   //
		'parent'     : '',
		'validate'   : '',
		'dflt'       : '',
		'min'        : '0',
		'max'        : '60',
		'tips'       : '',
		'onkeyup'    : 'onKeyUp(this);',
		'onchange'   : 'onChange(this);',
		'onkeydown'  : 'onKeyDown(this);',
		'onkeypress' : 'onKeyPress(this);',
		'onclick'    : 'onClick(this);',
		'onblure'    : 'onBlure(this);',
		'listVal'    : '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY',
		'help'       : 'N',
		'helpLink'   : 'helpload',
		'xml'        : 'Y',
		'xmlname'    : '',
		'Xpath'      : '/' ,
		'maxCol'     : '1',
		'col'        : '0'
	};
	return retObj;
}

function genSchema(title,fields) {
	var SchemaJson= [];
	fieldObj =    USSField();
	fieldObj.label    = title;
	fieldObj.name    =  title.replace(/ /g,'');
	fieldObj.listVal  = '';
	fieldObj.dataType = 'CONTAINER';
	fieldObj.htmlType = 'TABLE';
	fieldObj.dflt     = ''         ;
	fieldObj.mndf     = 'N';
	fieldObj.max      =  1;
	fieldObj.min      = 0;
	fieldObj.maxCol   =  parseInt((fields.length >6 ) ?  6 : fields.length );
	fieldObj.col      = 1;
	fieldObj.childs   = []	;
	for(var i=0; i< fields.length ; i++) {
		fieldChild       = USSField();
		fieldChild.name  = fields[i].name;
		fieldChild.label = fields[i].name.replace(/_/g,' ');
		fieldChild.max   = fields[i].length;
		fieldChild.dflt  = '';
		fieldObj.childs.push(fieldChild);		
	};
	SchemaJson.push(fieldObj);
	return SchemaJson;
}


function genSchemaCollection(title,fields) {
	var SchemaJson= [];
	fieldObj =    USSField();
	fieldObj.label    = title;
	fieldObj.name     =  title.replace(/ /g,'');
	fieldObj.listVal  = '';
	fieldObj.dataType = 'COLLECTION';
	fieldObj.htmlType = 'TABLE';
	fieldObj.dflt     = ''         ;
	fieldObj.mndf     = 'N';
	fieldObj.max      =  'unlimited';
	fieldObj.min      = 0;
	//maxCol:2, col: 1
	fieldObj.maxCol   =  parseInt((fields.length >6 ) ?  6 : fields.length );
	fieldObj.col      = 1;
	fieldObj.childs   = []	;
	for(var i=0; i< fields.length ; i++)
	{
		fieldChild       = USSField();
		fieldChild.name  = fields[i].name;
		fieldChild.label = fields[i].name.replace(/_/g,' ');
		fieldChild.max   = fields[i].length;
		fieldChild.dflt  = '';
		fieldObj.childs.push(fieldChild);		
	};
	SchemaJson.push(fieldObj);
	return SchemaJson;
}



serviceHandler=function(req, res) {
	
	log.info("req.params.task:" ,  req.params.task , "req.params.module", req.params.module );
	addCoreFunction(req, function(req) {
		log.info("calling clientParamInp" );
		
			
		var pageId="ServiceDetails";
		var pageType='getServiceDetails';
	//	var SchemaJson=[{"group":"USS","name":"ServiceDetails","label":"Basic Details","task":"ES","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"services","label":"Services","task":"NONE","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"unlimited","col":"0","childs":[{"group":"USS","name":"resSjson","label":"Response schema json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"unlimited","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"reqSjson","label":"Request schema json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"unlimited","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"authReqd","label":"Request Schema Json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"task","label":"Task","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]},{"group":"USS","name":"serviceName","label":"","task":"NONE","desc":"","htmlType":"VARCHAR","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}];
		var SchemaJson=[{"group":"USS","name":"ServiceDetails","label":"Basic Details","task":"ES","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"services","label":"Services","task":"NONE","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"unlimited","col":"0","childs":[{"group":"USS","name":"resSjson","label":"Response schema json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"unlimited","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"reqSjson","label":"Request schema json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"unlimited","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"authReqd","label":"Request Schema Json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"task","label":"Task","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"method","label":"Task","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]},{"group":"USS","name":"serviceName","label":"","task":"NONE","desc":"","htmlType":"VARCHAR","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}];
		var DataJson=[{"ServiceDetails":[{"services":[{"resSjson":"Response schema json","reqSjson":"","authReqd":"", "task" : req.params.task , "method" : "POST"}],"serviceName":req.params.module}]}]
		log.info("calling InvokeDB for serviceDetails");
		
		idb.InvokeDB(pageId, pageType, SchemaJson,DataJson, SchemaJson, function(err, respSchemaJson, respDataJson) {
			if (err) {
				log.error(" Request has bad format:", err);
				res.statusCode= 404;
				return	res.send({errorDesc : "Request is not found:" + err.message  });
			}
			log.info("calling validate response ");
			err=heaeriesjson.valWithSch(respSchemaJson, respDataJson)
			if(err) {
				log.error("Service Details : Response Schema validation is failed : ", err);
				res.statusCode=500;
				res.send({errorDesc : "Internal Server Error"});
				throw new Error("Response Schema Validation Failed" + err.message);
			}
			log.info("calling validate response ");
		/*TODO: if task is not found return 404*/
			findService(respDataJson[0].ServiceDetails[0].services, req.params.task, req.getMethod(), function(err, currentService) {
				if (err) {
					log.error("findService : ", err);
					res.statusCode=err.httpRespCode;
					return	res.send({errorDesc : err.name + " " + err.message });
				}
				
				clientParamInput(req, function(err, req, paramObj) {
				log.info(" paramObj: " ,paramObj );

				if (err) {
					log.error("Request has invalid format: " ,err);
					res.statusCode = 400;
					return	res.send({errorDesc : err.message });
				}
				var apiPageId = req.params.module;
				var apiPageType = req.params.task;
				var apiParamDataJson = eval(req.getParam(currentService.reqSjson[0].name));
				log.info("validate input");
				err = heaeriesjson.valWithSch(currentService.reqSjson, apiParamDataJson);
				if (err) {
					log.error("Request has invalid format: " ,err);
					res.statusCode = 400;
					return	res.send({errorDesc : err.message });
				}
				log.info("call api mapper..",  JSON.stringify(apiParamDataJson));
				idb.InvokeDB(apiPageId, apiPageType, currentService.reqSjson, apiParamDataJson, currentService.resSjson, function(err, apiSchemaJson, apiDataJson) {
					//res.send({"ServiceDetails" : respDataJson[0].ServiceDetails});
							if (err) {
								log.error("API  InvokeDB :" ,err);
								res.statusCode = err.httpRespCode;
								return	res.send({errorDesc :  err.name + " " + err.message });
							}
							
							err = heaeriesjson.valWithSch(apiSchemaJson, apiDataJson);
							if (err) {
								log.error("Internal Server Errot" ,err);
								res.statusCode = 500;
								return	res.send({errorDesc : err.message });
							}
							
							res.statusCode = 201;
							signToken(res, secretkey, function(res) {
								return	res.send(apiDataJson);
							});
				});
				
			});
		});	
		});	
	});
}

findService=function(services, task, method, callback) {
	for (var i=0; i<services.length; i++) {
		if ((services[i].task == task) && (services[i].method == method)) {
		return callback(null, services[i]);
		}
	}

	var TaskList = new Array();
	services.forEach(function(elem) { TaskList.push(elem.task)} );
	
	if (!TaskList.some( function(elem) { return elem == task})) {
		return callback(new TaskNotFound("Task is not found :[" + task +"] in " + TaskList));
	} else {
		return callback(new MethodIsNotFound("Method is not found :[" + task +"]"));
	}
}

function validateHeader(req,callback) {

	var accessToken=req.getHeader("x-access-token");
	var grantType=req.getParam("grantType");
	var clientId=req.getParam("clientId");
	var scope=req.getParam("scope");
	var state =req.getHeader("user-agent");
	var respObj= {
		respCode : 0
		,respDescr :""
		,accessToken :accessToken
		,userName    :""
		,error : ""
		,grantType : true
		,isAccessTokenFound : true
		,clientId :""
		,isClientIdFound: false
		,isValidGrantType : true
		,isScopeFound: true
		,redirectURI :""
		,scope:""
		,state: ""
	};
	respObj.state=state;
	if(respObj.accessToken != null)
	{
		respObj.isAccessTokenFound = true; 
	}
	/*need To be introduce table*/
    /*
	if(grantType == "password")
	{
	 respObj.isValidGrantType = true;
	 respObj.grantType=grantType;
		
	}
	else
	{
		respObj.respCode=1;
		respObj.grantType=grantType;
		respObj.error="Invalid Grant Type";
	}
	*/
	if(clientId == "CLIENTSP")
	{
		respObj.isClientIdFound = true;
		respObj.clientId=clientId;
	}
	else
	{
		respObj.respCode=2;
		respObj.clientId=clientId;
		respObj.error="Invalid Client Id";
	}
	/*[
	if(scope == "GSA") {
		respObj.isScopeFound = true;
		respObj.SCOPE=scope;
	} else {
		respObj.respCode=3;
		respObj.SCOPE=scope;
		respObj.error="Invalid Scope";
	}
	]*/
	callback(req,respObj);
}

app.post('/service/:module/:task', serviceHandler);
app.get('/service/:module/:task', serviceHandler);

app.post('/api/:module/:service', function(req,res) {
	log.info("/api/" +req.params.module +"/"+ req.params.service );
	if  (req.params.module  == 'signup') {
		switch (req.params.service)
		{
			case  'register' :
				registerUser( 1, 1, function(status, respMessage,data) {
					var pageId=1;
					var pageType='NAVI';
					var SchemaJson={Schema:'Dashboard'};
					var DataJson={DataJson:'Dashboard'};
					if( status)
					{
							var respJson={};
							title="UserDetails";
							respJson.schemaJson = genSchema(title, respMessage);//genSchema(respMessage);
							respJson.jsonData = [ {UserDetails : data}];
							res.send(respJson);
					}
					else
					{
							res.send(data[0]);	
					}
				});
			break;
		}
	} else {
		clientVerifyToken(req, res, function (req,res){
		switch (req.params.module)
		{
			case 'dashboard' :
			switch (req.params.service)
			{
				case  'getUserDetail' :
					getUserDetail( req.body.usrId, req.body.grpId, function(status, respMessage, data) { 
						if( status) {
							var  respJson={};
							title="UserDetails";
							respJson.schemaJson = genSchema(title,respMessage);//genSchema(respMessage);
							respJson.jsonData   = [ {UserDetails : data}];
							res.send(respJson);
						} else {
							res.send(data[0]);	
						}
					});
					break;
				case 'getCardDetail' :
					getCardDetail( req.body.usrId, req.body.grpId , function(status, respMessage,data) {
						if( status) {
							var  respJson={};
							title="CardDetail";
							respJson.schemaJson = genSchemaCollection(title,respMessage);//genSchema(respMessage);
							respJson.jsonData   = [ {CardDetail : data}];
							res.send(respJson);
						} else {
							res.send(data[0]);	
						}
					});
					break;
			}
		break;
		case  'signup' :
			switch (req.params.service) {
				case  'register' :
					getUserDetail( 1, 1, function(status, respMessage,data) {
						if( status) {
							var  respJson={};
							title = "UserDetails";
							respJson.schemaJson = genSchema(title,respMessage);//genSchema(respMessage);
							respJson.jsonData   = [ {UserDetails : data}];
							res.send(respJson);
						} else {
							res.send(data[0]);	
						}
					});
		}
		break;	
		case  'basicDet' :
		console.log(req.params.service);
			switch (req.params.service) {
				case  'Add' :
					console.log(req.body.basicDet);
					respObj={
						curr_page_id : '1'
						,currState   :'basicDetUSSAdd'
						,nextState   :'basicDetUSSView'
						,respCode    :'0'
						,respDescr   :'successfully Saved'
						,basicDet    : req.body.basicDet
					};
					res.send(respObj);
					break;
				case  'save' :
					respObj={
						curr_page_id : '1'
						,currState   :'basicDetUSSSave'
						,nextState   :'basicDetUSSView'
						,respCode    :'0'
						,respDescr   :'successfully Saved'
						,basicDet    : req.body.basicDet
					};
					res.send(respObj);
					break;
				case  'new' :
					respObj={
						curr_page_id : '1'
						,currState   :'basicDetUSSNew'
						,nextState   :'basicDetUSSView'
						,respCode    :'0'
						,respDescr   :'successfully Saved'
						,basicDet    : req.body.basicDet
					};
					res.send(respObj);
					break;
			}
			break;
			case  'login' :
				console.log('In login module');
				break;
			} 
		});
	}
});

app.use(express.static(__dirname+'/public'));
var server = app.listen(config.port, function() {
	console.log('Listening on port %d', server.address().port);
});
