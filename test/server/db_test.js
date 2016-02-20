var chai = require('chai');
var request = require('supertest');
// var should = chai.should();
var expect = chai.expect();

var config = require('../../knexfile.js');
var env = process.env.NODE_ENV;

var apiHandler = require(__server + '/apiHandlers.js');
var db   = require(__server + '/db.js');
var routes  = require(__server + '/index.js');
var knex = require('knex')(config[env]);
// var Caller = require('../../models/caller.js')



describe('database API', function(){

  beforeEach(function(){

  })

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()


  describe('Works', function(){
    beforeEach(function(){
      // knex.migrate.latest().up();
    knex.schema.dropTableIfExists('Works');
    knex.schema.dropTableIfExists('Books');
    knex.schema.dropTableIfExists('Movies');
    knex.schema.dropTableIfExists('Games');
    knex.schema.dropTableIfExists('Tags');
    knex.schema.dropTableIfExists('WorkTag');

     // knex.insert([{'tag': "so bad its good"}, {'tag': 'programming'}, {'tag': 'romance'}, {'tag': 'high-art'}]).into('Tags')
     //      .returning('*')
     //      .then(function(result){
     //        console.log('inserting tags ', result)
     //      })
      request(app).post('/api/searchworks').send({title: 'Sharknado', type: 'Movies'})
      request(app).post('/api/tags').send({title: 'Sharknado', tags: ['so bad its good']})
      .then(function(){
        console.log('sent sharknado')
      })
      request(app).post('/api/searchworks').send({title: 'Pride and Prejudice', type: 'Books'})
      request(app).post('/api/tags').send({title: 'Pride and Prejudice', tags: ['romance']})
      request(app).post('/api/searchworks').send({title: 'Human Resource Machine', type: 'Games'})
      request(app).post('/api/tags').send({title: 'Human Resource Machine', tags: ['programming']})
      
    })


    it ('should add new entry into database after user confirmation', function(){
        return request(app)
                .post('/api/works')
                .send({type: 'Movies', title: 'The Room', Director: 'Tommy Wiseau', Poster: 'a poster'})
                .expect(201)
    })


    it ('should return all tag matching works', function(){
      return request(app)
              .post('/api/tags')
              .send({title: 'The Room', tags:["so bad its good"]})
              .expect(200)
    })

    it ('should update queried works tags', function(){
      return request(app)
              .post('/api/tags')
              .send({title: 'The Room', tags:["high-art"]})
              .expect(200)
              // .expect(function(response){

              //   //search for tag to confirm it was added

              //   return request(app)
              //           .post('/api/tags')
              //           .expect(200)
              //           .send({'title': 'The Room', tags: ['high-art']})
              //           .expect(function(response){
              //             expect(response.body.length).to.equal(1)
              //             expect(response.body.title).to.equal('The Room')
              //           })
              // })
    })

  });

});