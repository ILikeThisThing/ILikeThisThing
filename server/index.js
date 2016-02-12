var express = require('express');
var Path = require('path');
var routes = express.Router();
require('./db');
var knex = require('knex')
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

if(process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/api/works', function(req, res){
    //look into request body and see what contents are
    //response should have an array of objects inside of res.body.results
  })

  routes.post('/api/works', function(req, res){
    //look in request body
    //first check if that work already exists
    //does a knex add to the db of the given work
  })

  routes.get('/api/tags', function(req, res){
    //return res.body.results of all works that have the given tags
    var search = req.body //whatever this path ends up being to the tags themselves
    knex('tagsjoin').where({  //a join table lookup???
      tag: 
    })
  })

  routes.post('/api/tags', function(req, res){
    //check if tags already exist for given work
    //if not add to the db
  })


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