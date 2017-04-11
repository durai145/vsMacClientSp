define([],
function()
{

  return [ '$scope' , 'toaster','loginService','$state' ,'$dashboardState' ,'$window',function($scope,toaster,loginService,$state,$dashboardState,$window){

    $scope.login=function()
    {
      alert("login control");
    }

    $scope.uss_submit=function()
      {


          loginService.tokenSSO({     "grantType"     : "password" 
          /*loginService.authorizeSSO({     "grantType"     : "password" */
                      ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'username'    : $scope.email
                      ,'password'    : $scope.password
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
          // body...
          console.log($state);
          console.log(resp);
            




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
                  //  alert('Bofore' + states[i].name);
                    $state.remove(states[i].name);
                   // alert('Removed' +states[i].name);


                   // delete states[i];
                    //itemsToBeRemoved[removalIndex++] = i;
                }
            }
           /* for(var j=0;j<itemsToBeRemoved.length;j++){
               states.splice(itemsToBeRemoved[j],1);
             }
            */

            /*
              ACCESS_IND: "Y"
Name: "DURAIMURUGANGOVINDARAJ"
PAGE_GRP_KEY: "basicDet"
PAGE_GRP_TITLE: "BASIC DETAILS"
PRTL_PAGE_GRP_ID: 1
ROLE_NAME: "SEC_ADMIN"
USR_ID: 1
            */
            var states = $state.get();

          $dashboardState.addState('faq', null, 'content');

 /*
           email: "durai145@live.in"
firstName: "DURAIMURUGAN"
grpId: 1
grpName: "TEST PRODCUCT"
lastName: "GOVINDARAJ"
prodName: "HOMESPACE"
prodVersion: "1"
prtlName: "Product"
usrId: 1

[
accessInd: "Y"
name: "DURAIMURUGANGOVINDARAJ"
pageGroup: 1
pageGroupKey: "basicDet"
pageGroupTitle: "BASIC DETAILS"
roleName: "SEC_ADMIN"
usrId: 1
]
            */
          

            
            $window.sessionStorage.setItem("firstName"  ,resp.logindata.loginDetails[0].firstName);
            $window.sessionStorage.setItem("grpName"    ,resp.logindata.loginDetails[0].grpName);
            $window.sessionStorage.setItem("firstName"  ,resp.logindata.loginDetails[0].firstName);
            $window.sessionStorage.setItem("lastName"   ,resp.logindata.loginDetails[0].lastName);
            $window.sessionStorage.setItem("prodVersion",resp.logindata.loginDetails[0].prodVersion);
            $window.sessionStorage.setItem("prtlName"   ,resp.logindata.loginDetails[0].prtlName);
            $window.sessionStorage.setItem("prodName"   ,resp.logindata.loginDetails[0].prodName);
            $window.sessionStorage.setItem("usrId"      ,resp.logindata.loginDetails[0].usrId);
            $window.sessionStorage.setItem("grpId"      ,resp.logindata.loginDetails[0].grpId);
          


          $window.sessionStorage.setItem( "treeViewJson" ,JSON.stringify(resp.entitlement));
          $state.go('dashboard');


          console.log(resp);
          toaster.pop('success','this', JSON.stringify(resp));

          //alert('resp');
        });

        //alert("I am in uss_submit");
      };
      $scope.uss_auth=function()
      {

        $state.go('signup');

          /*            loginService.authorizeSSO({     "grantType"     : "password" */
          /*loginService.authorizeSSO({     "grantType"     : "password" */
           /*           ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'username'    : 'durai145@live.in'
                      ,'password'    : '1qaz2wsx'
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
          // body...
          console.log(resp);
          toaster.pop('success','this', JSON.stringify(resp));
          //alert('resp');
        }); */

        //alert("I am in uss_submit");
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