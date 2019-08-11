// import { JsonDB } from 'node-json-db';
// import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

var jsonDb=require('node-json-db');
//console.log(jsonDb);
var config= require('node-json-db/dist/lib/JsonDBConfig')

var db = new jsonDb.JsonDB((new config.Config("myDataBase", true, false, '/')));
var loginDetailsRequestSchema = require("./loginDetailsRequestSchema");
var loginDetailsResponseSchema = require("./loginDetailsResponseSchema");
db.push("/loginDetailsRequestSchema", loginDetailsRequestSchema);
db.push("/loginDetailsResponseSchema", loginDetailsResponseSchema);
console.log(db.getData("/loginDetailsRequestSchema[-1]/name/"));