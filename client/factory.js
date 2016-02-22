var factories = angular.module('ILikeThis.MyFactories', [])


factories.factory('Factory', function ($http) {

  var submitForm = function(work) {
    return $http({
      method: 'POST',
      url: '/api/searchworks',
      data: work, //forms user object
    })
  };

  var addToDatabase = function(work) {
    return $http({
      method: 'POST',
      url: '/api/works',
      data: work, //forms user object
    })
    .then(function (resp){
      console.log("added to db")
      return resp.data
    })
  };


  var getMatchingTags = function (tags) {
    console.log("Inside getMatchingTags" , tags)
    return $http({
      method: 'POST',
      url: '/api/tags',
      data: tags
    })
    .then(function (resp) {
      console.log('response from api/tags ', resp.data)
      return resp.data;
    });
  };

   return {
    submitForm: submitForm,
    getMatchingTags: getMatchingTags,
    addToDatabase: addToDatabase
  };
});

factories.factory('Globals', function(){
  var title;
  var recs;
  var indiv;

  //takes the title and stores it
  var storeTitle = function(newTitle){
    title = newTitle;
    console.log('title has been stored ', title)
  }

  //serves up the title to controllers that need it
  var returnTitle = function(){
    return title;
  }
  //takes the response from api/tags and stores it
  var storeRecs = function(newRecs){
    console.log('storing recs ', newRecs)
    recs = newRecs;
  }
  //serves the recomendations to the controllers that need it
  var returnRecs = function(){
    console.log('returning recs', recs)
    return recs;
  }

  //stores the clicked on id
  var storeIndiv = function(clicked){
    console.log('storing indiv ', clicked)
    indiv = clicked;
  }
  //returns the clicked on rec
  var returnIndiv = function(){
    console.log('returning indiv ', indiv)
    return indiv;
  }

  return {
    storeTitle: storeTitle,
    returnTitle: returnTitle,
    storeRecs: storeRecs,
    returnRecs: returnRecs,
    storeIndiv: storeIndiv,
    returnIndiv: returnIndiv
  }
})
