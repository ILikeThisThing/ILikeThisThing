myApp.factory('submitForm' = function($http) {
  
var submitForm = function() {
  return $http({
    method: 'POST',
    url: '/api/searchworks',
    data: $scope.userInput, //forms user object
  })
  .then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response);
  
    //run helper function that populates new divs with response data

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  return result.data;
  }
});

// function myFunction($scope, myService) {
//     var myDataPromise = myService.getData();
//     myDataPromise.then(function(result) {  

//        // this is only run after getData() resolves
//        $scope.data = result;
//        console.log("data.name"+$scope.data.name);
//     });
// }