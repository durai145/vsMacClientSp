define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/service/userDetails/:task', null,
    {
        isValidUser  : { method: 'POST', params: {"task" : "isValidUser"}} 
    });
	
}
];

});