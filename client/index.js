var app=angular.module('myApp', [ ]);


app.controller('RequestController', function($scope, $http) {
// create object out of user input -
// containing two key value pairs - for title
// and type - this object will then be passed
// into the UserRequest factory function

// $scope.title = 'The Room';

//different types to populate the dropdown menu
$scope.types = ['Books', 'Movies', 'Videogames'];

//create an empty object to store form data
$scope.userInput = {
  title: '',
  type: ''
};

// $scope.saveData = function() {
//   console.log($scope.userInput);
// };

$scope.submitForm = function() {
  return $http({
    method: 'POST',
    url: '/api/searchworks',
    data: $scope.userInput, //forms user object
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response);
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  }
});
    

// var signin = function (user) {
//     return $http({
//       method: 'POST',
//       url: '/api/users/signin',
//       data: user
//     })
//     .then(function (resp) {
//       return resp.data.token;
//     });
//   };





// }]);

// });

// .factory('UserRequest', function ($http) {
//   var getMatches = function () {
//     return $http({
//       method: 'POST',
//       url: '/api/searchworks'
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };













//http interceptor to work with :


    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
//     $httpProvider.interceptors.push('AlreadyIncludedCheck');
// })
// .factory('AlreadyIncludedCheck', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  
  // send it into lookupWork
//   var checkDB = {
//     request: function (object) {
//       var gotIt = $window.localStorage.getItem('com.shortly');
//       if (gotIt) {
//         object.headers['x-access-token'] = gotIt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return checkDB;
// })





// following controller code taken from Angular documentation on $http service
// leaving here to fiddle with soon
// app.controller('SiteController', function(){
//  $http({
//   method: 'GET',
//   url: '/someUrl'
// }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  // }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
//   });
// })