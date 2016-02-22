var factories = angular.module('ILikeThis.MyFactories', [])


factories.factory('Factory', function ($http) {

  var submitForm = function(work) {
    return $http({
      method: 'POST',
      url: '/api/searchworks',
      data: work, //forms user object
    })
  };

  var getMatchingTags = function (tags) {
    return $http({
      method: 'POST',
      url: '/api/tags',
      data: tags
    })
    .then(function (resp) {
      console.log('.then after POST to api/tags ', resp.data)
      return resp.data;
    });
  };

   return {
    submitForm: submitForm,
    getMatchingTags: getMatchingTags
  };
});
