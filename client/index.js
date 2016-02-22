
var app = angular.module('ILikeThis.homepage', []);


app.controller('RequestController', function($scope, Factory, Globals) {

//different types to populate the dropdown menu
$scope.types = ['Books', 'Movies', 'Games'];
$scope.clicked = false;
//create an empty object to store form data
$scope.userInput = {
  title: '',
  type: ''
};

$scope.submitForm = function() {
  Factory.submitForm($scope.userInput)
    .then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
      if (!!response.data.database) {
        response.data = [response.data];
      };
    // .then(
    //   titleGrabber(result))
    //   }

      $scope.results = response.data;
      console.log($scope.results);
      // helperFunction();
      //run helper function that populates new divs with response data

    });
  };
 
 $scope.alreadyExists = function(title) {
  // var title = //gets the value of the clicked thing
  console.log('Inside alreadyExists ', title)
  Globals.storeTitle(title);
  //now show button to reroute to madlibs
  $scope.clicked = true;
 }


$scope.addToDb = function(apiResp) {
  // var title = //gets the value of the clicked thing
  console.log('Inside addTodb')

  Factory.addToDatabase(apiResp)
  .then(function(res){
    console.log('database response', res)
    //now show button to reroute to madlibs
    Globals.storeTitle(res.title)
    $scope.clicked = true;

  })

 }


});

// call Globals.storeTitle or something add pass confirmed 
// title in when user confirms work

