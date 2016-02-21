var app=angular.module('myApp', [ ]);


app.controller('RequestController', function($scope, $http) {

//different types to populate the dropdown menu
$scope.types = ['Books', 'Movies', 'Games'];

//create an empty object to store form data
$scope.userInput = {
  title: '',
  type: ''
};

$scope.submitForm = function() {
  return $http({
    method: 'POST',
    url: '/api/searchworks',
    data: $scope.userInput, //forms user object
  })
  .then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response);
    var data = response.data;
    return data;
    console.log(data);

      if ... database && $scope.data.type === 'Movies'
        $scope.data.title = title;
        $scope.data.poster = image;
        $scope.data.director = person;

      alternate for !database && $scope.data.type === 'Movies'
        $scope.data.title = title;
        $scope.data.poster = image;
        $scope.data.director = person;

      if ... database && $scope.data.type === 'Books'
        $scope.data.title = title;
        $scope.data.poster = image;
        $scope.data.director = person;

      alternate for !database && $scope.data.type === 'Books'
        $scope.data.title = title;
        $scope.data.poster = image;
        $scope.data.director = person;

      if ... database && $scope.data.type === 'Games'
        $scope.data.title = title;
        $scope.data.poster = image;
        $scope.data.director = person;

      alternate for !database && $scope.data.type === 'Games'

        $scope.data.title = title;
        $scope.data.poster = image;
        $scope.data.director = person;













  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  return data;
  }
});


// app.directive('initialResults', function() {
//   return {
//     restrict: 'E',
//     templateUrl: 'initialResults.html'
//   }
// })