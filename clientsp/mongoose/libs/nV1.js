
var fs = require('fs');
var init =0;
var prev_table_name = "";

function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function camleCase(str) {


	if (str == "_ID" ) { 
	rtStr="_id";
	} else { 
	var strArr=str.split("_");
	rtStr="";
	strArr.forEach(function(word) 
	{
		rtStr+= word.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
		      return m.toUpperCase();
		   });
	});

	rtStr=  lowerFirstLetter(rtStr);
	}

	return rtStr;	
}


if (process.argv.length != 3) {
	console.error("node %s <input.sql>"+ process.argv[1]);
	process.exit(1);
}

var inputSqlFile= process.argv[2];
var sqlObj=new Array();
fs.readFile(inputSqlFile, 'utf8', function (err,data) {
		if (err) {
		return console.log(err);
		}

		console.log("/* Generated from %s by n.js  Don't change */" , inputSqlFile);
		console.log("/* All copyrights © 2016 Heaerie Global solutions (P) Ltd.India  */");
		sqlObj=parseSQL(data);
		sqlObj.forEach(function (tableObj) {
				var modelName= tableObj.schemaName + "_" +tableObj.tableName;

				console.log(" var %s  = new Schema({" , modelName);
				var conj=" ";
				tableObj.fields.columns.forEach(function(column) {

					
						column.Name=camleCase(column.Name);

						if ( column.Name != "_id" )	 {
								if (	column.ForigenKeyName == "") {
										if (column.Dflt ==  'CURRENT_TIMESTAMP') {
												console.log("%s %s: { type: %s, unique: %s, required: %s, default: %s  } ", conj, column.Name, column.Type, column.Unique, column.Reqd,'Date.now');
										} else {
												console.log("%s %s: { type: %s, unique: %s, required: %s, default: '%s'  } ", conj, column.Name, column.Type, column.Unique, column.Reqd, column.Dflt);
										}
								} else {
										console.log("%s %s:  { type: Schema.ObjectId, ref: '%s_%s' }   ", conj, column.Name,   column.ParantSchema,column.ParantTable);
								}
								conj=",";
						}
				});
				console.log("});\n");

				conj= " ";
				if (tableObj.fields.primaryKey.length > 0) {
						console.log(" %s.index({ ",modelName);
						tableObj.fields.primaryKey.forEach(function(key) {
								console.log(" %s  %s : 1 ", conj, camleCase(key));
								conj=",";
						});
						console.log("});");

				}
				console.log(" var %s_Model = mongoose.model('%s', %s); ",modelName, modelName, modelName);
				console.log(" module.exports.%s_Model = %s_Model; \n ", modelName, modelName); 
		});
});

parseSQL = function(data) {
		var sqlObj=new Array()	;
		var pureData=removeCommet(data);
		var stmts=pureData.split(";");	

		stmts.forEach(function(stmt) {
				stmt=stmt.replace("\n", " ");
				stmt=stmt.replace("\t", " ");
				stmt=stmt.trim();
				stmtArr=stmt.split(" ");

				if (stmtArr[0] == "CREATE") {
						createObj=parseCreate(stmt);
						if (createObj != null) {
								sqlObj.push(createObj);
						}
						}
		});	
		return sqlObj;
}

removeCommet = function(stmt) {
		var rtStr= "";
		var stmtArr=stmt.split("");
		var commentOn=false;
		var prvChr="";
		stmtArr.forEach(function(chr) {
		if (chr == "-" && prvChr == "-") {
		commentOn = true;
		}

		if (commentOn == false) {
		rtStr+= prvChr;
		}
		if (chr == "\n") {
		commentOn = false;
		}
		prvChr=chr;
		});
		if (commentOn == false) {
		rtStr+= prvChr;
		}
		return rtStr;
}

parseCreate = function(createStmt) {

		var rtObj=null;
		createStmtArr= createStmt.split(" ");

		if (createStmtArr[0] != "CREATE") {
				process.exit(1);
		}

		if (createStmtArr[1] == "TABLE") {
				rtObj =	parseCreateTable(createStmt);
		} 

		return rtObj;
}

