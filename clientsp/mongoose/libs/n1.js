//console.log(process.argv);

var fs = require('fs');

var init =0;
var prev_table_name = "";
function camleCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}
function primaryKeyParse(arr)
{
		var rtStr="{"
			params=arr.split("(");
		if (params.length >0 ) {
/*
			console.error(" params :" + params);

			
			paramArr = params[2];
			//split(paramArr, list, ")")
			list=paramArr.split(")");
			listArr= list[1];
			//len=split(listArr, value, ",")
			value=listArr.split(",")
			for (i=1; i <= value.length; i++) {
				col=  value[i]
				rslt=gsub(/[``]/,"",col)
				if( i == 1 ) {
					rtStr= rtStr +  col +   ": 1";
				} else {
					rtStr= rtStr   + ","  +  col +   ": 1";
				}
			}
*/
			rtStr= rtStr + "}";
		}
		return rtStr;
}


if( process.argv.length != 4) {
	console.error("Error : Arguments are not enough : run as " +process.argv[0]+" " + process.argv[1] + " <input.sql> <out.js>" );
	process.exit(1);
}

var inputSqlFile= process.argv[2];
var outputJsFile= process.argv[3];
var 	str=0
var 	start=0
var	startCount=0;
var col1;
var col2;
var col3;
var col4;
var col5;
var col6;
var col7;
console.log(" SQL File : " + inputSqlFile );
console.log(" JS  File : " + outputJsFile );

fs.readFile(inputSqlFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //console.log(data);
	var sqlObj=parseSQL(data);
	console.log(sqlObj);
});

parseSQL=function(data) {

	//remove comments	

	var sqlObj=new Array()	;
	var pureData=removeCommet(data);

	var stmts=pureData.split(";");	

	stmts.forEach(function(stmt) {
		stmt=stmt.replace("\n", " ");
		stmt=stmt.replace("\t", " ");
		stmt=stmt.trim();
		stmtArr=stmt.split(" ");

//	console.log("stmtArr<" + stmtArr+ ">");	
//	console.log("stmtArr[0]<" + stmtArr[0] + ">== CREATE" );	

		if(stmtArr[0] == "CREATE" ) {
			console.error("calling parseCreate");	
		sqlObj.push(parseCreate(stmt));
		}




	});	

}

removeCommet=function(stmt) {
//	console.error("stmt:" + stmt);
	var rtStr= "";
	var stmtArr=stmt.split("");
	var commentOn=false;
	var prvChr="";
	stmtArr.forEach(function(chr) {
//		console.error("\nchr = [" + chr + "] commentOn= [" + commentOn +"]");
		if (chr == "-" && prvChr == "-" ) {
			commentOn = true;
		}

		if ( commentOn == false) {
			rtStr+= prvChr;
		}
		if (chr == "\n" ) {
			commentOn = false;
		}
		prvChr=chr;
	});
	if ( commentOn == false) {
		rtStr+= prvChr;
	}
	return rtStr;
}

parseCreate = function(createStmt) {

//	console.error("createStmt:" + createStmt);
	var rtObj={};
	createStmtArr= createStmt.split(" ");
	
	if( createStmtArr[0] != "CREATE" ) {
		console.error("Invalid call to createStmt");
		process.exit(1);
	}

	if ( createStmtArr[1] == "TABLE" ) {
		rtObj =  { "table":	parseCreateTable(createStmt) };
		console.error(" parseCreate : " + rtObj);
	} 

	return rtObj;
	// check table or other 
	//if table creation query then call pareseTableCreate	
}

