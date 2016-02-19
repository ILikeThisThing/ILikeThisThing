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


//if we are in development or production mode
if(process.env.NODE_ENV !== 'test') {

//POST api/searchworks --> takes a user-submitted work to search for, looks to see if we already have it in the database
  routes.post('/api/searchworks', function(req, res){
    var workTitle = req.body.title;
    var workType = req.body.type;
    db.lookupWork(req.body)
      .then(function(result){//this should return promise, but doesnt yet.
        res.send(200, result);
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
                  res.send(200, gameData);
                  //even for pure giberish searches, something almost always comes back if the code
                  //ran correctly.
                })
                .catch(function(error){
                  console.error("Error with the games API handler: ", error);
                  res.send(500);
                });
              break;
            case "Movies":
              api.movieSearcher(workTitle)
                .then(function(movieData){
                  if (movieData.Response !=='False'){
                    res.send(200, movieData);
                  }
                  else{
                    console.error("IMDB couldn't find a movie by that name");
                    res.send(404);
                  }
                })
                .catch(function(error){
                  console.error("Error with the movies API handler: ", error);
                  res.send(500);
                })
              break;
            case "Books":
              //call the book handler
              api.bookSearcher(workTitle)
                .then(function(bookData){
                  res.send(200, bookData);
                })
                .catch(function(error){
                  console.error("Error with the Books API handler: ", error);
                  res.send(500);
                })
              break;
          }
        }
        else{
          //else 500 server error
          console.error('error in GET to api/works ', error)
          res.send(500)
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
        res.send(201)
      })
      .catch(function(err){
        console.error('error in POST to api/works ', err);
        res.send(500)
        //probably 500 server error or it didn't have everything it needed
      })
  })

  //GET api/tags --> looks for all works with passed in tag names --> results will include the looked for work
  //needs to have both the tags and the searched for title
  routes.get('/api/tags', function(req, res){
    db.findTags(req.body)
      .then(function(result){
        return result.filter(function(tag){
          if (req.body.tags.indexOf(tag) === -1){
            return tag;
          }
        })
      })
      .then(function(newTags){
        db.addTags(req.body, newTags)
      })

    db.findWorks(req.body)
      .then(function(result){
        res.send(200, results)  // => this is an array of objects
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
        db.addTags(req.body, newTags) //title that tags should be added to and array of the new tags 
          .then(function(result){
            res.send(201, result);
          })
          .catch(function(error){
            //some sort of error
            res.send(500);
            console.error('error in POST to api/tags inside addTags ', err)
          })
      })
      .catch(function(error){
        res.send(500)
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


// db.addWork({'title':'Bud, Not Buddy', 'type':'Books'});
