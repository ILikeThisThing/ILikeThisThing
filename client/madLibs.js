angular.module('madLibs', [])

.controller('TagController', function($scope, $http) {
 $scope.items = ['Tragic','Epic','Dramatic','Plodding'];

  // $scope.data = [];
  // $scope.types = ['Tragic', 'Epic', 'Dramatic'];
  // $scope.userInput = {
  //   plot: '',
  //   character: '',
  //   setting: '',
  //   genre: ''
  // };
});

$scope.saveData = function() {
  $scope.data.push($scope.userInput);
};

$scope.submitForm = function() {
  $http({
    method: 'POST',
    url: '/api/searchworks',
    data: $scope.userInput
  });
};
