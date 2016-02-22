angular.module('ILikeThis', [ 
	'ILikeThis.MyFactories',
	'ILikeThis.homepage',
	'ILikeThis.MadLibs',
	'ILikeThis.recommendations',
	'ILikeThis.individualTitle',
	'ngRoute'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
	//for madlibs tag selection
		.when('/tags', {
			templateUrl : '/madLibs.html',
			controller : 'TagController'
		})
		//for recommendations
		.when('/recommendations', {
			templateUrl: '/recommendations.html',
			controller: 'RecController'
		})
		//for individual recommendation
		.when('/individual', {
			templateUrl: '/individualTitle.html',
			controller: 'IndivController'
		})
}])
