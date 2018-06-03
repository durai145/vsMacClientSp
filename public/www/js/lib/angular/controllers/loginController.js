define([],
  function () {

    return ['$scope', 'toaster', 'loginService', '$state', '$dashboardState', '$window', function ($scope, toaster, loginService, $state, $dashboardState, $window) {

      $scope.login = function () {
        alert("login control");
      }
      $scope.uss_submit = function () {
        loginService.isValidUser({
          "grantType": "password"
          , 'clientId': 'CLIENTSP'
          , 'scope': 'GPA'
          , 'username': $scope.email
          , 'password': $scope.password
          , 'redirectURI': 'http://localhost:5000/'
          , "isValidUserRequest": {
              "isValidUserRequest": {
                "userDetails": {
                  "emailId": "H1450001"
                },
                "portalDetails": {
                  "portalKey": "MEMBER_PORTAL"
                }
              }
          }

        }, function (resp) {
        
          var states = $state.get();
          var itemsToBeRemoved = [];
          var removalIndex = 0;
          for (var i = 0; i < states.length; i++) {
            if (states[i].name != 'shell.error404' &&
              states[i].name != 'shell.error500' &&
              states[i].name != 'shell' &&
              states[i].name != 'dashboard' &&
              states[i].name != 'basicDetUSSView' &&
              states[i].name != 'basicDetUSSAdd' &&
              states[i].name != 'basicDetUSSNavi' &&
              states[i].name != 'login' &&
              states[i].name != 'basicDetUSSSave' &&
              states[i].name != 'SchemaGeneratorView' &&
              states[i].name != 'SchemaGenerator' &&
              states[i].name != 'signup' &&
              states[i].name != 'KeyBoard' &&
              states[i].name != '') {
              var tmplUrl = states[i].templateUrl;
              if (tmplUrl) {
                this.templateCache.remove(tmplUrl);
              }
              $state.remove(states[i].name);
            }
          }

          var states = $state.get();
          $dashboardState.addState('faq', null, 'content');
          //{"isValidUserResponse":{"userDetails":{"firstName":"Gangammal","lastName":"Govindaraj","userRole":"INTERNAL"}}}


          $window.sessionStorage.setItem("firstName", resp.isValidUserResponse.userDetails.firstName);
          $window.sessionStorage.setItem("lastName", resp.isValidUserResponse.userDetails.lastName);
          $window.sessionStorage.setItem("treeViewJson", JSON.stringify(resp.entitlement));
          $state.go('dashboard');


          console.log(resp);
          toaster.pop('success', 'this', JSON.stringify(resp));

          //alert('resp');
        });

        //alert("I am in uss_submit");
      };
      $scope.uss_auth = function () {

        $state.go('signup');
      };
    }];

  });

/*[
 toasterService.pop('success', "title", "text");
      var url = "/authorize"; 
      var config =  { 
          headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIZWFlcmllIEdTTCIsImF1ZCI6Ind3dy5teXJvb21leHBlbnNlLmNvbSIsImlhdCI6IjYwbXMifQ.G37Yj8ljUjbOf-kSyc4j3-YAlbseb1KET9CMBgbJfaE"
           ,'Authorization': 'Basic dGVzdDp0ZXN0'
            ,      'Content-Type': 'application/x-www-form-urlencoded'
            ,'Access-Control-Allow-Origin': false
            
        }
      };
      var dataJson = 
      {
        "email" : "durai145@live.in"
        ,"password" : "1qaz2wsx"
        ,"grantType": "password"
            ,"clientId" : "CLIENTSP"
            ,"scope" : "GSA"
            ,"redirectURI" :"http://localhost:5000"
      };
    /*
    $.post(url , dataJson , function (resp,status,xhr){
        alert("resp" + status);
    },dataType);
  $http.post(url,dataJson,config).then(function (response) 
    { 
     // alert("resp");
      console.log(response);
      alert(JSON.stringify(response));
    },function(data){
      if(data.status == 302)
      {
        alert("Invalid request");
      }
     });
    };
]*/