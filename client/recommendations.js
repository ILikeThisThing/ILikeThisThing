angular.module('recommendations', [])

.controller('RecController', function ($scope, Recs) {
  $scope.rec = {};
  $scope.addRec = function () {
    $scope.loading = true;
    Links.addRec($scope.rec)
      .then(function () {
        $scope.loading = false;
        $location.path('/recommendations.html');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});
