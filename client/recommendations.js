angular.module('ILikeThis.recommendations', [])

.controller('RecController', function($scope, $location, Globals) {
  console.log("inside RecController")
  $scope.recs = Globals.returnRecs()

  $scope.seeMore = function(rec){
  	Globals.storeIndiv(rec)
  	
  	$location.path('/individual')
  }
})

