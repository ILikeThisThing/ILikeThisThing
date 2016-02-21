var express = require('express');
var Path = require('path');
var routes = express.Router();
require('./db');
var db = require('./dbRequests.js');
var api = require('./apiHandlers.js');
//
//route to your index.html
//
var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));


//POST api/searchworks --> takes a user-submitted work to search for, looks to see if we already have it in the database
  routes.post('/api/searchworks', function(req, res){
    console.log(req.body)
    var workTitle = req.body.title;
    var workType = req.body.type;
    db.lookupWork(req.body)
      .then(function(result){
        res.status(200).send(result);
        //puts result into response
      })
      //if we don't have this work, make a call to the api:
      //*** EVERYTHING HERE to END OF .CATCH STILL NEEDS TESTING! ***
      .catch(function(error){
        if (error.message === 'No such work found'){
          switch (workType){
            case "Games":
              api.gameSearcher(workTitle)
                .then(function(gameData){
                  res.status(200).send(gameData);
                  //even for pure giberish searches, something almost always comes back if the code
                  //ran correctly.
                })
                .catch(function(error){
                  console.error("Error with the games API handler: ", error);
                  res.status(500);
                });
              break;
            case "Movies":
              api.movieSearcher(workTitle)
                .then(function(movieData){
                  if (movieData.Response !== 'False'){
                    res.status(200).send(movieData);
                  }
                  else{
                    console.error("IMDB couldn't find a movie by that name");
                    res.status(404);
                  }
                })
                .catch(function(error){
                  console.error("Error with the movies API handler: ", error);
                  res.status(500);
                })
              break;
            case "Books":
              //call the book handler
              api.bookSearcher(workTitle)
                .then(function(bookData){
                    res.status(200).send(bookData);
                })
                .catch(function(error){
                  console.error("Error with the Books API handler: ", error);
                  res.status(500);
                })
              break;
          }
        }
        else{
          //else 500 server error
          console.error('error in POST to api/searchworks ', error)
          res.status(500).send(error.message)
        }
      })
  })


//rest of flow: 
    //1) server sends response
    //2) client confirms with user.
    //3) user supplies tags
    //4) client POSTs to api/works

//POST api/works --> gets called if the work doesn't exist in database already AFTER api lookup has been done
  routes.post('/api/works', function(req, res){
    //does a knex insert to the db of the given work
    db.addWork(req.body)
      .then(function(result){
        console.log(result)
        res.status(201).send(result);
      })
      .catch(function(err){
        console.error('error in POST to api/works ', err);
        res.sendStatus(500)
        //probably 500 server error or it didn't have everything it needed
      })
  })

  //POST api/tags --> looks for all works with passed in tag names --> results will include the looked for work
  routes.post('/api/tags', function(req, res){
    //first look to see what tags should be added
    db.findTags(req.body)
      .catch(function(err){
        console.log('findTags itself is broken ', err)
      })
      .then(function(newTags){
        console.log('newTags to add', newTags);
        if (newTags.length > 0){
          return db.addTags(req.body, newTags)
        }
      })
      .then(function(added){
        console.log('before findWorks ', added)
        return db.findWorks(req.body)
      })
      .then(function(result){
        console.log('results from findWorks ', result)
        res.status(200).send(result)  // => this is an array of objects
      })
      .catch(function(err){
        console.error('error after forth return to api/tags ', err);
        if (err.message === 'No other matching works found')
        res.status(204).send()
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
if(process.env.NODE_ENV !== 'test') {
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


// db.addWork({'title':'Bud, Not Buddy', 'type':'Books'});
