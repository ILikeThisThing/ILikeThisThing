angular.module('madLibs', [])

.controller('RecController', function($scope, $http) {
  $http.get('api/works')
  .success(function(data) {
    $scope.works = data;
  })
  .error(function(data) {
    console.error(error);
  });
});
