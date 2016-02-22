angular.module('ILikeThis.MadLibs', [])

.controller('TagController', function($scope, $http, ILikeThis) {
  $scope.themes = ['Theme-Dark/macabre', 'Theme-Absurdist', 'Theme-Existential'];
  $scope.characters = ['Characters-Quirky', 'Characters-Smart', 'Characters-Funny'];
  $scope.settings = ['Setting-Outer Space', 'Setting-New York', 'Setting-Texas'];
  $scope.genres = ['Genre-Action', 'Genre-Adventure', 'Genre-Comedy'];
  $scope.submitForm = function(){
    return ILikeThis.getMatchingTags($scope.userInput);
  };
});
