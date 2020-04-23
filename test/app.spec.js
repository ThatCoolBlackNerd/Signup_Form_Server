const knex = require('../db/knex');
const app = require('../src/app');
const fixtures = require('./fixtures');

describe('Signup Form Test', () => {
  // Before every test
  before((done) => {
    //run migrations
    knex.migrate.latest()
      .then(() => {
        // run seeds
        return knex.seed.run(); 
      }).then(() => done());
  });

  it('List all users in JSON Format', (done) => {
   supertest(app) //access the app
      .get('/api/v1/users') //get the endpoint with the users
      .set('Accept', 'application/json') // set the headers to accept json
      .expect('Content-Type', /json/) //expect content to be json
      .expect(200) // expect a status code of 200)
      .then((response) => {
        console.log(response.body);
        // expects the endpoint to return an array
        expect(response.body).to.be.a('array'); 
        // expects that array to === the fixtures
        expect(response.body).to.deep.equal(fixtures.userList); 
        done();
      }).catch(done);
  });

  it('Show one user by ID', (done) => {
    supertest(app) //access the app
       .get('/api/v1/users/1') //get the endpoint with the users
       .set('Accept', 'application/json') // set the headers to accept json
       .expect('Content-Type', /json/) //expect content to be json
       .expect(200) // expect a status code of 200)
       .then((response) => {
         console.log(response.body); 
         // expects the endpoint to return an object
         expect(response.body).to.be.a('object');
         // expects the first user to equal the first object in the fixtures array
         expect(response.body).to.deep.equal(fixtures.userList[0]); 
         done();
       }).catch(done);
   });

   it('Creates a User', (done) => {
     supertest(app)
      .post('/api/v1/users')
      .send(fixtures.newUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        // sets the newUser object ID to equal the ID of the posted Object
        fixtures.newUser.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.newUser);
        done();
      }).catch(done);
   });

   it('Updates a User', (done) => {
     // change last name on newUser
     fixtures.newUser.last_name = 'The Dog';
    supertest(app)
     .put('/api/v1/users/3')
     .send(fixtures.newUser)
     .set('Accept', 'application/json')
     .expect('Content-Type', /json/)
     .expect(200)
     .then((response) => {
       expect(response.body).to.be.a('object');
       expect(response.body).to.deep.equal(fixtures.newUser);
       done();
     }).catch(done);
  });

  it('Deletes a User', (done) => {
   supertest(app)
    .delete('/api/v1/users/3')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.a('object');
      expect(response.body).to.deep.equal({
        deleted: true
      });
      done();
    }).catch(done);
 });
});