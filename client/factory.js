var factories = angular.module('ILikeThis.MyFactories', [])


factories.factory('ILikeThis.factory', function ($http) {

  var submitForm = function() {
    return $http({
      method: 'POST',
      url: '/api/searchworks',
      data: $scope.userInput, //forms user object
    })
    .then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
    
      //run helper function that populates new divs with response data

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    return response.data;
    }
})
  });

  var getMatchingTags = function (tags) {
    return $http({
      method: 'POST',
      url: '/api/tags',
      data: tags
    })
    .then(function (resp) {
      return resp.data;
    });
  };
   return {
    submitForm: submitForm,
    getMatchingTags: getMatchingTags
  };
});
