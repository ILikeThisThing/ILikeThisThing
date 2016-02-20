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
exports.addWork = function(apiRes){
  console.log('Inisde addWork, heres the apiRes sent in: ', apiRes)

  //set the title, depending on work type (API response format)
  var title; 
  var type = apiRes.type;
  if (type === 'Books'){
    title = apiRes.title;
  } else if (type === 'Movies'){
    title = apiRes.Title;
  } else if (type === 'Games'){
    title = apiRes.name;
  }

  return knex.insert({'title': title, 'type': type}).into('Works')
        .then(function(result){
          if (type === 'Books'){
            return knex.insert({'id': result.id, 
                                'title': title, 
                                'author': apiRes.authors, //an array - could be more than one 
                                'image': apiRes.largeImage, 
                                'data': JSON.stringify(apiRes)})
                .returning('*')
                .into('Books')
                .then(function(result){
                  console.log('result from adding a book', result)
                  return result[0];
                })
          }
          else if (apiRes.type === 'Movies'){
            return knex.insert({'id': result[0], 
                                'title': title, 
                                'director': apiRes.Director, 
                                'image': apiRes.Poster, 
                                'data': JSON.stringify(apiRes)})
                .returning('*')
                .into('Movies')
                .then(function(result){
                  console.log('result from adding a movie', result)
                  return result[0];
                })
          }
          else if (type === 'Games'){
            return knex.insert({'id': result[0], 
                                'title': title,
                                'image': apiRes.image.medium_url, 
                                'data': JSON.stringify(apiRes)})
                        .into('Games')
                        .then(function(result){
                          console.log('result from adding a game', result)
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
                   // .return(tagids);

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
              console.log('found id ', result[0].id)
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
                                      console.log('inside first map ', row)
                                      return row.id;
                                     })
                                     .then(function(tagIds){
                                      console.log('tagIds array ', tagIds)
                                      return knex.select('tag').from('Tags').whereIn('id', tagIds);
                                     })
                                     .map(function(row){
                                      return row.tag; //=> should be returning a flat array of tagnames to filter against users passed in tags
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
