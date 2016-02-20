angular.module('madLibs', [])

.controller('MadLibsController', function ($scope, Tags) {
  $scope.data = {};
  $scope.getTags = function () {
    Links.getAll()
      .then(function (tags) {
        $scope.data.tags = tags;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  $scope.getTags();
});
