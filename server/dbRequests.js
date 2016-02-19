var db = require('./db');
var config = require('../knexfile.js');  
var env =  process.env.NODE_ENV || 'development';  
var knex = require('knex')(config[env]); 


exports.lookupWork = function(req){
  console.log('inside lookupWork ', req)
	var title = req.title; //or whatever that path ends up being
	var type = req.type; //same as above

	return knex.from(type).where('title', title)
	        .then(function(result){
            if (result.length === 0){
              throw new Error('No such work found');
            }
	          return result[0]; // => returns just the object of the found work
	        })
};

//called after an apirequest
exports.addWork = function(work, apiRes){
  console.log('Inisde addWork', work)
  var title = apiRes.title;

  return knex.insert({'title': title, 'type': work.type}).into('Works')
        .then(function(result){
          if (work.type === 'Books'){
            return knex.insert({'id': result.id, 
                                'title': title, 
                                'author': apiRes.author, 
                                'image': apiRes.largeImage, 
                                'data': JSON.stringify(apiRes)})
                .into('Books')
                .then(function(result){
                  return result[0];
                })
          }
          else if (work.type === 'Movies'){
            return knex.insert({'id': result.id, 
                                'title': title, 
                                'director': apiRes.Director, 
                                'image': apiRes.Poster, 
                                'data': JSON.stringify(apiRes)})
                .into('Movies')
                .then(function(result){
                  return result[0];
                })
          }
          else if (work.type === 'Games'){
            return knex.insert({'id': result.id, 
                                'title': title, 
                                'studio': apiRes.studio, 
                                'image': apiRes.image, 
                                'data': JSON.stringify(apiRes)})
                        .into('Movies')
                        .then(function(result){
                          return result;
                        })
            }
        })
};


exports.findWorks = function(req){
	var tagsArr = req.tags // => must be array
  
  //subquery to find the tag_ids
  var tagIds = knex.select('id')
                   .from('Tags')
                   .whereIn('tag', tagsArr)
                   .map(function(rows){
                      return rows.id
                   })
                   .return(tag_ids);

  //not sure if the WorkTag count will be in the same object -- might need to join with Tags table as well
  return knex('WorkTag')
          .select(['WorkTag.count', 'Books.title', 'Books.author', 'Books.image', 'Books.data', 
                    'Movies.title', 'Movies.director', 'Movies.image', 'Movies.data',
                    'Games.title', 'Games.studio', 'Games.image', 'Games.data'])
          .join('Books', 'Books.id', 'WorkTag.work_id')
          .join('Movies', 'Movies.id', 'WorkTag.work_id')
          .join('Games', 'Games.id', 'WorkTag.work_id')
          .whereIn('tag_id', tagIds)
          .then(function(results){
            if (results.length === 1){
              throw new Error('No other matching works found')
            }
            return results;
          })
};

//checks to see what tags a given work already has
exports.findTags = function(req){
  var title = req.title

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
                                     .then(function(tagIds){
                                      knex.select('tag').from('Tags').whereIn('id', tagIds);
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

exports.addTags = function(req, tagNames){
	var title = req.title; // => should be a string of a single work

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
