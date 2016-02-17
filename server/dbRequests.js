require('./db');
var knex = require('knex');


exports.lookupWork = function(req){
	var title = req.title //or whatever that path ends up being
	    var type = req.type //same as above

	    knex.from(type).where('title', title) //maybe change this to a LIKE to account for case errors or something?
	        .then(function(result){
	          //add result to response body and return
	          return result;
	        })
	        .catch(function(err){
	          //if err.message.match() something indicating it wasn't found? or just always make query to api
	          //make call to appropriate api and return that in response
	          //also should make POST req to api/works to add it into the database
	        })
	    //response should have an array of the searched for object in it.
};

exports.addWork = function(req){

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
          //put results into response body and send off
          //I think this will return all works that match at least one tag
        })
        .catch(function(err){
          //won't get no matching works unless we filter out the searched for thing
          console.error('error in findWorks ', err)
        })
};

exports.findTags = function(req){
	
}


exports.addTags = function(req){
	var title = req.title; // => should be a string of a single work
    var tagNames = req.tags; // => must be an array

    //finds id for the given title
    knex.select('id').from('Works').where('title', title)
        .then(function(row){
          return row[0].id
        })
        .then(function(workId){
          //finds id for given tags
          knex.select('id').from('Tags').where('tag', tagName)
              .map(function(row){
                return row.id;
              })
              .then(function(tagIds){
                //tagIds is an array of the selected tags ids
                console.log('tagIds after map promise ', tagIds);
                //now we need to put tagIds and workId together into array of objects
                return tagIds
              })
        })
    
    knex.insert(newTags).into('WorkTag')

};