angular.module('madLibs', [])

.controller('RecController', function($scope) {
  $scope.data = {};
  $scope.userInput = {
    plot: '',
    character: '',
    setting: '',
    genre: ''
  };
});

$scope.saveData = function() {
  $scope.data.push($scope.userInput);
};

$scope.submitForm = function() {
  $http({
    method: 'POST',
    url: '/api/searchworks',
    data: $scope.userInput,
    headers: {
      'Content-Type': 'application/x-www.form-urlencoded'
    }
  })

  .success(function(data) {
    if (data.errors) {
      $scope.errorName = data.errors.name;
      $scope.errorUserName = data.errors.username;
      $scope.errorEmail = data.errors.email;
    } else {
      console.log("An error occured:", data.errors);
    }
  });
};
console.log($scope.userInput);
})









// .factory('Tags', function ($http) {
//   var getAll = function () {
//     return $http({
//       method: 'POST',
//       url: '/api/works'
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };
// });
