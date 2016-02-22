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
			templateUrl : '/madlibs/madLibs.html',
			controller : 'TagController'
		})
		//for recommendations from tags
		.when('/recommendations', {
			templateUrl: '/recommendations/recommendations.html',
			controller: 'RecController'
		})
		//for individual recommendation
		.when('/individual', {
			templateUrl: '/individualTitle/individualTitle.html',
			controller: 'IndivController'
		})
		//for some reason this makes it enter into an infinite loop
		// .when('/index', {
		// 	templateUrl: '/index.hmtl',
		// 	controller: 'RequestController'
		// })
}])
