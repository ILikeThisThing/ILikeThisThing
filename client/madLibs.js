angular.module('madLibs', [])

.controller('TagController', function($scope, $http) {
  $scope.themes = ['Theme-Dark/macabre', 'Theme-Absurdist', 'Theme-Existential'];
  $scope.characters = ['Characters-Quirky', 'Characters-Smart', 'Characters-Funny'];
  $scope.settings = ['Setting-Outer Space', 'Setting-New York', 'Setting-Texas'];
  $scope.genres = ['Genre-Action', 'Genre-Adventure', 'Genre-Comedy'];
});

$scope.submitForm = function() {
  $http({
      method: 'POST',
      url: '/api/tags',
      data: $scope.userInput
    })
    .then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
};
