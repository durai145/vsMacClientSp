var mapper= require('./mapper').mapper;
var log = require('../libs/log')(module);
var heaeriesjson = require("../uss/heaeriesjson");
var sjson = []; 
var  json = [];



console.log(mapper);

var  InvokeDB = function(pageId, pageType, SchemaJson, DataJson, respSchemaJson, calback) {
	
	var err = heaeriesjson.valWithSch(SchemaJson, DataJson);
	if (err) {
		throw calback(err);
	} 	
	require('./map/' + mapper[pageId].map)[pageType](SchemaJson, DataJson, respSchemaJson, calback);		
}
var pageId="ServiceDetails";
//var pageType='getServiceDetails';
var pageType='saveServiceDetails';
var SchemaJson=[{"group":"USS","name":"ServiceDetails","label":"Basic Details","task":"ES","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"services","label":"Services","task":"NONE","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"unlimited","col":"0","childs":[{"group":"USS","name":"resSjson","label":"Response schema json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"unlimited","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"reqSjson","label":"Request schema json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"unlimited","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"authReqd","label":"Request Schema Json","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"task","label":"Task","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"method","label":"Task","task":"NONE","desc":"","htmlType":"TEXT","entitle":"READONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]},{"group":"USS","name":"serviceName","label":"","task":"NONE","desc":"","htmlType":"VARCHAR","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}];
//var DataJson=[{"ServiceDetails":[{"services":[{"resSjson":"Response schema json","reqSjson":"","authReqd":"", "task" : "getUserDetails"}],"ServiceName":""}]}]
var resSchema = require("./loginDetailsResponseSchema.json");
var reqSchema = require("./loginDetailsRequestSchema.json");
var DataJson=[{"ServiceDetails":[{"services":[{"resSjson":resSchema,"reqSjson": reqSchema,"authReqd": false ,"task":"doLogin", "method" : "POST"}],"serviceName":"loginDetails"}]}];


try {
	InvokeDB(pageId,pageType, SchemaJson, DataJson, SchemaJson, function(err, respSchemaJson, respDataJson) {
		if(err) {

			console.log("ERROR:calling InvokeDB:002", err);
			
			return;
		}
		/*TODO: Change order of the argument*/
		err=heaeriesjson.valWithSch(respSchemaJson, respDataJson);
		if(err) {
			throw new Error("Response Schema Validation Failed" + err);
		}

		console.log(JSON.stringify(respDataJson));
	});
} catch(e) {

	console.log(e);
}
console.log("calling InvokeDB:003");
exports.InvokeDB=InvokeDB;
