import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import log from 'npmlog';
import app from '../../../server';
import fakeData from '../helpers/FakeData';
import db from '../../models';
import SeedData from '../helpers/SeedData';

chai.use(chaiHttp);
const request = chai.request(app),
  adminUser = fakeData.validAdmin,
  validRegularUser1 = fakeData.validRegularUser1,
  emptyRole = fakeData.emptyRole,
  invalidRole = fakeData.invalidRole,
  randomRole1 = fakeData.generateRandomRole('random'),
  randomRole2 = fakeData.generateRandomRole('club'),
  updateRole = fakeData.generateRandomRole('blue');

let adminToken, regularToken;

describe('Roles', () => {
  before((done) => {
    SeedData.init().then(() => {
      request
        .post('/login')
        .send({ loginID: adminUser.email, password: adminUser.password })
        .end((err, res) => {
          adminToken = res.body.token;
        });
      request
        .post('/login')
        .send({
          loginID: validRegularUser1.email,
          password: validRegularUser1.password
        })
        .end((err, res) => {
          regularToken = res.body.token;
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
  describe('POST /roles/', () => {
    it('should allow admin to create roles', (done) => {
      request
        .post('/roles')
        .set({ 'x-access-token': adminToken })
        .send(randomRole1)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it(`should not allow regular users to create roles 
        `, (done) => {
      request
          .post('/roles')
          .set({ 'x-access-token': regularToken })
          .send(randomRole1)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.equal('Access Denied');
            done();
          });
    });
    it(`should not allow admin to create roles 
        with existing names`, (done) => {
      request
          .post('/roles')
          .set({ 'x-access-token': adminToken })
          .send(randomRole1)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Role already exists');
            done();
          });
    });
    it('should not allow admin to create roles with empty Name', (done) => {
      request
        .post('/roles')
        .set({ 'x-access-token': adminToken })
        .send(emptyRole)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors[0].message).to.equal('Name cannot be empty');
          done();
        });
    });
    it(`should not allow admin to create roles with 
        invalid characters to be created`, (done) => {
      request
          .post('/roles')
          .set({ 'x-access-token': adminToken })
          .send(invalidRole)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0].message)
            .to.equal('Alphanumeric characters only');
            done();
          });
    });
  });

  describe('GET /roles/:id', () => {
    it('should allow admin to get specified role', (done) => {
      request
        .get('/roles/1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.id).to.equal(1);
          done();
        });
    });
    it('should not allow admin to get non existent role', (done) => {
      request
        .get('/roles/0')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Role Not Found');
          done();
        });
    });
    it('should not allow regular user to get all role', (done) => {
      request
        .get('/roles/2')
        .set({ 'x-access-token': regularToken })
        .send(randomRole2)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Access Denied');
          done();
        });
    });
  });

  describe('PUT /roles/:id', () => {
    it(`should allow admin to update roles that exists
     and are not admin or regular role`, (done) => {
      request
          .put('/roles/2')
          .set({ 'x-access-token': adminToken })
          .send(updateRole)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.name).to.equal(updateRole.name);
            done();
          });
    });

    it(`should allow not allow admin to 
    update non existent roles`, (done) => {
      request
          .put('/roles/0')
          .set({ 'x-access-token': adminToken })
          .send(updateRole)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.be.equal('Role Not Found');
            done();
          });
    });
    it(`should not allow admin to update
     roles with existing titles`, (done) => {
      request
          .put('/roles/2')
          .set({ 'x-access-token': adminToken })
          .send(randomRole1)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Role already exists');
            done();
          });
    });
    it('should not allow regular users to update roles', (done) => {
      request
        .put('/roles/2')
        .set({ 'x-access-token': regularToken })
        .send(randomRole2)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Access Denied');
          done();
        });
    });
  });

  describe('DELETE /roles/:id', () => {
    it('it should allow not allow admin to delete admin role', (done) => {
      request
        .delete('/roles/1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.be.equal('Cannot Delete Admin Role');
          done();
        });
    });
    it(`it should not allow admin to delete non
       existent roles`, (done) => {
      request
          .delete('/roles/0')
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.be.equal('Role Not Found');
            done();
          });
    });
    it('it should allow admin to delete non admin roles', (done) => {
      request
        .delete('/roles/4')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
    it('it should not allow regular users to delete roles', (done) => {
      request
        .delete('/roles/4')
        .set({ 'x-access-token': regularToken })
        .send(randomRole2)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Access Denied');
          done();
        });
    });
  });
});
