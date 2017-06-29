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
  privateDocument1 = fakeData.generateRandomDocument('private');
  // emtptyTitleDocument = fakeData.emtptyTitleDocument,
  // emtptyContentDocument = fakeData.emtptyContentDocument,
  // roleDocument1 = fakeData.generateRandomDocument('role'),
  // updateDocument1 = fakeData.generateRandomDocument('role'),
  // invalidAccessDocument = fakeData.generateRandomDocument('radnom');

let adminToken, regular1Token, regular2Token;


describe('Documents', () => {
  before((done) => {
    SeedData.init().then(() => {
       console.log('fghkjl;', adminUser.email);
       request
        .post('/login')
        .send({ loginID: adminUser.email, password: adminUser.password })
        .end((err, res) => {
          console.log('fghkjlhjhjhjhjhj;', adminUser.email);
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
    it('it should allow users to create private access documents', (done) => {
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
  });
});
