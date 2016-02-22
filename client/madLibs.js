angular.module('ILikeThis.MadLibs', [])

.controller('TagController', function($scope, $http, $location, Factory, Globals) {

  $scope.themes = ['Theme-Dark/macabre', 'Theme-Absurdist', 'Theme-Existential'];
  $scope.characters = ['Characters-Quirky', 'Characters-Smart', 'Characters-Funny'];
  $scope.settings = ['Setting-Outer Space', 'Setting-New York', 'Setting-Texas'];
  $scope.genres = ['Genre-Action', 'Genre-Adventure', 'Genre-Comedy'];
  
  var tagsArr = [];
  //transforms tags to send to api
  var reqMaker = function(inputs){
  	for (var prop in inputs){
  		tagsArr.push(inputs[prop])
  	}
  	console.log('Inside reqMaker')
  	var newTitle = Globals.returnTitle();
  	return {title: newTitle, tags: tagsArr}
  }

  $scope.submitForm = function(){
  	var request = reqMaker($scope.userInput)
  	console.log('request being sent in submitForm ', request)
    return Factory.getMatchingTags(request)
    .then(function(resp){
    	console.log('response from submitForm ', resp)
    	return Globals.storeRecs(resp)
    })
    .then(function(){
    	$location.path('/recommendations');
    });
  };
});
// $window.location.href('/#/recommendations');
//    	$location.path('/#/recommendations');
