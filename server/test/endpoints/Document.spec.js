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
  validRegularUser2 = fakeData.validRegularUser2,
  publicDocument1 = fakeData.generateRandomDocument('public'),
  roleDocument1 = fakeData.generateRandomDocument('role'),
  invalidAccessDocument = fakeData.generateRandomDocument('random'),
  privateDocument1 = fakeData.generateRandomDocument('private'),
   emtptyTitleDocument = fakeData.emtptyTitleDocument,
  emtptyContentDocument = fakeData.emtptyContentDocument;
  // updateDocument1 = fakeData.generateRandomDocument('role'),
  // invalidAccessDocument = fakeData.generateRandomDocument('radnom');

let adminToken, regular1Token, regular2Token;


describe('Documents', () => {
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
        .send({ loginID: validRegularUser1.email, password: validRegularUser1.password })
        .end((err, res) => {
          regular1Token = res.body.token;
        });
      request
        .post('/login')
        .send({ loginID: validRegularUser2.email, password: validRegularUser2.password })
        .end((err, res) => {
          regular2Token = res.body.token;
          done();
        });
    });
  });
  after((done) => {
    log.info('message :  ', 'reseting Database...');
    db.sequelize.sync({ force: true }).then(() => {
      log.info('message :  ', 'Database reset succesful');
      done();
    });
  });
  describe('POST /documents/', () => {
    it('it should allow users to create private access documents', (done) => {
      request
        .post('/documents')
        .set({ 'x-access-token': regular1Token })
        .send(privateDocument1)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.createdAt).to.not.equal(undefined);
          expect(res.body.title).to.equal(privateDocument1.title);
          done();
        });
    });
    it('it should allow users to create public access documents', (done) => {
      request
        .post('/documents')
        .set({ 'x-access-token': regular1Token })
        .send(publicDocument1)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.createdAt).to.not.equal(undefined);
          expect(res.body.title).to.equal(publicDocument1.title);
          done();
        });
    });
    it('it should allow users to create role access documents', (done) => {
      request
        .post('/documents')
        .set({ 'x-access-token': regular1Token })
        .send(roleDocument1)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.createdAt).to.not.equal(undefined);
          expect(res.body.title).to.equal(roleDocument1.title);
          done();
        });
    });
    it('it should not allow users to create documents without specifying role access', (done) => {
      request
        .post('/documents')
        .set({ 'x-access-token': regular1Token })
        .send(invalidAccessDocument)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message.errors[0].message).to.equal(
            'Access can either be public ,private or role');
          done();
        });
    });
    it('it should not allow users update documents that dont exist', (done) => {
      request
        .put('/documents/0')
        .set({ 'x-access-token': regular1Token })
        .send(publicDocument1)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Document Not Found');
          done();
        });
    });
    it('should not allow users to create empty content document', (done) => {
      request
        .post('/documents')
        .set({ 'x-access-token': regular1Token })
        .send(emtptyContentDocument)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message.errors[0].message).to.equal('Content cannot be empty');
          done();
        });
    });
    it('should not allow users to create empty title document', (done) => {
      request
        .post('/documents')
        .set({ 'x-access-token': regular1Token })
        .send(emtptyTitleDocument)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message.errors[0].message).to.equal('Title cannot be empty');
          done();
        });
    });
  });
});
