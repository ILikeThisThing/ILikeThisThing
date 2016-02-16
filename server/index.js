var express = require('express');
var Path = require('path');
var routes = express.Router();
require('./db');
var db = ('./dbRequests.js');
//
//route to your index.html
//
var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

//
// Example endpoint (also tested in test/server/index_test.js)
//
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'angular'])
});

//if we are in development or production mode
if(process.env.NODE_ENV !== 'test') {

//GET api/works --> looks to see if we have the given work already in the database
  routes.get('/api/works', function(req, res){
    db.lookupWork(req.body)
      .then(function(result){
        //puts result into response
      })
      .catch(function(error){
        //if error.message = 'Not found in database' --> make call to api --> confirm with user --> POST to api/works
        //else 500 server error
        console.error('error in GET to api/works ', err)
      })
  })

//POST api/works --> gets called if the work doesn't exist in database already AFTER api lookup has been done
  routes.post('/api/works', function(req, res){
    //look in request body
    //does a knex insert to the db of the given work
    db.addWork(req.body)
      .then(function(result){

      })
      .catch(function(err){
        console.error('error in POST to api/works ', err);
        //probably 500 server error or it didn't have everything it needed
      })
  })

  //GET api/tags --> looks for all works with passed in tag names --> results will include the looked for work
  routes.get('/api/tags', function(req, res){
    db.findWorks(req.body)
      .then(function(result){

      })
      .catch(function(err){
        console.error('error in GET to api/tags ', err);
      })
    
  })

  //POST api/tags --> if tags need to be added to a given work
  routes.post('/api/tags', function(req, res){
    //first look to see what tags should be added
    db.findTags(req.body)
      .then(function(newTags){
        //then run function that adds the new tags
        db.addTags(req.body, newTags) //title that tags should be added to and ONLY the new tags 
          .then(function(result){
            //return 201 
          })
          .catch(function(error){
            //some sort of error
            console.error('error in POST to api/tags inside addTags ', err)
          })
      })
      .catch(function(error){
        console.error('error in POST to api/tags inside findTags ', err)
      })

  })


  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() );

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port", port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}