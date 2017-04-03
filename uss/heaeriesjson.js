var ns= require("./heaeriedatatype.json" );
var sjson= require("./loginApi.json" );
var lgns = require("./logindatatype.json");
lgns.forEach(function(lgnsObj) {
	ns.push(lgnsObj);
});

expandDataType= function(sjson, ns ) {
	var rtObj= new Array();
	sjson.forEach( function(sjsonObj) {
		var rpObj= {};
		var found= false;
		var dataTypeArr=  sjsonObj.dataType.split("."); 
		var dataObj={};
			if (dataTypeArr.length == 3) {
				dataObj= {
				"namespace" :  dataTypeArr[0]
				, "package" :  dataTypeArr[1]
				, "dataType" : dataTypeArr[2]
				};
			} else if (dataTypeArr.length ==2 ) {
				dataObj= {
				"namespace" :  "heaerie"
				, "package" :  dataTypeArr[0]
				, "dataType" : dataTypeArr[1]
				};
			} else {
				dataObj= {
				"namespace" :  "heaerie"
				, "package" :   "system"
				, "dataType" : dataTypeArr[0]
				};
			}
			if(hasChild(sjsonObj)) {
				var rtData	=	expandDataType(sjsonObj.childs, ns );
				rpObj=copyObject(sjsonObj,sjsonObj);
				rpObj.childs = rtData;
				found = true;
			} else {
				ns.forEach(function(nameSpaceObj) {
				console.log(" nameSpaceObj.name  = %s , dataObj.namespace = %s ", nameSpaceObj.name, dataObj.namespace );
				if (nameSpaceObj.name == dataObj.namespace ) {
					if ( hasChild( nameSpaceObj)) {
							nameSpaceObj.childs.forEach( function(packageObj) {
							if ( dataObj.package  ==  packageObj.name )  {
								if( hasChild(packageObj)) {
									packageObj.childs.forEach( function(dataType) {
										if(dataType.name == dataObj.dataType) {
											rpObj=copyObject(sjsonObj,dataType);
											found = true;
										}
									});
								}
							}
						});
					}
				}
			});
		}
		if ( found ) {
			rtObj.push(rpObj);
		} else {
			rtObj.push(sjsonObj);
		}
	});
	return rtObj;
}

copyObject=function(sjsonObj,dataType) {
var obj =  {
	"group" :  sjsonObj.group
	,"name" :  sjsonObj.name
	,"label" :  sjsonObj.label
	,"task" :  sjsonObj.task
	,"desc" :  sjsonObj.desc
	,"htmlType" :  dataType.htmlType
	,"entitle" :  sjsonObj.entitle
	,"enttlname" :  sjsonObj.enttlname
	,"mndf" :  sjsonObj.mndf
	,"dataType" :  dataType.name
	,"cclass" :  dataType.cclass
	,"parent" :  sjsonObj.parent
	,"parentHtmlType" :  sjsonObj.parentHtmlType
	,"validate" :  dataType.validate
	,"dflt" :  sjsonObj.dflt
	,"min" :  dataType.min
	,"max" :  dataType.max
	,"tips" :  sjsonObj.tips
	,"onkeyup" : 'onKeyUp(this);'
	,"onchange" : 'onChange(this);'
	,"onkeydown" : 'onKeyDown(this);'
	,"onkeypress" : 'onKeyPress(this);'
	,"onclick" : 'onClick(this);'
	,"onblure" : 'onBlure(this);'
	,"listVal" :  dataType.listVal
	,"help" :  sjsonObj.help
	,"helpLink" :  dataType.helpLink
	,"xml" :  sjsonObj.xml
	,"xmlname" :  sjsonObj.xmlname
	,"Xpath" :  sjsonObj.Xpath
	,"maxCol" :  sjsonObj.maxCol
	,"col" :  sjsonObj.col
	,"childs" : []
	};
	if (hasChild(dataType)) {
		obj.childs.push(dataType.childs);
	}
	return obj;
}

