define([], function () {
    return ['$resource', function ($resource) {
        return $resource('/service/:module/:task', null,{
                isValidUser: { method: 'POST', params: { "module": "userDetails", "task": "isValidUser" } }
            });

    }
    ];

});