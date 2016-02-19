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
    // knex.down();
  })

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()


  describe('Works', function(){
    beforeEach(function(){
      // knex.up();
  
      // request(app).post('/api/searchworks').send({title: 'Evil Dead', type: 'Movies'})
      // request(app).post('/api/tags').send({title: 'Evil Dead', tags:["so bad it's good"]})
      // request(app).post('/api/searchworks').send({title: 'Sharknado', type: 'Movies'})
      // request(app).post('/api/tags').send({title: 'Sharknado', tags:["so bad it's good"]})
      request(app).post('/api/searchworks').send({title: 'Pride and Prejudice', type: 'Books'})
      request(app).post('/api/tags').send({title: 'Pride and Prejudice', tags: ['romance']})
      request(app).post('/api/searchworks').send({title: 'Human Resource Machine', type: 'Games'})
      request(app).post('/api/tags').send({title: 'Human Resource Machine', tags: ['programming']})
      
    })

    // it('should return all works in db', function(){
    //     return request(app)
    //             .get('/api/works')
    //             .expect(201)
    //             .expect(function(response){
    //               expect(response.body.length).to.equal(4);
    //             })
    // })

    // it ('should return just the queried work from db', function(){
    //     return request(app)
    //             .post('/api/searchWorks')
    //             .send({title: 'Evil Dead', type: 'Movies', director: 'Sam Raimi'})
    //             .expect(200)
    //             .expect(function(response){
    //               console.log('response inside of test ', response)
    //               expect(response.body.length).to.equal(1)
    //               expect(response.body[0].title).to.equal('Evil Dead')
    //             })
    // })

    // it ('should initialize api call if no results', function(){
    //     return request(app)
    //         //whatever the call to a given apis path is.
    //           .expect()//expected status code in response
    //           .expect(function(response){
    //             expect(response.body) //whatever the response body should be for a positive result
    //           })
    // })

    it ('should add new entry into database after user confirmation', function(){
        return request(app)
                .post('/api/works')
                .send({type: 'Movies', title: 'The Room', Director: 'Tommy Wiseau', Poster: 'a poster'})
                .expect(201)
                // .expect(function(response){
                  
                //   //search for created entry to confirm it was created

                //   return request(app)
                //           .get('/api')
                //           .expect(200)
                //           .expect(function(response){
                //             expect(response.body.length).to.equal(1)
                //             expect(response.body.results[0].work).to.equal('The Room')
                //             expect(response.body.results[0].type).to.equal('Movies')
                //             expect(response.body.results[0].director).to.equal('Tommy Wiseau')
                //             expect(response.body.data).to.equal('lots of things')
                //           })

                // })
    })


    it ('should return all tag matching works', function(){
      return request(app)
              .post('/api/tags')
              .send({title: 'The Room', type: 'Movies', director: 'Tommy Wiseau', data: 'lots of things', tags:["so bad it's good"]})
              .expect(200)
              .expect(function(response){
                expect(function(response){
                  expect(response.body.results.length).to.equal(2)
                  expect(response.body[0]).to.equal({title: 'Evil Dead', type: 'Movies', director: 'Sam Raimi', data: 'this is some evil data', tags:["so bad it's good"]})
                  expect(response.body[1]).to.equal({title: 'Sharknado', type: 'Movies', director: 'Anthony C. Ferrante', data: 'this is some shark data', tags:["so bad it's good"]})
                })
              })
    })

    it ('should update queried works tags', function(){
      return request(app)
              .post('/api/tags')
              .send({title: 'The Room', type: 'Movies', director: 'Tommy Wiseau', 'image': 'and image link', data: 'lots of things', tags:["high-art"]})
              .expect(201)
              .expect(function(response){

                //search for tag to confirm it was added

                return request(app)
                        .post('/api/tags')
                        .expect(200)
                        .send({tags: ['high-art']})
                        .expect(function(response){
                          expect(response.body.results.length).to.equal(1)
                          expect(response.body.results.title).to.equal('The Room')
                        })
              })
    })

  });

});