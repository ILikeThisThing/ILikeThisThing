angular.module('ILikeThis.recommendations', [])

.controller('RecController', function($scope, Globals) {
  $scope.recs = Globals.returnRecs()
})