hasChild=function(fieldObj) {
	if( Array.isArray(fieldObj.childs)) {
		if( fieldObj.childs.length == 0 ) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

var exapandSchema=expandDataType(sjson, ns) ;
validateUssField= function(field) {

}

alert=function(str) {
	console.log(str);
}

valWithSch = function (rec,recSch) {
	for (var r=0; r<rec.length; r++) {
		for (var s =0; s <recSch.length; s++) {
			var value=rec[r][recSch[s].name];
			if ((recSch[s].dataType != "CONTAINER") || (recSch[s].dataType != "PAGE")) {
				if (value === undefined) {
					value=new String();
				}
				if (recSch[s].childs === undefined) {
					recSch[s].childs=new Array();
				}
				if (recSch[s].htmlType === undefined) {
					recSch[s].htmlType= new String();
				}
				if (recSch[s].dataType === undefined) {
					recSch[s].dataType = new String();
				}
				if (recSch[s].groupId === undefined) {
					recSch[s].groupId = new String();
				}
				if(recSch[s].mndf == "Y") {
					if (value == "") {
						alert(recSch[s].name + " is mandatory: " + value);
						return false;
					}
				}
				switch (recSch[s].dataType) {
					case "DATE" : 
						re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
						if((value != '') && (!value.match(re))) {
							alert(recSch[s].name + "Invalid date format: " + value);
							return false;
						}
						break;
					case "TIME" :
						re = /^\d{1,2}:\d{2}([ap]m)?$/;
						if(value != '' && !value.match(re)) {
							alert(recSch[s].name + " Invalid " + recSch[s].dataType + " format: " + value);
							return false;
						}
						break;
					case "NUMBER" :
						if (recSch[s].max != "unlimited") {
							re = RegExp("^[0-9.]{"+ recSch[s].min + "," + recSch[s].max + "}$");
							if(value != '' && !re.test(value)) {
								alert( recSch[s].name + " Exceed  limit " + recSch[s].min + " to " + recSch[s].max );
								return false;
							}
						} else {
							re =/^[A-Za-z0-9_]$/;
							if(value != '' && !value.match(re)) {
								alert( recSch[s].name + " Invalid " + recSch[s].dataType + " format: " + value);
							return false;
							}
						}
						break;
					case "VARCHAR" :
						if (recSch[s].max != "unlimited") {
							re = RegExp("^[A-Za-z0-9_\s]{"+ recSch[s].min + "," + recSch[s].max + "}$");
							if(value != '' && !value.match(re)) {
								alert(recSch[s].name +"Exceed  limit " + recSch[s].min + " to " + recSch[s].max +"[ " + value + "]" );
								return false;
							}
						} else {
							re =/^[A-Za-z0-9_\s]+$/;
							if(typeof value == "object") {
								try {
									JSON.stringify(value);		
								} catch(e) {
									alert(recSch[s].name + " Invalid " + recSch[s].dataType + " format:[" + value +"] " + e);
								}
							} else {
								if((value != "") && (!value.match(re))) {
									alert(recSch[s].name + " Invalid " + recSch[s].dataType + " format:[" + value +"]");
									return false;
								}
							}
						} 
						break;
					case "LIST" :
					case "OPTION" :
						recSch[s].listVal
						if (value != '') {
							var inpStrArr= recSch[s].listVal.split('|');
							var chk=0;
							for(var i = 0;i < inpStrArr.length; i += 2) {
								if( value == inpStrArr[i]) {
								chk=1;
								}
							}
							if (chk != 1) {
								alert( recSch[s].name + " Invalid " + recSch[s].dataType + " format: " + value);
								return false;
							}
						}
					}
				}
				if (recSch[s].childs === undefined) {
					recSch[s].childs=new Array();
				}
				if(valWithSch(value,recSch[s].childs) == false) {
					alert( "Failed at child validation of " + recSch[s].name);
					return false;
				}
			}
		}
	return true;
}

exports.valWithSch=valWithSch;
exports.validateUssField=validateUssField;