parseCreateTable= function (createTableStmt) {
	
				var tableName= "";
				var schemaName= "";
	var createTableStmtArr = createTableStmt.split(" ");
		var tableObj={};
	if ( createTableStmtArr.length > 3 ) {
		
			if(( createTableStmtArr[0] == "CREATE" ) && (createTableStmtArr[1] == "TABLE") )  {
				if( createTableStmtArr[2] == "IF" ) {
					tableName= createTableStmtArr[5];	
				} else {
					tableName= createTableStmtArr[3];	
				}

				tableName =tableName.replace(/`/g,"");
				tableNameArr = tableName.split(".");
				if ( tableNameArr.length == 2 )	 {
					schemaName = tableNameArr[0] ;
					tableName  = tableNameArr[1] ;
				} 
			//	console.error("tableName :" + tableName );
			//	console.error("schemaName:" + schemaName );
				var tableFieldStmt=createTableStmt.substr(createTableStmt.indexOf('('));		

				
			tableObj={"tableName" :  tableName 
				,"schemaName":  schemaName
				,"columns" : parseTableField(tableFieldStmt)
				}
				
			}	

			console.log({"tableObj" :  tableObj});
			return tableObj;
	} else {
		console.error("Inavlid create Statement");
		process.exit(1);
	}
}
parseTableField=function (tableFieldStmt) {

//	console.error("tableFieldStmt:" + tableFieldStmt);
//	console.error("tableFieldStmt.length:" + tableFieldStmt.length);
	tableFieldStmt=tableFieldStmt.replace(/\n/g," ");	
	tableFieldStmt=tableFieldStmt.substr(2,tableFieldStmt.length-3);
//	console.error("tableFieldStmt:[" + tableFieldStmt +"]");

	tableFieldStmtArr= parseFieldSplit(tableFieldStmt, ","); //tableFieldStmt.split(",");
		var columnList = new Array();
		//var primaryKeyList = new Array();
//		console.error("tableFieldStmtArr : " + tableFieldStmtArr  + "");
	
	tableFieldStmtArr.forEach(function(columLine) {
		var columnName="";
		var columnType="";
		var columnReqd="";
		var columnDflt="";
		var columnIndex="";
		var columnUnique="";
		var columnForigenKeyName="";
		var columnParantSchema="";
		var columnParantTable="";
		var columnParantColumn="";
//		console.error("columLine: " + columLine  + "");
		columLine=columLine.trim();	
		columLine=removeSpace(columLine);

	//var columLineArr= columLine.split(" ");
	var columLineArr= parseFieldSplit( columLine , " " );
			var col=0;

		if ((columLineArr[col] == "CONSTRAINT") ||  (columLineArr[col] == "PRIMARY" )) {

			if ( columLineArr[col++] == "CONSTRAINT" ) {

				
				//CONSTRAINT `FK_GRP001MB_GROUP_ID` FOREIGN KEY (`GRP_ID`) REFERENCES `GPASSO`.`GRP001MB` (`GRP_ID`) 
					columnForigenKeyName= columLineArr[col++];

						
			//console.error("check CONSTRAINT ["+ columLineArr+"] columLineArr.length = %d , col = %d ", columLineArr.length , col +2);
					if ((columLineArr.length>col+5) &&( columLineArr[col] == "FOREIGN" ) && ( columLineArr[col+1] == "KEY" ) &&  (columLineArr[col+3] == "REFERENCES" )) {
							columnName= columLineArr[col+2];

							columnForigenKeyName=columnForigenKeyName.replace(/`/g,"");
							columnParantTable = columLineArr[col+4];
							columnParantTable = columnParantTable.replace(/`/g,"");
							columnParantTableArr= columnParantTable.split(".");
							if ( columnParantTableArr.length > 1 ) {
								columnParantTable=columnParantTableArr[1];
								columnParantSchema=columnParantTableArr[0];
							}
							columnParantColumn = columLineArr[col+5];
							columnName=columnName.replace(/`/g,"");
							columnName=columnName.replace(/\(/g,"");
							columnName=columnName.replace(/\)/g,"");
							console.error("	columnName : " + columnName);
							columnParantColumn=columnParantColumn.replace(/`/g,"");
							columnParantColumn=columnParantColumn.replace(/\(/g,"");
							columnParantColumn=columnParantColumn.replace(/\)/g,"");
							console.error("	columnForigenKeyName : " + columnForigenKeyName);
							
							for ( var i=0; i<columnList.length; i++ ) {

								if(columnList[i].Name == columnName ) {
									
									columnList[i].ForigenKeyName = columnForigenKeyName;
									columnList[i].ParantTable = columnParantTable;
									columnList[i].ParantSchema = columnParantSchema;
									columnList[i].ParantColumn = columnParantColumn;
									
								}
							
							}
					}

			} else {

			//PRIMARY KEY (`GRP_ID`, `USR_ID`, `FOR_USR_ID`)
				console.error(columLineArr);
				if(columLineArr[col++] == "KEY") {
				primaryKey=columLineArr[col];
				
				primaryKey=primaryKey.replace(/`/g,"");
				primaryKey=primaryKey.replace(/\(/g,"");
				primaryKey=primaryKey.replace(/\)/g,"");
				
				
				primaryKeyArr= primaryKey.split(",");
			//	primaryKeyList.push(primaryKeyArr);
			columnList.push({ "primaryKey" : primaryKeyArr});

				  for(var p=0; p<primaryKeyArr.length; p++) {
					for ( var i=0; i<columnList.length; i++ ) {

						if(columnList[i].Name == primaryKeyArr[p] ) {
							
							columnList[i].Reqd = true;
						}	
					}
				}
				} else {
					console.error("Invalid Key " );
					process.exit(1);
				}
				
			}

			
		
		} else {
		//	console.log(" columLineArr [" + columLineArr + "]");

			columnName= columLineArr[col++];
			columnName=columnName.replace(/`/g,"");
			columnType= columLineArr[col++];

			columnTypeArr= columnType.split("(");

			if (columnTypeArr.length > 1 ) {
				columnType=columnTypeArr[0];
			}

						

			if( columnType == "VARCHAR") {
			columnType= "String"
		} else if ( columnType == "INT") {
			columnType= "Number"
		} else if ( columnType == "DATETIME") {
			columnType= "Date"
		} else if ( columnType == "DATE") {
			columnType= "Date"
		} else if ( columnType == "DOUBLE") {
			columnType= "Number"
		}  else {
			columnType= "String"
		}
			
			//console.error("columLineArr" + columLine);
			//console.error("check Not Null  columLineArr.length = %d , col = %d ", columLineArr.length , col +2);

			if ( (columLineArr.length > col+2 ) && ( columLineArr[col] == "NOT"  || columLineArr[col+1] == "NULL" )) {
				col+=2;	
				columnReqd = true;
			} else if ( columLineArr[col] == "NULL") {
				col+=1;	
				columnReqd = false;
			}
		//	console.error("check Default columLineArr.length = %d , col = %d ", columLineArr.length , col +2);
	//		console.error(" columLineArr["+col+"] " + columLineArr[col] );

			if ((columLineArr.length >= col + 2 ) && columLineArr[col] == "DEFAULT" )  {
				col++;	
	//		console.error("check NULL  columLineArr["+col+"] " + columLineArr[col] );
				if(columLineArr[col]  == "NULL") {
					columnDflt="";
				} else {
					columnDflt=columLineArr[col].replace(/'/g,"");;
				
				}
			//	console.error("columnDflt:"+columnDflt);
			
			}

			columnList.push(
			{ "Name"   : columnName
			, "Type"   : columnType
			, "Reqd"   : columnReqd
			, "Dflt"   : columnDflt
			, "Unique" : columnUnique
			, "ForigenKeyName" : columnForigenKeyName
			, "ParantSchema" : columnParantSchema
			, "ParantTable" : columnParantTable
			, "ParantColumn" : columnParantColumn
			});
			
		}
	});
//	console.log(columnList);
	return columnList;	

}

parseFieldSplit = function (tableFieldStmt, chr)  {

	tableFieldStmt= tableFieldStmt + chr;
	var tableFieldStmt= tableFieldStmt.split("");
	var openBrace= false;
	var rtArr=new Array();

	var tmpStr="";
	for( var i=0; i< tableFieldStmt.length; i++ ) {

		if ((openBrace == false ) && ( tableFieldStmt[i] == "(" )) {
			openBrace= true;
		} else if (( openBrace == true) && (tableFieldStmt[i] == ")" )) {
			openBrace= false;
		}

//		console.error("openBrace:" + openBrace +", tableFieldStmt["+i+"]= <"+tableFieldStmt[i]+">  tmpStr= <"+tmpStr+">" );

		if (( openBrace == false ) && (tableFieldStmt[i]== chr )) {
				rtArr.push(tmpStr);		
				tmpStr="";
		}
		else
		{
				tmpStr+= tableFieldStmt[i];
		}
	}
	
	
		
	return rtArr;
}

removeSpace=function (str) {
	var rtStr="";
	var prevChr="";
	var chr="";
//	console.error("in str :[" + str +"]");
	strArr=str.split(" ");		
	strArr.forEach(function(chr) { 
		if( chr != "" ) {
			rtStr+=" " + chr;
		}
	});

	return rtStr.trim();

}
