define([],
function()
{

	return [ '$scope' , 'toaster','basicDetService','$state' ,'$window',function($scope,toaster,basicDetService,$state,$window){


console.log($window.sessionStorage);

 
$scope.basicDetUSSAdd=function()
{

  //alert('Start here');
  $scope.$basicDet=$scope.$basicDet||{};

        basicDetService.Add({     "grantType"     : "password" 
                      ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'basicDet'   : $scope.$basicDet
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
 toaster.pop('success','this', JSON.stringify(resp));

        $scope.$basicDet=resp.basicDet;
        $state.params=$scope.$basicDet;
         $state.go(resp.nextState,{
     $basicDet: $scope.$basicDet
            });
        });

}



$scope.$watch('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
   // 2 alert('on viewContentLoaded watch');


   ///console.log($state.params);
//alert('Content Type');



  $scope.$basicDet = $scope.$basicDet||{};
 

//console.log($state.params);


  $scope.$basicDet=$state.params.$basicDet|| {};


   // $scope.getUserDetail();
   // $scope.getCardDetail();
  });

      // alert("basicDetService");
	
		$scope.basicDetEditSave=function()
    	{


        if ($scope.fnValidate() == true )
        {

          alert("Validate success");
        }
        else
        {

          return false;
        //  alert("validate is fail");
        }
        $scope.$basicDet=$scope.$basicDet||{};

        basicDetService.save({     "grantType"     : "password" 
          /*loginService.authorizeSSO({     "grantType"     : "password" */
                      ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'basicDet'   : $scope.$basicDet
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
 toaster.pop('success','this', JSON.stringify(resp));

        $scope.$basicDet=resp.basicDet;
        $state.params=$scope.$basicDet;
         $state.go(resp.nextState,{
                        $basicDet: $scope.$basicDet
            });
        });

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