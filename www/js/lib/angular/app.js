/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([

  './controllers/index', './services/index'
  /* ,'./directives/index'
     ,'./filters/index'
     
   */

], function (controllers, services) {
  'use strict';

  //console.log('controllers in app');
  //console.log(controllers);

  //console.log('ufi in app');
  //console.log(ufi);

  var webApp = angular.module('app', [
    'controllers', 'ngRoute', 'toaster', 'services', 'ui.router', 'ngAnimate'
  
  ]);




  webApp.config(['$routeProvider', '$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', 
 '$injector', function ($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, $injector) {
    // body...
    console.log('$stateProvider');
    console.log($stateProvider);
    console.log($urlRouterProvider);
    // console.log(ussService);


    $stateProvider.state('login', {
      url: '/www/',
      views: {

        'pageMainContext': {

          templateUrl: 'js/lib/views/loginView.html',
          controller: 'naviController'
          // templateUrl : 'view/loginView.html'
        }
      }
    });

    $stateProvider.state('dashboard', {
      url: '/dashboard/',
      views: {
        'pageMainContext': {

          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'
        },

        'pageSubContext@dashboard': {

          templateUrl: 'js/lib/views/dashboardView.html'

            ,
          controller: 'dashboardController'
        }


      }
    });




    $stateProvider.state('SchemaGenerator', {
      url: '/SchemaGenerator/',
      views: {
        'pageMainContext': {

          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'
        },

        'pageSubContext@SchemaGenerator': {

          templateUrl: 'js/lib/views/SchemaGenerator.html'

            ,
          controller: 'SchemaGeneratorController'
        }


      }
    });

    //basicDet/USSAdd

    $stateProvider.state('basicDetUSSAdd', {
      url: '/basicDetUSSAdd/',
      views: {

        'pageMainContext': {

          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'
        },

        'pageSubContext@basicDetUSSAdd': {

          controller: 'basicDetController',
          template: 'this is test'
        }
      },
      params: {
        $basicDet: {}
      }

    });



    $stateProvider.state('SchemaGeneratorView', {
      url: '/SchemaGeneratorView/',
      views: {

        'pageMainContext': {

          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'

        },

        'pageSubContext@SchemaGeneratorView': {

          templateUrl: 'js/lib/views/SchemaGeneratorView.html',
          controller: 'SchemaGeneratorController'
          //template : 'this is test'
          // templateUrl : 'view/loginView.html'
        }
      }
    });
    $stateProvider.state('SchemaGenerator', {
      url: '/SchemaGenerator/',
      views: {

        'pageMainContext': {

          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'

        },

        'pageSubContext@SchemaGenerator': {

          templateUrl: 'js/lib/views/SchemaGenerator.html',
          controller: 'SchemaGeneratorController'
          //template : 'this is test'
          // templateUrl : 'view/loginView.html'
        }

      }
    });
    $stateProvider.state('KeyBoard', {
      url: '/KeyBoard/',
      views: {

        'pageMainContext': {
          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'

        },

        'pageSubContext@KeyBoard': {

          templateUrl: 'js/lib/views/keyBoard.html',
          controller: 'keyBoardController'
          //template : 'this is test'
          // templateUrl : 'view/loginView.html'
        }
      }
    });


    $stateProvider.state('basicDetUSSSave', {
      url: '/basicDetUSSSave/',
      views: {

        'pageMainContext': {
          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'
        },

        'pageSubContext@basicDetUSSSave': {

        
          controller: 'basicDetController'
          ,template : 'this is test'
        }
      },
      params: {
        $basicDet: {}
      }
    });

    $stateProvider.state('basicDetUSSNew', {
      url: '/basicDetUSSNew/',
      views: {

        'pageMainContext': {
          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'
        },

        'pageSubContext@basicDetUSSNew': {
          controller: 'basicDetController'
          ,template : 'this is test'
          // templateUrl : 'view/loginView.html'
        }
      },
      params: {
        $basicDet: {}
      }
    });

    $stateProvider.state('basicDetUSSView', {
      url: '/basicDetUSSView/',
      views: {

        'pageMainContext': {
          templateUrl: 'js/lib/views/naviView.html',
          controller: 'naviController'
        },

        'pageSubContext@basicDetUSSView': {

          
          controller: 'basicDetController',
          template : 'this is test'
        }
      },
      params: {
        $basicDet: {}
      }
    });






    $stateProvider.state('signup', {
      url: '/signup/',
      views: {
        'pageMainContext': {

          templateUrl: 'js/lib/views/signupView.html',
          controller: 'signupController'
        },

        'pageSubContext@signup': {

           template : 'this is test',
          // templateUrl : 'js/lib/views/dashboardView.html',controller :  'dashboardController'
      
          controller: 'signupController'
        }


      }
    });

    $urlRouterProvider.otherwise(function ($injector, $location) {
      var $state = $injector.get('$state');

      $state.go('login', {
        title: "Page not found",
        message: 'Could not find a state associated with url "' + $location.$$url + '"'
      });
    });



    console.log('httpProvider');
    console.log($httpProvider);
    // $httpProvider.defaults.headers.post['x-access-token'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIZWFlcmllIEdTTCIsImF1ZCI6Ind3dy5teXJvb21leHBlbnNlLmNvbSIsImlhdCI6IjYwbXMiLCJleHAiOjE0NDg2ODYwNTR9.-JiMA_sU22ZVbBSxuxTnyQY6khghSjGy7hdmNk11Ysk";
    $httpProvider.interceptors.push(['$q', '$injector', 'toaster', '$window' //,'uss' 
      ,
      function ($q, $injector, toaster, $window //,uss
      ) {
        var sessionRecoverer = {
          responseError: function (response) {
            // Session has expired

            console.log(response);
            if (response.status == 302) {

              $window.sessionStorage.clear();
              //var SessionService = $injector.get('SessionService');
              var $http = $injector.get('$http');
              var deferred = $q.defer();
              toaster.pop('error', 'this', 'session is expired');

              //   uss.Test('Test');
              // Create a new session (recover the session)
              // We use login method that logs the user in using the current credentials and
              // returns a promise
              //SessionService.login().then(deferred.resolve, deferred.reject);

              // When the session recovered, make the same backend call again and chain the request

              $injector.get('$state').go('login');

              return deferred.promise.then(function () {
                return $http(response.config);
              });
            } else if (response.status == 304) {

              $window.sessionStorage.clear();
              //var SessionService = $injector.get('SessionService');
              var $http = $injector.get('$http');
              var deferred = $q.defer();
              toaster.pop('error', 'Error:', 'Invalid User Id / Password');

              //   uss.Test('Test');
              // Create a new session (recover the session)
              // We use login method that logs the user in using the current credentials and
              // returns a promise
              //SessionService.login().then(deferred.resolve, deferred.reject);

              // When the session recovered, make the same backend call again and chain the request

              $injector.get('$state').go('login');

              return deferred.promise.then(function () {
                return $http(response.config);
              });
            } else if (response.status == 404) {
              toaster.pop('error', '404', 'Request services is not avaliable for You');
              $injector.get('$state').go('login');
            }
            return $q.reject(response);
          },
          response: function (response) {
            var deferred = $q.defer();

            // console.log('response');
            //console.log(response);



            var respJSON = JSON.stringify(response);

            // alert("success["+ respJSON + "]" );

            //toaster.pop('success','200', 'Success response [' + response.headers('x-access-token') +"]");

            var accessToken = response.headers('x-access-token');

            // alert('accessToken:' + accessToken);
            if (angular.isDefined(accessToken)) {
              if (accessToken != null) {
                $window.sessionStorage.accessToken = accessToken;
              }
            }
            return response;

          },
          request: function (request) {

            console.log('request');
            console.log(request);

            //toaster.pop('success','Request', 'Send response session [' +$window.sessionStorage.accessToken +"]");


            request.headers['x-access-token'] = $window.sessionStorage.accessToken || '';

            return request;
          }
        };
        return sessionRecoverer;
      }
    ]);




  }]);

  webApp.provider('$dashboardState', function ($stateProvider) {
    this.$get = function ($state) {
      return {
        /**
         * @function app.dashboard.dashboardStateProvider.addState
         * @memberof app.dashboard
         * @param {string} title - the title used to build state, url & find template
         * @param {string} controllerAs - the controller to be used, if false, we don't add a controller (ie. 'UserController as user')
         * @param {string} templatePrefix - either 'content', 'presentation' or null
         * @author Alex Boisselle
         * @description adds states to the dashboards state provider dynamically
         * @returns {object} user - token and id of user
         */
        addState: function (title, controllerAs, templatePrefix) {

          /* $stateProvider.state('dashboard.' + title, {
                        url: '/' + title,
                        views: {
                            'dashboardModule@dashboard': {
                                templateUrl: PATHS.DASHBOARD + (templatePrefix ? templatePrefix + '/' : '/') + title + '/' + title + '.view.html',
                                controller: controllerAs ? controllerAs : null
                            }
                        }
                    });
*/

          // alert('dynamic State Add');
          $stateProvider.state('basicDetUSSNavi', {
            url: '/basicDetUSSNavi',
            views: {

              'pageMainContext': {
                templateUrl: 'js/lib/views/naviView.html'
              },

              'pageSubContext@basicDetUSSNavi': {
                  template : '<form name="myForm" > <label for="exampleInput">Pick a date in 2013:</label> <input type="date" id="exampleInput" name="input" ng-model="example.value"placeholder="yyyy-MM-dd" min="2013-01-01" max="2016-12-31" required /> <div role="alert"> <span class="error" ng-show="myForm.input.$error.required"> Required!</span> <span class="error" ng-show="myForm.input.$error.date"> Not a valid date!</span> </div> <tt>value = {{example.value | date: "yyyy-MM-dd"}}</tt><br/> <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/> <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/> <tt>myForm.$valid = {{myForm.$valid}}</tt><br/> <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/> </form>'
                
                ,controller: 'basicDetController' //template : 'this is test'
                // templateUrl : 'view/loginView.html'
              }
            }
          });



        }
      }
    }
  });

  webApp.run(['$rootScope', '$q', '$injector', '$window', function ($rootScope, $q, $injector, $window) {

    //$rootScope.$state = $state;
    $rootScope.goUrl = function (stateToGo) {

      //alert('I am in stateToGo' );
      //console.log(angular.toJson($state.get()));
      // console.log($injector.get('$state').get());

      if (stateToGo == 'registerUSSBack') {

        $injector.get('$state').go('login');
      } else if (stateToGo == 'logout') {

        $window.sessionStorage.clear();
        $injector.get('$state').go('login');
      } else {
        $injector.get('$state').go(stateToGo);
      }



    }
  }]);



  return webApp;
});
