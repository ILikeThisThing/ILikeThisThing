
var app = angular.module('ILikeThis.homepage', []);


app.controller('RequestController', function($scope, Factory, Globals) {

//different types to populate the dropdown menu
$scope.types = ['Books', 'Movies', 'Games'];

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
      if (typeof response.data === "object") {
        response.data = [response.data];
    // .then(
    //   titleGrabber(result))
    //   }

      $scope.results = response.data;
      // helperFunction();
      //run helper function that populates new divs with response data

    } function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    };
    });

 // $scope.titleGrabber = function(result) {
 //    if (result.type === 'Movies') {
 //      var title = result.title;

 //    } else if (result.type === 'Books') {
 //      var title = result.title;

 //    } else if (result.type === 'Games') {
 //      var title = result.name;
 //    }
 //    return title;
 // }
 };
});



// var dataGrabber = function() {
//   if (typeof response.data === "object") {
//     $scope.dbDataGrabber = function() {
//     // check to see if data pulled from database


//     $scope.apiDataGrabber = function() {
//       if (results[0].type === 'Movies') {
//         $scope.title = results.title;
//         $scope.image = results.poster;
//         $scope.person = results.director;
//         $scope.date = resuts.Released
//       } else if (results[0].type === 'Books') {
//           $scope.title = results.title;
//           $scope.image = results.largeImage;
//           $scope.person = results.authors[0]; //need to deal with instances where multiple authors
//           $scope.date = results.publishedDate
//       } } else if (results[0].type === 'Games') {
//           $scope.title = results.name;
//           $scope.image = results.largeImage;
//           $scope.date = results.original_release_date
//        } 
//   }
// }



// call Globals.storeTitle or something add pass confirmed 
// title in when user confirms work



















// var helperFunction = function() {
//   if ($scope.data[0].type === 'Movies') {
//       for (var i = 0; i < $scope.data.length; i ++) {
//         if ($scope.data[i].database) {
//           var title = $scope.data[i].title;
//           var image = $scope.data[i].poster;
//           var person = $scope.data[i].director;
//           var date = $scope.data[i].Released
        

//         } else //if (!$scope.data[i].database) {
//           var title = $scope.data[i].title;
//           var image = $scope.data[i].poster;
//           var person = $scope.data[i].director;
//           // var date = //$scope.data[i].Released
        
//       }


//     } else if($scope.data[0].type === 'Books') {
//       for (var i = 0; i < $scope.data.length; i ++) {
//         if ($scope.data[i].database) {
//           var title = $scope.data[i].title;
//           var image = $scope.data[i].largeImage;
//           var person = $scope.data[i].authors[0]; //need to deal with instances where multiple authors
//           var date = $scope.data[i].publishedDate
        

//         } else //if (!$scope.data[i].database) {
//             var title = $scope.data[i].title;
//             var image = $scope.data[i].largeImage;
//             var person = $scope.data[i].authors[0]; //need to deal with instances where multiple authors
//             var date = $scope.data[i].publishedDate
        
//           }


//     } else if ($scope.data[0].type === 'Games') {
//       for (var i = 0; i < $scope.data.length; i ++) {
//         if ($scope.data[i].database) {
//           var title = $scope.data[i].name;
//           var image = $scope.data[i].largeImage;
//           var date = $scope.data[i].original_release_date
        
//         } else //if (!$scope.data[i].database) {
//         var title = $scope.data[i].name;
//         var image = $scope.data[i].image;
//         var date = $scope.data[i].original_release_date
//       }
//     }
//   };

//make each image or title selectable and on click send them to that results page...








