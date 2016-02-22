angular.module('ILikeThis.recommendations', [])

.controller('RecController', function($scope, Globals) {
  console.log("inside RecController")
  $scope.recs = Globals.returnRecs()
})

