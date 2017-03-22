var mapper= require('./mapper').mapper;

console.log(mapper);

var  InvokeDB = function(pageId, pageType, SchemaJson, DataJson, calback) {
	console.log('pageId:' + pageId);
	console.log('mapper:' + mapper);
	console.log('mapper:' + mapper[pageId]);
	try
	{
			require('./map/' + mapper[pageId].map)[pageType](SchemaJson, DataJson,  calback);
	} catch(e) {
		var errMsg = 'Error mapper ' + mapper[pageId].map  + ' data from  ' + pageId + '\n Mapper:  '  + pageType.toLowerCase();
		console.error(errMsg);
		throw new Error(errMsg + ': ' + e.message);
	}
}

var pageId="UserDetails";
var pageType='checklogin';
var SchemaJson={Schema:'Dashboard'};
var DataJson={DataJson:'Dashboard'};

InvokeDB(pageId,pageType,SchemaJson,DataJson,function(rslt,respSchemaJson, respDataJson)
{

	console.log(rslt);
	console.log(respSchemaJson);
	console.log(respDataJson);

});
exports.InvokeDB=InvokeDB;
