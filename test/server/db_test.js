var chai = require('chai');
var request = require('supertest-as-promised');
// var should = chai.should();
var expect = chai.expect();

var config = require('../../knexfile.js');
var env = process.env.NODE_ENV;

var apiHandler = require(__server + '/apiHandlers.js');
var db   = require(__server + '/db.js');
var app  = require(__server + '/index.js');
var knex = require('knex')(config[env]);
// var Caller = require('../../models/caller.js')



describe('database API', function(){

  beforeEach(function(){
    // knex.down();
  })


  describe('Works', function(){
    beforeEach(function(){
      // knex.up();

      // request(app).post({work: 'Evil Dead', type: 'movie', director: 'Sam Raimi', data: 'this is some evil data', tags:["so bad it's good"]});
      // request(app).post({work: 'Sharknado', type: 'movie', director: 'Anthony C. Ferrante', data: 'this is some shark data', tags:["so bad it's good"]});
      // request(app).post({work: 'Pride and Prejudice', type: 'book', author: 'Jane Austen', data: 'this is some regency data', tags:["romance"]});
      // request(app).post({work: 'Human Resource Machine', type: 'game', studio: 'Tomorrow Corporation', data: 'this is some computer data', tags:["programming"]})
      
    })

    // it('should return all works in db', function(){
    //     return request(app)
    //             .get('/api/works')
    //             .expect(201)
    //             .expect(function(response){
    //               expect(response.body.length).to.equal(4);
    //             })
    // })

    it ('should return just the queried work from db', function(){
        return request(app)
                .post('/api/searchWorks')
                .send({work: 'Evil Dead', type: 'movie', director: 'Sam Raimi'})
                .expect(200)
                .expect(function(response){
                  expect(response.body.results.length).to.equal(1)
                  expect(response.body.results[0].work).to.equal('Evil Dead')
                })
    })

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
                .send({work: 'The Room', type: 'movie', director: 'Tommy Wiseau', data: 'lots of things'})
                .expect(201)
                .expect(function(response){
                  
                  //search for created entry to confirm it was created

                  return request(app)
                          .get('/api')
                          .expect(200)
                          .expect(function(response){
                            expect(response.body.length).to.equal(1)
                            expect(response.body.results[0].work).to.equal('The Room')
                            expect(response.body.results[0].type).to.equal('movie')
                            expect(response.body.results[0].director).to.equal('Tommy Wiseau')
                            expect(response.body.data).to.equal('lots of things')
                          })

                })
    })


    it ('should return all tag matching works', function(){
      return request(app)
              .post('/api/tags')
              .send({work: 'The Room', type: 'movie', director: 'Tommy Wiseau', data: 'lots of things', tags:["so bad it's good"]})
              .expect(200)
              .expect(function(response){
                expect(function(response){
                  expect(response.body.results.length).to.equal(2)
                  expect(response.body.results[0]).to.equal({work: 'Evil Dead', type: 'movie', director: 'Sam Raimi', data: 'this is some evil data', tags:["so bad it's good"]})
                  expect(response.body.results[1]).to.equal({work: 'Sharknado', type: 'movie', director: 'Anthony C. Ferrante', data: 'this is some shark data', tags:["so bad it's good"]})
                })
              })
    })

    it ('should update queried works tags', function(){
      return request(app)
              .post('/api/tags')
              .send({work: 'The Room', type: 'movie', director: 'Tommy Wiseau', 'image': 'and image link', data: 'lots of things', tags:["high-art"]})
              .expect(201)
              .expect(function(response){

                //search for tag to confirm it was added

                return request(app)
                        .post('/api/tags')
                        .expect(200)
                        .send({tags: ['high-art']})
                        .expect(function(response){
                          expect(response.body.results.length).to.equal(1)
                          expect(response.body.results.work).to.equal('The Room')
                        })
              })
    })

  });

});