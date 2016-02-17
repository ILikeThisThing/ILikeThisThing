require('./db');
var knex = require('knex');


exports.lookupWork = function(req){
	var title = req.title //or whatever that path ends up being
	    var type = req.type //same as above

	    knex.from(type).where('title', title) //maybe change this to a LIKE to account for case errors or something?
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
  knex.insert({'title': work.title, 'type': work.type}).into('Works')
      .then(function(result){
        if (work.type === 'Books'){
          knex.insert({'id': result[0].id, 'title': work.title, 'author': work.author, 'data': apiRes}).into('Books')
              .then(function(result){
                return result[0];
              })
        }
        else if (work.type === 'Movies'){
          knex.insert({'id': result[0].id, 'title': work.title, 'director': work.author, 'data': apiRes}).into('Movies')
              .then(function(result){
                return result[0];
              })
        }
        else if (work.type === 'Games'){
          knex.insert({'id': result[0].id, 'title': work.title, 'studio': work.studio, 'data': apiRes}).into('Movies')
              .then(function(result){
                return result[0];
              })
          }
      })
};

exports.findWorks = function(req){
	var tagsArr = req.tags // => must be array

    //returns all tag ids for the passed in tags
    var tagLookup = knex.select('id').from('Tags').whereIn('tag', tagsArr);
    //returns work ids for all works that have any of the given tags
    var workLookup = knex.select('work_id').from('TagWork').whereIn('tag_id', tagLookup);

    //inner join of books, games, movies tables to return all colomns for each work_id
    knex.from(/* all work tables*/).whereIn('id', workLookup)
        .then(function(results){
            return results;
        })
        .catch(function(err){
          //won't get no matching works unless we filter out the searched for thing
          console.error('error in findWorks ', err)
        })
};

//checks to see what tags a given work already has
exports.findTags = function(req){
  //first find the works id

  knex.select('id').from('Works').where('title', title)
      .then(function(result){
        return knex.select('tag_id').from('WorkTag').where('work_id', result[0].id)
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

      
};


exports.addTags = function(req){
	var title = req.title; // => should be a string of a single work
    var tagNames = req.tags; // => must be an array

    //finds id for the given title
    knex.select('id').from('Works').where('title', title)
        .then(function(row){
          return row[0].id
        })
        .then(function(workId){
          //add to Tags -- then add to WorkTag
          
          tagNames.forEach(function(tagName){
            knex.insert({'tag': tagName}).into('Tags')
                .then(function(row){
                  var id = row[0].id;
                  knex.insert({'work_id': workId, 'tag_id': id}).into('WorkTag')
                })
          });
        })
};