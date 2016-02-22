angular.module('ILikeThis', [ 
	'ILikeThis.MyFactories',
	'ILikeThis.homepage',
	'ILikeThis.MadLibs'
])

.controller('TitleSaver', function($scope) {
	var title = $scope.userInput.title;
})