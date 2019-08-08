define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/service/loginDetails/:task', null,
    {
        doLogin  : { method: 'POST', params: {"task" : "doLogin"}} 
    });
	
}
];

});