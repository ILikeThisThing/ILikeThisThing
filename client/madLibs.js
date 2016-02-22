angular.module('ILikeThis.MadLibs', [])

.controller('TagController', function($scope, $http, $location, Factory, Globals) {

  $scope.themes = ['Theme-Dark/macabre', 'Theme-Absurdist', 'Theme-Existential', 'Theme-Happy-Go-Lucky', 'Theme-Dystopian', 'Theme-Utopian', 'Theme-Beauty/Wonderment',
  'Theme-Weird', 'Theme-Goofy', 'Theme-Philosophy', 'Theme-Programming'];
  $scope.characters = ['Characters-Quirky', 'Characters-Smart', 'Characters-Funny', 'Characters-Hopelessly Incompetant', 'Characters-Pothead', 'Characters-Tortured',
  'Characters-Romantic', 'Characters-Optimistic', 'Characters-Pessimistic', 'Characters-Evil', 'Character Diversity'];
  $scope.settings = ['Setting-Outer Space', 'Setting-New York', 'Setting-Texas', 'Setting-Fantasy world', 'Setting-Space Station', 'Setting-Europe', 'Setting-Asia',
  'Setting-North America', 'Setting-South America', 'Setting-Australia', 'Setting-Antarctica'];
  $scope.genres = ['Genre-Action', 'Genre-Adventure', 'Genre-Comedy', 'Genre-Crime', 'Genre-Fantasy', 'Genre-Horror', 'Genre-Musical', 
  'Genre-Mystery', 'Genre-Political', 'Genre-Romance', 'Genre-Satire', 'Genre-Science Fiction', 'Genre-Thriller', 'Genre-Western'];
  $scope.writingStyle = ['Writing Style-Stream of Consciousness', 'Writing Style-Vignette'];
  $scope.time = ['Time Period-Present Day', 'Time Period-1800s', 'Time Period-Medieval times', 'Time Period-Prehistoric times', 'Time Period-Time Travel', 'Time Period-Antiquity',
  'Time Period-World War I', 'Time Period-World War II', 'Time Period-The Great Depression', 'Time Period-Civil War', 'Time Period-Mid-20th-Century'];
  $scope.quirky = ['Cult Classic', 'Gorey', 'Campy', "So-Bad-it's-Good"];
  $scope.other = ['Family-Friendly', 'Gay/Lesbian', 'Cinematography'];
  $scope.artStyle = ['Art Style-Full Color', 'Art Style-Claymation', 'Art Style-Stop-Motion', 'Art Style-Pen and Ink', 'Art Style-CGI', 'Art Style-Expressionist', 'Art Style-Impressionist'
];
  $scope.plot = ['Plot-Fast Paced', 'Plot-Slow Paced', 'Plot-Plot Driven', 'Plot- Character driven'];
  $scope.audio = ['Sound Design', 'Score', 'Sound Effects', 'Soundtrack'];
  $scope.sets = ['Set Design-Elaborate', 'Set Design-Minimalist','Set Design-Expressionist', 'Set Design-Impressionist', 'Set Design-Stylized'];
  $scope.costumes = ['Costuming-Period', 'Costuming-Modern', 'Costuming-Elaborate', 'Costuming-Minimalist', 'Costumes-Stylized']






  var tagsArr = [];
  //transforms tags to send to api
  var reqMaker = function(inputs){
  	for (var prop in inputs){
  		tagsArr.push(inputs[prop])
  	}
  	console.log('Inside reqMaker')
  	var newTitle = Globals.returnTitle();
  	return {title: newTitle, tags: tagsArr}
  }

  $scope.submitForm = function(){
  	var request = reqMaker($scope.userInput)
  	console.log('request being sent in submitForm ', request)
    return Factory.getMatchingTags(request)
    .then(function(resp){
    	console.log('response from submitForm ', resp)
    	return Globals.storeRecs(resp)
    })
    .then(function(){
    	$location.path('/recommendations');
    });
  };
});
// $window.location.href('/#/recommendations');
//    	$location.path('/#/recommendations');

