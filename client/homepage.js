var app=angular.module('myApp', [ ]);

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