parseCreateTable= function (createTableStmt) {

		var tableName= "";
		var schemaName= "";
		var createTableStmtArr = createTableStmt.split(" ");
		var tableObj=null;
		if (createTableStmtArr.length > 3) {

				if ((createTableStmtArr[0] == "CREATE") && (createTableStmtArr[1] == "TABLE"))  {
						if (createTableStmtArr[2] == "IF") {
								tableName= createTableStmtArr[5];	
						} else {
								tableName= createTableStmtArr[3];	
						}

						tableName =tableName.replace(/`/g,"");
						tableNameArr = tableName.split(".");
						if (tableNameArr.length == 2) {
								schemaName = tableNameArr[0] ;
								tableName  = tableNameArr[1] ;
						} 
						var tableFieldStmt=createTableStmt.substr(createTableStmt.indexOf('('));		
						tableObj = {"tableName" :  tableName 
								,"schemaName" :  schemaName
								,"fields"    :  parseTableField(tableFieldStmt)
								};

				}	

				return tableObj;
		} else {
				process.exit(1);
		}
}
parseTableField = function (tableFieldStmt) {

		tableFieldStmt=tableFieldStmt.replace(/\n/g," ");	
		tableFieldStmt= getFirstArg(tableFieldStmt);
		tableFieldStmt=tableFieldStmt.substr(2,tableFieldStmt.length);

		tableFieldStmtArr= parseFieldSplit(tableFieldStmt, ","); 
		var tableObj = {};
		var primaryKeyArr= [];
		var columnList = new Array();

		tableFieldStmtArr.forEach(function(columLine) {
				var columnName="";
				var columnType="";
				var columnReqd= false;
				var columnDflt="";
				var columnIndex= false;
				var columnUnique= false;
				var columnForigenKeyName="";
				var columnParantSchema="";
				var columnParantTable="";
				var columnParantColumn="";
				columLine=columLine.trim();	
				columLine=removeSpace(columLine);

				var columLineArr= parseFieldSplit(columLine , " ");
				var col=0;

				if ((columLineArr[col] == "CONSTRAINT") ||  (columLineArr[col] == "PRIMARY")) {

						if (columLineArr[col++] == "CONSTRAINT") {

								columnForigenKeyName= columLineArr[col++];

								if ((columLineArr.length>col+5) &&(columLineArr[col] == "FOREIGN") && (columLineArr[col+1] == "KEY") &&  (columLineArr[col+3] == "REFERENCES")) {
								columnName= columLineArr[col+2];
								columnForigenKeyName=columnForigenKeyName.replace(/`/g,"");
								columnParantTable = columLineArr[col+4];
								columnParantTable = columnParantTable.replace(/`/g,"");
								columnParantTableArr= columnParantTable.split(".");
								if (columnParantTableArr.length > 1) {
										columnParantTable=columnParantTableArr[1];
										columnParantSchema=columnParantTableArr[0];
								}
								columnParantColumn = columLineArr[col+5];
								columnName=columnName.replace(/`/g,"");
								columnName=columnName.replace(/\(/g,"");
								columnName=columnName.replace(/\)/g,"");
								columnParantColumn=columnParantColumn.replace(/`/g,"");
								columnParantColumn=columnParantColumn.replace(/\(/g,"");
								columnParantColumn=columnParantColumn.replace(/\)/g,"");

								for (var i=0; i<columnList.length; i++) {
										if (columnList[i].Name == columnName) {
												columnList[i].ForigenKeyName = columnForigenKeyName;
												columnList[i].ParantTable = columnParantTable;
												columnList[i].ParantSchema = columnParantSchema;
												columnList[i].ParantColumn = columnParantColumn;

										}

								}
								} else {
									console.error("Invalid formate:");
									console.error(columLineArr);
									process.exit(1);
								}

						} else {
								if (columLineArr[col++] == "KEY") {
										primaryKey=columLineArr[col];
										primaryKey=primaryKey.replace(/`/g,"");
										primaryKey=primaryKey.replace(/\(/g,"");
										primaryKey=primaryKey.replace(/\)/g,"");
										primaryKeyArr= primaryKey.split(",");
										for (var p=0; p<primaryKeyArr.length; p++) {
												for (var i=0; i<columnList.length; i++) {
														if (columnList[i].Name == primaryKeyArr[p]) {
																columnList[i].Reqd = true;
														}	
												}
										}
								} else {
									console.error("Invalid formate:");
									console.error(columLineArr);
									process.exit(1);
								}

						}
				} else {
						columnName= columLineArr[col++];
						columnName=columnName.replace(/`/g,"");
						columnType= columLineArr[col++];
						columnTypeArr= columnType.split("(");
						if (columnTypeArr.length > 1) {
								columnType=columnTypeArr[0];
						}

						if (columnType == "VARCHAR") {
								columnType= "String"
						} else if (columnType == "INT") {
								columnType= "Number"
						} else if (columnType == "DATETIME") {
								columnType= "Date"
						} else if (columnType == "DATE") {
								columnType= "Date"
						} else if (columnType == "DOUBLE") {
								columnType= "Number"
						}  else {
								columnType= "String"
						}

						if ( columnName == "_ID" ) {
							 columnType="Schema.ObjectId";
						}
	

						if ((columLineArr.length > col+2) && (columLineArr[col] == "NOT"  || columLineArr[col+1] == "NULL")) {
								col+=2;	
								columnReqd = true;
						} else if (columLineArr[col] == "NULL") {
								col+=1;	
								columnReqd = false;
						}

						if ((columLineArr.length >= col + 2) && columLineArr[col] == "DEFAULT")  {
								col++;	
								if (columLineArr[col]  == "NULL") {
										columnDflt="";
								} else {
										columnDflt=columLineArr[col].replace(/'/g,"");;
								}
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

		tableObj= {
		"columns" : columnList
		,"primaryKey" :  primaryKeyArr
		};
		return tableObj;	

}

parseFieldSplit = function (tableFieldStmt, chr)  {
		tableFieldStmt= tableFieldStmt + chr;
		var tableFieldStmt= tableFieldStmt.split("");
		var openBrace= false;
		var rtArr=new Array();

		var tmpStr="";
		for (var i=0; i< tableFieldStmt.length; i++) {

				if ((openBrace == false) && (tableFieldStmt[i] == "(")) {
						openBrace= true;
				} else if ((openBrace == true) && (tableFieldStmt[i] == ")")) {
						openBrace= false;
				}

				if ((openBrace == false) && (tableFieldStmt[i]== chr)) {
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

removeSpace = function (str) {
		var rtStr="";
		var prevChr="";
		var chr="";
		strArr=str.split(" ");		
		strArr.forEach(function(chr) { 
		if (chr != "") {
				rtStr+=" " + chr;
		}
		});

		return rtStr.trim();

}

getFirstArg = function(str) { 
		var strArr=str.split('');	
		var rtStr="";	
		var openBrace= 0;
		var start= false;
		for (var i=0; i< strArr.length; i++) {	
				chr=strArr[i];

				if (chr == "(")  {
						openBrace+=1;
				} else if (chr == ")")  {
						openBrace-=1;
				} 
				if (openBrace !=0 ) {
						rtStr+= chr;
				}
				if ((i != 0)&& (openBrace == 0)) {
						break;
				}

		};

return rtStr;
}
