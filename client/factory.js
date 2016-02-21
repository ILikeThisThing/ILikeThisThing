angular.module('MyApp', [])


.factory('ILikeThis', function ($http) {
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
});
