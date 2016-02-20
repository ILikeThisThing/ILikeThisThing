angular.module('madLibs', [])

.controller('RecController', function($scope, $http) {
  $http.get('api/works')
    .success(function(data) {
      $scope.works = data;
    })
    .error(function(data) {
      console.error(error);
    });
})

.factory('Tags', function ($http) {
  var getAll = function () {
    return $http({
      method: 'POST',
      url: '/api/works'
    })
    .then(function (resp) {
      return resp.data;
    });
  };
});
