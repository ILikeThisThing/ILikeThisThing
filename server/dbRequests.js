var db = require('./db');
var config      = require('../knexfile.js');  
var env         =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]); 


exports.lookupWork = function(req){ //all these functions need to return promises (to allow calling .then in index.js), but
  //don't yet. Currently results in errors. (JW)
	var title = req.title //or whatever that path ends up being
	var type = req.type //same as above

	    knex.select('*').from(type).where('title', title) //maybe change this to a LIKE to account for case errors or something?
	        .then(function(result){
	          return result[0];
	        })
	        .catch(function(err){
	          //if err.message.match() something indicating it wasn't found? or just always make query to api
	          //make call to appropriate api and return that in response
	          //also should make POST req to api/works to add it into the database
            throw new Error('No such work found')
	        })
	    //response should have an array of the searched for object in it.
};

//called after an apirequest
exports.addWork = function(work, apiRes){

  return knex.insert({'title': apiRes.title, 'type': work.type}).into('Works')
        .then(function(result){
          if (work.type === 'Books'){
            return knex.insert({'id': result[0].id, 
                                'title': apiRes.title, 
                                'author': apiRes.author, 
                                'image': apiRes.largeImage, 
                                'data': JSON.stringify(apiRes)})
                .into('Books')
                .then(function(result){
                  return result[0];
                })
          }
          else if (work.type === 'Movies'){
            return knex.insert({'id': result[0].id, 
                                'title': apiRes.title, 
                                'director': apiRes.author, 
                                'image': apiRes.image, 
                                'data': JSON.stringify(apiRes)})
                .into('Movies')
                .then(function(result){
                  return result[0];
                })
          }
          else if (work.type === 'Games'){
            return knex.insert({'id': result[0].id, 
                                'title': apiRes.title, 
                                'studio': apiRes.studio, 
                                'image': apiRes.image, 
                                'data': JSON.stringify(apiRes)})
                        .into('Movies')
                        .then(function(result){
                          return result[0];
                        })
            }
        })
};


exports.findWorks = function(req){
	var tagsArr = req.tags // => must be array
  //join table of the things we want

  var tagIds = knex.select('id')
                   .from('Tags')
                   .whereIn('tag', tagsArr)
                   .map(function(rows){
                      return rows.id
                   })
                   .return(tag_ids);

  return knex('WorkTag')
          .select(['WorkTag.count', 'Books.title', 'Books.author', 'Books.image', 'Books.data', 
                    'Movies.title', 'Movies.director', 'Movies.image', 'Movies.data',
                    'Games.title', 'Games.studio', 'Games.image', 'Games.data'])
          .join('Books', 'Books.id', 'WorkTag.work_id')
          .join('Movies', 'Movies.id', 'WorkTag.work_id')
          .join('Games', 'Games.id', 'WorkTag.work_id')
          .whereIn('tag_id', tagIds)
          .return(results)
};

//checks to see what tags a given work already has
exports.findTags = function(req){

  //first find the works id
  return knex.select('id')
            .from('Works')
            .where('title', title)
            .then(function(result){
              //then update the counts for each of the tags
              var workId = result[0].id;
              return knex('WorkTag')
                          .where('work_id', workId)
                          .increment('count', 1)
                          .then(function(){
                            return knex.select('tag_id')
                                     .from('WorkTag')
                                     .where('work_id', workId)
                                     .map(function(row){
                                      return row.tag_id;
                                     })
                                     .then(function(tags){
                                      knex.select('tag').from('Tags').whereIn('tag', tags);
                                     })
                                     .map(function(row){
                                      return row.tag; //=> should be returning a flat array of tagnames to filter against users passed in tags
                                     })
                                    .then(function(tagNames){
                                     return tagNames;
                                    })
                          })
              
      })      
};


exports.addTags = function(req){
	var title = req.title; // => should be a string of a single work
  var tagNames = req.tags; // => must be an array

  //finds id for the given title
  return knex.select('id').from('Works').where('title', title)
        .then(function(row){
          return row[0].id
        })
        .then(function(workId){
          //add to Tags -- then add to WorkTag
          tagNames.forEach(function(tagName){
            knex.insert({'tag': tagName})
                .into('Tags')
                .then(function(row){
                  var id = row[0].id;
                  knex.insert({'work_id': workId, 
                               'tag_id': id, 
                               'count': 1})
                  .into('WorkTag')
                })
          });
        })
};
