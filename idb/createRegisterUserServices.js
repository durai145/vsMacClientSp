var mapper = require('./mapper').mapper;
var log = require('../libs/log')(module);
var heaeriesjson = require("../uss/heaeriesjson");
var sjson = [];
var json = [];
var InvokeDB = function (pageId, pageType, SchemaJson, DataJson, respSchemaJson, calback) {
    log.info("InvokeDB:IDB.001 valWithSch");
    var err = heaeriesjson.valWithSch(SchemaJson, DataJson);
    if (err) {
        throw calback(err);
    }
    log.info("InvokeDB:IDB.002 mapper pageId:" + pageId);
    log.info("InvokeDB:IDB.002 mapper pageType:" + pageType);
    require('./map/' + mapper[pageId].map)[pageType](SchemaJson, DataJson, respSchemaJson, calback);
    log.info("InvokeDB:IDB.003 after");
}

var pageId = "RegisterUser";
var pageType = 'saveRegisterUser';
var SchemaJson = [{
    "group": "USS",
    "name": "ServiceDetails",
    "label": "Basic Details",
    "task": "ES",
    "desc": "",
    "htmlType": "PAGE",
    "entitle": "NONREADONLY",
    "enttlname": "",
    "mndf": "N",
    "dataType": "PAGE",
    "cclass": "ctable",
    "parent": "",
    "parentHtmlType": "",
    "validate": "",
    "dflt": "",
    "min": "0",
    "max": "60",
    "tips": "",
    "onkeyup": "onKeyUp(this);",
    "onchange": "onChange(this);",
    "onkeydown": "onKeyDown(this);",
    "onkeypress": "onKeyPress(this);",
    "onclick": "onClick(this);",
    "onblure": "onBlure(this);",
    "listVal": "0",
    "help": "N",
    "helpLink": "helpload",
    "xml": "Y",
    "xmlname": "",
    "Xpath": "/",
    "maxCol": "1",
    "col": "0",
    "childs": [{
        "group": "USS",
        "name": "services",
        "label": "Services",
        "task": "NONE",
        "desc": "",
        "htmlType": "CONTAINER",
        "entitle": "READONLY",
        "enttlname": "",
        "mndf": "N",
        "dataType": "CONTAINER",
        "cclass": "ctable",
        "parent": "",
        "parentHtmlType": "",
        "validate": "",
        "dflt": "",
        "min": "0",
        "max": "60",
        "tips": "",
        "onkeyup": "onKeyUp(this);",
        "onchange": "onChange(this);",
        "onkeydown": "onKeyDown(this);",
        "onkeypress": "onKeyPress(this);",
        "onclick": "onClick(this);",
        "onblure": "onBlure(this);",
        "listVal": "||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY",
        "help": "N",
        "helpLink": "helpload",
        "xml": "Y",
        "xmlname": "",
        "Xpath": "/",
        "maxCol": "unlimited",
        "col": "0",
        "childs": [{
            "group": "USS",
            "name": "resSjson",
            "label": "Response schema json",
            "task": "NONE",
            "desc": "",
            "htmlType": "TEXT",
            "entitle": "READONLY",
            "enttlname": "",
            "mndf": "N",
            "dataType": "VARCHAR",
            "cclass": "ctable",
            "parent": "",
            "parentHtmlType": "",
            "validate": "",
            "dflt": "",
            "min": "0",
            "max": "unlimited",
            "tips": "",
            "onkeyup": "onKeyUp(this);",
            "onchange": "onChange(this);",
            "onkeydown": "onKeyDown(this);",
            "onkeypress": "onKeyPress(this);",
            "onclick": "onClick(this);",
            "onblure": "onBlure(this);",
            "listVal": "||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY",
            "help": "N",
            "helpLink": "helpload",
            "xml": "Y",
            "xmlname": "",
            "Xpath": "/",
            "maxCol": "1",
            "col": "0",
            "childs": []
        }, {
            "group": "USS",
            "name": "reqSjson",
            "label": "Request schema json",
            "task": "NONE",
            "desc": "",
            "htmlType": "TEXT",
            "entitle": "READONLY",
            "enttlname": "",
            "mndf": "N",
            "dataType": "VARCHAR",
            "cclass": "ctable",
            "parent": "",
            "parentHtmlType": "",
            "validate": "",
            "dflt": "",
            "min": "0",
            "max": "unlimited",
            "tips": "",
            "onkeyup": "onKeyUp(this);",
            "onchange": "onChange(this);",
            "onkeydown": "onKeyDown(this);",
            "onkeypress": "onKeyPress(this);",
            "onclick": "onClick(this);",
            "onblure": "onBlure(this);",
            "listVal": "||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY",
            "help": "N",
            "helpLink": "helpload",
            "xml": "Y",
            "xmlname": "",
            "Xpath": "/",
            "maxCol": "1",
            "col": "0",
            "childs": []
        }, {
            "group": "USS",
            "name": "authReqd",
            "label": "Request Schema Json",
            "task": "NONE",
            "desc": "",
            "htmlType": "TEXT",
            "entitle": "READONLY",
            "enttlname": "",
            "mndf": "N",
            "dataType": "VARCHAR",
            "cclass": "ctable",
            "parent": "",
            "parentHtmlType": "",
            "validate": "",
            "dflt": "",
            "min": "0",
            "max": "60",
            "tips": "",
            "onkeyup": "onKeyUp(this);",
            "onchange": "onChange(this);",
            "onkeydown": "onKeyDown(this);",
            "onkeypress": "onKeyPress(this);",
            "onclick": "onClick(this);",
            "onblure": "onBlure(this);",
            "listVal": "||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY",
            "help": "N",
            "helpLink": "helpload",
            "xml": "Y",
            "xmlname": "",
            "Xpath": "/",
            "maxCol": "1",
            "col": "0",
            "childs": []
        }, {
            "group": "USS",
            "name": "task",
            "label": "Task",
            "task": "NONE",
            "desc": "",
            "htmlType": "TEXT",
            "entitle": "READONLY",
            "enttlname": "",
            "mndf": "N",
            "dataType": "VARCHAR",
            "cclass": "ctable",
            "parent": "",
            "parentHtmlType": "",
            "validate": "",
            "dflt": "",
            "min": "0",
            "max": "60",
            "tips": "",
            "onkeyup": "onKeyUp(this);",
            "onchange": "onChange(this);",
            "onkeydown": "onKeyDown(this);",
            "onkeypress": "onKeyPress(this);",
            "onclick": "onClick(this);",
            "onblure": "onBlure(this);",
            "listVal": "||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY",
            "help": "N",
            "helpLink": "helpload",
            "xml": "Y",
            "xmlname": "",
            "Xpath": "/",
            "maxCol": "1",
            "col": "0",
            "childs": []
        }, {
            "group": "USS",
            "name": "method",
            "label": "Task",
            "task": "NONE",
            "desc": "",
            "htmlType": "TEXT",
            "entitle": "READONLY",
            "enttlname": "",
            "mndf": "Y",
            "dataType": "VARCHAR",
            "cclass": "ctable",
            "parent": "",
            "parentHtmlType": "",
            "validate": "",
            "dflt": "",
            "min": "0",
            "max": "60",
            "tips": "",
            "onkeyup": "onKeyUp(this);",
            "onchange": "onChange(this);",
            "onkeydown": "onKeyDown(this);",
            "onkeypress": "onKeyPress(this);",
            "onclick": "onClick(this);",
            "onblure": "onBlure(this);",
            "listVal": "||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY",
            "help": "N",
            "helpLink": "helpload",
            "xml": "Y",
            "xmlname": "",
            "Xpath": "/",
            "maxCol": "1",
            "col": "0",
            "childs": []
        }]
    }, {
        "group": "USS",
        "name": "serviceName",
        "label": "",
        "task": "NONE",
        "desc": "",
        "htmlType": "VARCHAR",
        "entitle": "READONLY",
        "enttlname": "",
        "mndf": "N",
        "dataType": "VARCHAR",
        "cclass": "ctable",
        "parent": "",
        "parentHtmlType": "",
        "validate": "",
        "dflt": "",
        "min": "0",
        "max": "60",
        "tips": "",
        "onkeyup": "onKeyUp(this);",
        "onchange": "onChange(this);",
        "onkeydown": "onKeyDown(this);",
        "onkeypress": "onKeyPress(this);",
        "onclick": "onClick(this);",
        "onblure": "onBlure(this);",
        "listVal": "||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY",
        "help": "N",
        "helpLink": "helpload",
        "xml": "Y",
        "xmlname": "",
        "Xpath": "/",
        "maxCol": "1",
        "col": "0",
        "childs": []
    }]
}];
//var DataJson=[{"ServiceDetails":[{"services":[{"resSjson":"Response schema json","reqSjson":"","authReqd":"", "task" : "getUserDetails"}],"ServiceName":""}]}]
var resSchema = require("../jsonSchema/registerUserResponseSchema.json");
var reqSchema = require("../jsonSchema/registerUserRequestSchema.json");
var DataJson = [{
    "registerUserRequest": [{
            "userDetails": [{
                "userRole": "INTERNAL",
                "userType": "MEMBER",
                "empId": "",
                "emailId": "",
                "username": "",
                "middleName": "",
                "lastName": "",
                "firstName": ""
            }]
        },
        {
            "prodDetails": [{
                "prodName": "",
                "prodVersion": "",
                "prtlName": "",
                "prtlVersion": "",
                "roleName": ""
            }]
        }
    ]
}];

try {
    log.info("call InvokeDB:001");
    InvokeDB(pageId, pageType, SchemaJson, DataJson, SchemaJson, function (err, respSchemaJson, respDataJson) {
        log.info("InvokeDB:I.001");
        if (err) {
            console.log("ERROR:calling InvokeDB:002", err);
            return err;
        }
        log.info("call InvokeDB:I.002");
        /*TODO: Change order of the argument*/
        err = heaeriesjson.valWithSch(respSchemaJson, respDataJson);
        if (err) {
            throw new Error("Response Schema Validation Failed" + err);
        }
        log.info("call InvokeDB:I.003");

        console.log(JSON.stringify(respDataJson));
    });
} catch (e) {

    console.log(e);
}
console.log("calling InvokeDB:003");
exports.InvokeDB = InvokeDB;