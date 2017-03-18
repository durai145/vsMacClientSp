var rjson=require("./gpasso.json");

//console.log(rjson);


function genSchem(key, r) {
var	keys = new Array();
var key= key.key1.toUpperCase();

var keyList=key.split(".");

var keyObj =  {
	"schemaName" : keyList[0]
	,"tableName" : keyList[1]
	,"columnName" : keyList[2]
	, "parentKeys" : []
	, "childKeys" : []
	, "currentKeys" : []
	};

console.log(keyObj);

	var modelName= keyObj.schemaName + "_" + keyObj.tableName + "_Model";
	console.log(modelName);
//var GPASSO_SSID003MT_Model   = require('./libs/gpassov3').GPASSO_SSID003MT_Model;
//		require(modelName);

	console.log("var %s = require('./gpassov3').%s " , modelName, modelName );
var	  keyFound = false;
	
	
	r.forEach(function(rObj) {

		if(rObj.schemaName  == keyObj.schemaName ) {
			if(rObj.tableName == keyObj.tableName) {
				rObj.fields.columns.forEach(function(columnObj) {
					if( columnObj.Name ==  keyObj.columnName ) {
						keyFound = true;
					}
				

				});
				rObj.fields.primaryKey.forEach(function(primaryColumns) {

					keyObj.currentKeys.push({
								"schemaName"  :  keyObj.schemaName
								,"tableName"  :  keyObj.tableName
								,"columnName" :  primaryColumns
								,"parentKeys" : []
								,"childKeys"  : []
						    });
	
				});
				
		
				

		}
		}

	}		
	);
	r.forEach(function(rObj) {

		//if(rObj.schemaName  == keyObj.schemaName ) {
			//if(rObj.tableName == keyObj.tableName) {
				rObj.fields.columns.forEach(function(columnObj) {

//					console.log(columnObj);
/*[


{ Name: 'USR_IDS',
  Type: 'Number',
  Reqd: false,
  Dflt: '',
  Unique: false,
  ForigenKeyName: 'RK_SSID003MT_USR_IDS',
  ParantSchema: 'GPASSO',
  ParantTable: 'SSID003MT',
  ParantColumn: '_ID',
  ReferanceKey: 'Y' }

]*/
				
					if ( columnObj.ReferanceKey == "Y" )  {

						keyObj.currentKeys.forEach(function(currentKeyObj) {
						
						if( columnObj.ParantSchema == currentKeyObj.schemaName 
						   && columnObj.ParantTable == currentKeyObj.tableName
						   && columnObj.ParantColumn == currentKeyObj.columnName ) {
							
						console.log( "referenced Table  = %s, %s ,%s.%s.%s", columnObj.Name, rObj.tableName, columnObj.ParantSchema, columnObj.ParantTable, currentKeyObj.columnName);
					currentKeyObj.parentKeys.push({
								"schemaName"  :  currentKeyObj.schemaName
								,"tableName"  :  rObj.tableName
								,"columnName" :  columnObj.Name
								,"parentKeys" : []
								,"childKeys"  : []
						    });


						}
						});
					}

				});

		//}
		//}

	});


	console.log("keyObj");
	console.log(JSON.stringify(keyObj));



	if( keyFound)  {

		console.log("keyFound = %s ", keyFound );

	}
		

}

var 	key = { "key1" : "gpasso.ssid003mt.username"  };
//	console.log(rjson);

genSchem(key,rjson) ;
