var app=angular.module('myApp', [ ]);

// 
.factory('UserRequest', function ($http) {
  var getMatches = function () {
    return $http({
      method: 'GET',
      url: '/server/dbrequests'
    })
    .then(function (resp) {
      return resp.data;
    });
  };


//http interceptor to work with :


    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AlreadyIncludedCheck');
})
.factory('AlreadyIncludedCheck', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})





// following controller code taken from Angular documentation on $http service
// leaving here to fiddle with soon
app.controller('SiteController', function(){
	$http({
  method: 'GET',
  url: '/someUrl'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
})