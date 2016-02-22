var app = angular.module('ILikeThis.individualTitle', []);

app.controller('IndivController', function($scope, Globals, Factory){
	$scope.work = Globals.returnIndiv()
	console.log('moved to indivController')
})