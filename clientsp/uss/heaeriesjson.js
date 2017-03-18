var ns= require("./heaeriedatatype.json" );
var sjson= require("./loginApi.json" );
var lgns = require("./logindatatype.json");
//console.log(ns);
console.log(lgns);

lgns.forEach(function(lgnsObj) {
	ns.push(lgnsObj);

});
console.log(ns);


expandDataType= function(sjson, ns ) {

	var rtObj= new Array();
	sjson.forEach( function(sjsonObj) {
				var rpObj= {};
				var found= false;


		     var dataTypeArr=  sjsonObj.dataType.split("."); 
		      var dataObj={};

			if ( dataTypeArr.length == 3 ) {
			
			     dataObj= {
				"namespace" :  dataTypeArr[0]
				, "package" :  dataTypeArr[1]
				, "dataType" : dataTypeArr[2]
				};
			
			} else if (dataTypeArr.length ==2 ){
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

			console.log("dataObj = %s", JSON.stringify(dataObj));

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
								console.log(" dataObj.package  = %s , packageObj.name = %s ", dataObj.package, packageObj.name );

									if ( dataObj.package  ==  packageObj.name )  {

											if( hasChild(packageObj)) {
											packageObj.childs.forEach( function(dataType) {
														console.log(" dataType.name = %s , sjsonObj.dataType = %s ", dataType.name, sjsonObj.dataType );
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

//console.log('dataType');
//console.log(dataType);

var obj =  {
 "group"	:  sjsonObj.group
,"name"		:  sjsonObj.name
,"label"	:  sjsonObj.label
,"task"		:  sjsonObj.task
,"desc"		:  sjsonObj.desc
,"htmlType"	:  dataType.htmlType
,"entitle"	:  sjsonObj.entitle
,"enttlname"	:  sjsonObj.enttlname
,"mndf"		:  sjsonObj.mndf
,"dataType"	:  dataType.name
,"cclass"	:  dataType.cclass
,"parent"	:  sjsonObj.parent
,"parentHtmlType":  sjsonObj.parentHtmlType
,"validate"	:  dataType.validate
,"dflt"		:  sjsonObj.dflt
,"min"		:  dataType.min
,"max"		:  dataType.max
,"tips"		:  sjsonObj.tips
,"onkeyup"	: 'onKeyUp(this);'
,"onchange"	: 'onChange(this);'
,"onkeydown"	: 'onKeyDown(this);'
,"onkeypress"	: 'onKeyPress(this);'
,"onclick"	: 'onClick(this);'
,"onblure"	: 'onBlure(this);'
,"listVal"	:  dataType.listVal
,"help"		:  sjsonObj.help
,"helpLink"	:  dataType.helpLink
,"xml"		:  sjsonObj.xml
,"xmlname"	:  sjsonObj.xmlname
,"Xpath"	:  sjsonObj.Xpath
,"maxCol"	:  sjsonObj.maxCol
,"col"		:  sjsonObj.col
,"childs": []	
	};

	if (hasChild(dataType)) {
		obj.childs.push(dataType.childs);

	}


return obj;

}

hasChild=function(fieldObj)
{
	//console.log(fieldObj);

	if( Array.isArray(fieldObj.childs))
	{

		if( fieldObj.childs.length == 0 )
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		return false;
	}

	
}

var exapandSchema=expandDataType(sjson, ns) ;

console.log("exapandSchema");
console.log(JSON.stringify(exapandSchema));

validateUssField= function(field) {



}

alert=function(str) {

	console.log(str);
}


valWithSch= 	function (rec,recSch)
	{
		//alert( recSch.name +" : " +recSch.dataType);
		//alert(rec);
		/*[
		if ( recSch.dataType != "CONTAINER" || recSch.dataType != "SCHEMA"   )
		{
				//alert( recSch.name + "="+ eval('rec.'+recSch.name) );
				
				value= eval('rec.'+recSch.name);
				
				//alert(value );
				
				if (value           === undefined) {
					value='';
				}
				if (recSch.childs   === undefined) {
					recSch.childs=new Array();
				}
				if (recSch.htmlType === undefined) {
					recSch.htmlType='';
				}
				if (recSch.dataType === undefined) {
					recSch.dataType='';
				}
				if (recSch.groupId  === undefined) {
				recSch.groupId='';
				}
				
				
		
		
		  switch ( recSch.dataType )
		  {
		    case "DATE" : 
		  		re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
				if(value != '' && !value.match(re)) {
     			 alert("Invalid date format: " + value);
      			 return false;
      			 }
      			 break;
    		case "TIME" :
    			// regular expression to match required time format
    			re = /^\d{1,2}:\d{2}([ap]m)?$/;
				if(value != '' && !value.match(re)) {
     			 alert("Invalid time format: " + value);
     			 return false;
    			}
    			break;
		
			case "VARCHAR" :
				// regular expression to match required time format
    			re = /^[A-Za-z0-9_]{3,20}$/;
				if(value != '' && !value.match(re)) {
     			 alert("Invalid time format: " + value);
     			 return false;
     			 }
    		 
		}
		 
		}
		
			//alert(" type of " + typeof recSch.childs );
	
				for  ( var i=0; i <recSch.childs.length ; i++ )
				{ 
				
					var recList=eval( 'rec.' + recSch.name ) ;
					alert(recList.length);
					for  ( var j=0; j <recList.length ; j++ )
					{
						valWithSch(recList[j],recSch.childs[i]);
					}
				}
				*/
		//console.log("in valWithSch");
				
		for ( var r=0; r<rec.length; r++)
		//for ( var s =0; s <recSch.length; s++)
		{
			 //alert (recSch[s]);
			 for ( var s =0; s <recSch.length; s++)
			 //for ( var r=0; r<rec.length; r++)
			 {
			 
			 var varStr='rec['+ r + '].' + recSch[s].name;
			 var varStrVal= eval(varStr);
			 
			if ( recSch[s].dataType != "CONTAINER" || recSch[s].dataType != "PAGE" )
			{
			// alert(recSch[s].dataType);
			 
			 
			 value= varStrVal;
				
				//alert(value );
				
				if (value           === undefined) {
					value='';
				}
				if (recSch[s].childs   === undefined) {
					recSch[s].childs=new Array();
				}
				if (recSch[s].htmlType === undefined) {
					recSch[s].htmlType='';
				}
				if (recSch[s].dataType === undefined) {
					recSch[s].dataType='';
				}
				if (recSch[s].groupId  === undefined) {
				recSch[s].groupId='';
				}
				
				

			if(recSch[s].mndf == "Y") {

				if (  value == "" ) {
					alert(recSch[s].name + " is mandatory: " + value);
				return false;
				}
			}

		
		
		  switch ( recSch[s].dataType )
		  {
		    case "DATE" : 
		  		re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
				if(value != '' && !value.match(re)) {
     			 alert(recSch[s].name + "Invalid date format: " + value);
      			 return false;
      			 }
      			 break;
    		case "TIME" :
    			// regular expression to match required time format
    			re = /^\d{1,2}:\d{2}([ap]m)?$/;
				if(value != '' && !value.match(re)) {
     			 alert(recSch[s].name +  "Invalid time format: " + value);
     			 return false;
    			}
    			break;
		    case "NUMBER" :
    			if (recSch[s].max != "unlimited" )
				{
				re = RegExp("^[0-9.]{"+ recSch[s].min + "," + recSch[s].max + "}$");
					//if(value != '' && !value.match(re))
					if(value != '' && !re.test(value)) 
					{
						 alert( recSch[s].name + " Exceed  limit " + recSch[s].min + " to " + recSch[s].max );
						 return false;
					 }
    			}
    			else
    			{
					re =/^[A-Za-z0-9_]$/;
					if(value != '' && !value.match(re)) 
					{
						 alert( recSch[s].name + " Invalid time format: " + value);
						 return false;
					}
     			 
    			}
    			break;
			case "VARCHAR" :
				// regular expression to match required time format
				if (recSch[s].max != "unlimited" )
				{
					//re = /^[A-Za-z0-9_]{0,20}$/
					re = RegExp("^[A-Za-z0-9_]{"+ recSch[s].min + "," + recSch[s].max + "}$");
					if(value != '' && !value.match(re)) 
					{
						 alert(recSch[s].name +"Exceed  limit " + recSch[s].min + " to " + recSch[s].max +"[ " + value + "]" );
						 return false;
					 }
    			}
    			else
    			{
					re =/^[A-Za-z0-9_]$/;
					if(value != '' && !value.match(re)) 
					{
						 alert(recSch[s].name + "Invalid time format: " + value);
						 return false;
					}
     			 
    			} 
    			break;
    		case "LIST" :
    		case "OPTION" :
				// regular expression to match required time format
				 recSch[s].listVal	
				 if ( value != '' )
				 {
				 var inpStrArr= recSch[s].listVal.split('|');
				 	var chk=0;
					for(var i=0 ; i< inpStrArr.length;i+=2)
					{
						if( value == inpStrArr[i])
						{
						chk=1;
						}
					}
					if  ( chk!=1 )
					{
						alert( recSch[s].name + " Invalid time format: " + value);
						return false;
					}
				}
				
				 	 
			}
			 
			}
			
			  if (recSch[s].childs   === undefined) 
			  {
					recSch[s].childs=new Array();
			  }
			  valWithSch(varStrVal,recSch[s].childs);
			 
			 } 
			 
		}
		
	}

exports.valWithSch=valWithSch;
exports.validateUssField=validateUssField;
