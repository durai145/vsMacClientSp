var sql = 'CREATE TABLE MMM001MB ( MKR_ID varchar2(10))';
var parse = require('node-sqlparser').parse;
var stringify = require('node-sqlparser').stringify;
var astObj = parse(sql);
console.log(astObj);
 
var sqlstr = stringify(astObj);
console.log(sqlstr);
