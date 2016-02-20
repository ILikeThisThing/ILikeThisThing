angular.module('recommendations', [])

.controller('RecController', function($scope, $http) {
  $http.get('data/recs.json')
  .success(function(data) {
    $scope.recs = data;
  })
  .error(function(data) {
    console.error(error);
  });
});
