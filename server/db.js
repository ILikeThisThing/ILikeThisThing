var config      = require('../knexfile.js');  
var env         =  process.env.NODE_ENV || 'development';  
var knex        = require('knex')(config[env]);

module.exports = knex;

//if there are any new migrations it will run this
//if changes need to be made to the database a new migration must be made (knex migrate:make <db name>)
//it will then apply those changes ON TOP of the last migration 
knex.migrate.latest()
.then(function(){
	//it will run the contents of the seeds file EVERY TIME node restarts
	//-- the tags table is all unique to account for this
	knex.seed.run(); 
});



