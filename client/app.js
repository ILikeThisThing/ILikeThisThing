angular.module('ILikeThis', [ 
	'ILikeThis.MyFactories',
	'ILikeThis.homepage',
	'ILikeThis.MadLibs',
	'ngRoute'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
	//for madlibs tag selection
		.when('/tags', {
			templateUrl : '/madLibs.html',
			controller : 'TagController'
		});
		// .when('/recommendations', {
		// 	templateUrl: 'recommendations.html',
		// 	controller: 'RecController'
		// })
}])

.controller('TitleSaver', function($scope) {
	var title = $scope.userInput.title;
})
