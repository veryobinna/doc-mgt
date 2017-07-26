import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import log from 'npmlog';
import app from '../../../serverDev';
import fakeData from '../helpers/FakeData';
import db from '../../models';
import SeedData from '../helpers/SeedData';

chai.use(chaiHttp);

const request = chai.request(app),
  adminUser = fakeData.adminUser,
  validUser = fakeData.generateRandomUser(3),
  invalidEmailUser = fakeData.invalidEmailUser,
  invalidPasswordUser = fakeData.invalidPasswordUser,
  firstRegularUser = fakeData.firstRegularUser,
  secondRegularUser = fakeData.secondRegularUser;
let adminToken, regularToken;

describe('Routes : Users', () => {
  before((done) => {
    SeedData.init().then(() => {
      request
        .post('/login')
        .send({ loginID: adminUser.email, password: adminUser.password })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });
  });
  after((done) => {
    log.info('message :  ', 'resseting Database.......');
    db.sequelize.sync({ force: true }).then(() => {
      log.info('message :  ', 'Database reset succesful');
      done();
    });
  });

  describe('POST /users/', () => {
    it('should allows users signup and return a token.', (done) => {
      request
        .post('/users')
        .send(validUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('User Created');
          done();
        });
    });

    it('should not allow existing user signup.', (done) => {
      request
        .post('/users')
        .send(validUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Username already exists');
          done();
        });
    });

    it('should not allow users with invalid email to signup.', (done) => {
      request
        .post('/users')
        .send(invalidEmailUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Invalid Email');
          done();
        });
    });

    it('should not allow users with invalid password to signup.', (done) => {
      request
        .post('/users')
        .send(invalidPasswordUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message)
          .to.equal('Password cannot be empty');
          done();
        });
    });
  });

  describe('POST /users/login', () => {
    it('it should registered users login and return a token.', (done) => {
      request
        .post('/login')
        .send({ loginID: firstRegularUser.email,
          password: firstRegularUser.password })
        .end((err, res) => {
          regularToken = res.body.token;
          expect(res).to.have.status(200);
          expect(res.body.token).to.not.equal(undefined);
          expect(res.body.message).to.equal('Login Successful');
          done();
        });
    });

    it('should not allow user without pasword or email to login.', (done) => {
      request
        .post('/login')
        .send({ loginID: '', password: '' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.token).to.equal(undefined);
          expect(res.body.message).to.equal(
            'Please input a username or email and pasword');
          done();
        });
    });

    it(`should not allow registered users with
       invalid password login.`, (done) => {
      request
          .post('/login')
          .send({ loginID: firstRegularUser.email, password: 'invalid' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.token).to.equal(undefined);
            expect(res.body.message).to.equal(
              'Login failed! Check your loginID or password');
            done();
          });
    });
  });

  describe('GET /users/', () => {
    it('should allow admin to view all users', (done) => {
      request
        .get('/users/')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.not.equal(undefined);
          expect(res.body.users).to.be.an('array');
          done();
        });
    });

    it('should not allow regular user to view all users', (done) => {
      request
        .get('/users/')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Access Denied');
          expect(res.body.users).to.equal(undefined);
          done();
        });
    });
  });

  describe('Get /users/:id', () => {
    it('should allow admin to view any users profile', (done) => {
      request
        .get('/users/2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.username).to.equal(firstRegularUser.username);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should not allow admin to view non existent user profile', (done) => {
      request
        .get('/users/0')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.user).to.equal(undefined);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('should not allow regular user to view other users profile', (done) => {
      request
        .get('/users/2')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Access Denied');
          done();
        });
    });
  });

  describe('PUT /users/', () => {
    it('should  not allow users to edit profile', (done) => {
      request
        .put('/users/3')
        .set({ 'x-access-token': regularToken })
        .send({ secondRegularUser })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Access Denied');
          done();
        });
    });

    it('should  not allow admin edit non existent user', (done) => {
      request
        .put('/users/0')
        .set({ 'x-access-token': adminToken })
        .send({ firstName: 'musa', lastName: 'asmu', roleID: 2 })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should  allow admin update user profile', (done) => {
      request
        .put('/users/2')
        .set({ 'x-access-token': adminToken })
        .send({ firstName: 'musa', lastName: 'asmu', roleID: 2 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.roleID).to.equal(2);
          expect(res.body.firstName).to.not.equal(secondRegularUser.firstName);
          expect(res.body.lastName).to.not.equal(secondRegularUser.lastName);
          expect(res.body.firstName).to.equal('musa');
          expect(res.body.lastName).to.equal('asmu');
          done();
        });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should allow admin to delete any user profile', (done) => {
      request
        .delete('/users/3')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });

    it('should not allow admin to delete non existent user profile', (done) => {
      request
        .delete('/users/0')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('User Not Found');
          done();
        });
    });

    it('should not allow admin to delete his own profile', (done) => {
      request
        .delete('/users/1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.equal('Cannot Delete User');
          done();
        });
    });

    it(`should not allow regular user delete
       other users profile`, (done) => {
      request
          .delete('/users/4')
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.equal('Access Denied');
            done();
          });
    });
  });

  describe('POST /logout', () => {
    it('should send a response on logout', (done) => {
      request
        .post('/logout')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('logout successful');
          done();
        });
    });
  });
});
