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

factories.factory('Globals', function(){
  var title;
  var recs;

  //takes the title and stores it
  var storeTitle = function(newTitle){
    title = newTitle;
  }

  //serves up the title to controllers that need it
  var returnTitle = function(){
    return title;
  }
  //next var takes the response from api/tags and stores it
  var storeRecs = function(newRecs){
    recs = newRecs;
  }
  //then another function serves the recomendations to the controllers that need it
  var returnRecs = function(){
    return recs;
  }
})
