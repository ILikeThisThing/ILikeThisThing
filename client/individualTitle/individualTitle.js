var app = angular.module('ILikeThis.individualTitle', []);

app.controller('IndivController', function($scope, $location, Globals, Factory){
	$scope.work = Globals.returnIndiv()
	console.log('moved to indivController')

})