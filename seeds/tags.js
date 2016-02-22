
exports.seed = function(knex, Promise) {
  return Promise.join(
  //   // Deletes ALL existing entries -- this isn't working??
  //   knex('Tags').del(),
  //   knex('WorkTag').del(), 

    // Inserts seed entries
    knex('Tags').insert([{tag: 'Theme-Dark/macabre'}, {tag: 'Theme-Absurdist'}, {tag: 'Theme-Existential'},
    	{tag: 'Theme-Happy-Go-Lucky'}, {tag: 'Theme-Dystopian'}, {tag: 'Theme-Utopian'}, {tag: 'Theme-Beauty/Wonderment'},
    	{tag: 'Theme-Weird'}, {tag: 'Theme-Goofy'}, {tag: 'Writing Style-Stream of Consciousness'}, {tag: 'Writing Style-Vignette'},
    	{tag: 'Time Period-Present Day'}, {tag: 'Time Period-Victorian era'}, {tag: 'Time Period-Medieval times'}, {tag: 'Time Period-Prehistoric times'}, {tag: 'Genre-Action'},
    	{tag: 'Genre-Adventure'}, {tag: 'Genre-Comedy'}, {tag: 'Genre-Crime'}, {tag: 'Genre-Fantasy'}, {tag: 'Genre-Horror'}, {tag: 'Genre-Musical'}, 
    	{tag: 'Genre-Mystery'}, {tag: 'Genre-Political'}, {tag: 'Genre-Romance'}, {tag: 'Genre-Satire'}, {tag: 'Genre-Science Fiction'}, 
    	{tag: 'Genre-Thriller'}, {tag: 'Genre-Western'}, {tag: 'So-Bad-its-Good'}, {tag: "Theme-Philosophy"}, {tag: "Theme-Programming"}, {tag: "Time Period-Time Travel"},
      {tag: 'Family-Friendly'}, {tag: 'Character Diversity'}, {tag: 'Gay/Lesbian'}, {tag: 'Gorey'}, {tag: 'Campy'}, {tag: 'Art Style-Full Color'},
      {tag: 'Cult Classic'}, {tag: 'Art Style-Claymation'}, {tag: 'Art Style-Stop-Motion'}, {tag: 'Art Style-Pen and Ink'}, {tag: 'Art Style-CGI'},
      {tag: 'Sound Design'}, {tag: 'Score'}, {tag: 'Plot-Fast Paced'}, {tag: 'Plot-Slow Paced'}, {tag: 'Plot-Plot Driven'}, {tag: 'Plot- Character driven'},
      {tag:'World Building'}, {tag: 'Set Design-Elaborate'}, {tag: 'Set Design-Minimalist'}, {tag: 'Costuming-Period'}, {tag: 'Costuming-Modern'}, {tag: 'Costuming-Elaborate'}, 
      {tag: 'Costuming-Minimalist'}, {tag: 'Cinematography'}, {tag: 'Setting-Outer Space'}, {tag: 'Setting-New York'}, {tag: 'Setting-Texas'}, {tag: 'Setting-Fantasy world'}, 
      {tag: 'Setting-Space Station'}, {tag: 'Setting-Europe'}, {tag: 'Setting-Asia'}, {tag: 'Setting-North America'}, {tag: 'Setting-South America'}, {tag: 'Setting-Australia'}, {tag: 'Setting-Antarctica'},
      {tag: 'Characters-Quirky'}, {tag: 'Characters-Smart'}, {tag: 'Characters-Funny'}, {tag: 'Characters-Hopelessly Incompetant'}, {tag: 'Characters-Pothead'}, {tag: 'Characters-Tortured'},
      {tag: 'Characters-Romantic'}, {tag: 'Characters-Optimistic'}, {tag: 'Characters-Pessimistic'}])
  ).catch(function(err){
  	console.error('tags have already been added ', err.message)
  })
};
