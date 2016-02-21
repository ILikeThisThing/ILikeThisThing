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
  console.log('Inside addWork, heres the apiRes sent in: ', apiRes)

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

  return knex.insert({'title': title, 'type': type}).returning('id').into('Works')
        .then(function(result){
          console.log("after insert, inside .then. this is result: ", result)
          if (type === 'Books'){
            return knex.insert({'id': result[0], 
                                'title': title, 
                                'author': JSON.stringify(apiRes.authors), //an array - could be more than one 
                                'image': apiRes.largeImage, 
                                'data': JSON.stringify(apiRes)})
                .returning('*')
                .into('Books')
                .then(function(result){
                  console.log('result from adding a book', result)
                  return result[0];
                })
          }
          else if (type === 'Movies'){
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
                        .returning('*')
                        .into('Games')
                        .then(function(result){
                          console.log('result from adding a game', result)
                          return result;
                        })
            }
        })
      .catch(function(error){
        console.error("inserting into Works has failed: ", error);
      })
};


exports.findWorks = function(req){
	var tagsArr = req.tags // => must be array
  
  //subquery to find the tag_ids
  return knex.select('id')
                   .from('Tags')
                   .whereIn('tag', tagsArr)
                   .map(function(rows){
                      return rows.id
                   })
                   .then(function(tagIds){     
                  //not sure if the WorkTag count will be in the same object
                  return knex('WorkTag')
                          .select(['Tags.tag', 'WorkTag.count', 'Books.title', 'Books.author', 'Books.image', 'Books.data', 
                                    'Movies.title', 'Movies.director', 'Movies.image', 'Movies.data',
                                    'Games.title', 'Games.image', 'Games.data'])
                          .leftOuterJoin('Books', 'Books.id', 'WorkTag.work_id')
                          .leftOuterJoin('Movies', 'Movies.id', 'WorkTag.work_id')
                          .leftOuterJoin('Games', 'Games.id', 'WorkTag.work_id')
                          .leftOuterJoin('Tags', 'Tags.id', 'WorkTag.tag_id')
                          .whereIn('tag_id', tagIds)
                          .catch(function(err){
                            console.log('error in WorkTag ', err)
                          })
                          .then(function(results){
                            console.log('results ', results)
                            if (results.length <= 1){
                              throw new Error('No other matching works found')
                            }
                            console.log('results of join table ', results)
                            return results;
                          })
                          
                  })
};

//checks to see what tags a given work already has
exports.findTags = function(req){
  var title = req.title

  //first find the works id
  return knex.select('id')
            .from('Works')
            .where('title', title)
            .catch(function(err){
              console.error('.catch for findtags .select (1st one): ', err)//GET RID OF THIS!!!
            })
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
                                      // console.log('inside first map ', row)
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

exports.addTags = function(req){
  console.log("inside addTags: ", req);
	var title = req.title; // => should be a string of a single work
  var tagNames = req.tags;
  //finds id for the given title
  return knex.select('id').from('Works').where('title', title)
        .then(function(row){
          return row[0].id
        })
        .then(function(workId){
          //add to Tags -- then add to WorkTag
          tagNames.forEach(function(tagName){
            knex.select('id')
                .from('Tags')
                .where('tag', tagName)
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
