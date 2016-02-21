
exports.seed = function(knex, Promise) {
  return Promise.join(
  //   // Deletes ALL existing entries -- this isn't working??
  //   knex('Tags').del(),
  //   knex('WorkTag').del(), 

    // Inserts seed entries
    knex('Tags').insert([{tag: 'Dark/macabre'}, {tag: 'Absurdist'}, {tag: 'Existential'},
    	{tag: 'Happy-Go-Lucky'}, {tag: 'Dystopian'}, {tag: 'Utopian'}, {tag: 'Beauty/Wonderment'},
    	{tag: 'Weird'}, {tag: 'Goofy'}, {tag: 'Stream of Consciousness'}, {tag: 'Vignette'},
    	{tag: 'Present Day'}, {tag: 'Victorian era'}, {tag: 'Medieval times'}, {tag: 'Prehistoric times'}, {tag: 'Action'},
    	{tag: 'Adventure'}, {tag: 'Comedy'}, {tag: 'Crime'}, {tag: 'Fantasy'}, {tag: 'Horror'}, {tag: 'Musical'}, 
    	{tag: 'Mystery'}, {tag: 'Political'}, {tag: 'Romance'}, {tag: 'Satire'}, {tag: 'Science Fiction'}, 
    	{tag: 'Thriller'}, {tag: 'Western'}, {tag: 'So-Bad-its-Good'}, {tag: "Philosophy"}])
  ).catch(function(err){
  	console.error('tags have already been added ', err.message)
  })
};
