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
  privateDocument = fakeData.generateRandomDocument('private'),
  updateDocument = fakeData.generateRandomDocument('role'),
  emtptyTitleDocument = fakeData.emtptyTitleDocument,
  emtptyContentDocument = fakeData.emtptyContentDocument;

let adminToken, regular1Token, regular2Token,
  publicDocId, roleDocId, privateDocId,
  adminDocsCount, regularDocsCount;


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
        .send({ loginID: validRegularUser1.email,
          password: validRegularUser1.password })
        .end((err, res) => {
          regular1Token = res.body.token;
        });
      request
        .post('/login')
        .send({ loginID: validRegularUser2.email,
          password: validRegularUser2.password })
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
        .send(privateDocument)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.createdAt).to.not.equal(undefined);
          expect(res.body.title).to.equal(privateDocument.title);
          privateDocId = res.body.id;
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
          publicDocId = res.body.id;
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
          roleDocId = res.body.id;
          done();
        });
    });
    it(`it should not allow users to create documents
        without specifying role access`, (done) => {
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
          expect(res.body.message.errors[0].message)
          .to.equal('Content cannot be empty');
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
          expect(res.body.message.errors[0].message)
          .to.equal('Title cannot be empty');
          done();
        });
    });
  });
  describe('GET /documents/:id', () => {
    it('should allow admin retrieve private documents', (done) => {
      request
        .get(`/documents/${privateDocId}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.title).to.equal(privateDocument.title);
          done();
        });
    });
    it(`should not allow regular user retrieve
       private documents not created by user`, (done) => {
      request
          .get(`/documents/${privateDocId}`)
          .set({ 'x-access-token': regular2Token })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.equal('Document not found');
            done();
          });
    });
    it(`it should allow regular user retrieve
        private documents he created`, (done) => {
      request
          .get(`/documents/${privateDocId}`)
          .set({ 'x-access-token': regular1Token })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.title).to.equal(privateDocument.title);
            done();
          });
    });
    it('it should allow allow regular users retrieve public', (done) => {
      request
        .get(`/documents/${publicDocId}`)
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.title).to.equal(publicDocument1.title);
          done();
        });
    });
    it(`it should allow allow regular
       users retrieve role doucuments`, (done) => {
      request
          .get(`/documents/${roleDocId}`)
          .set({ 'x-access-token': regular1Token })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.title).to.equal(roleDocument1.title);
            done();
          });
    });
    it('it should not display document that does not exist', (done) => {
      request
        .get('/documents/0')
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Document not found');
          done();
        });
    });
  });
  describe('GET /documents', () => {
    it(`The number of documents available to an admin
      must be greateror equall to any other user`, (done) => {
      request
          .get('/documents/')
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.document).to.be.an('array');
            adminDocsCount = res.body.paginate.totalCount;
            done();
          });
    });
    it(`The number of documents available to an admin
      must be greateror equall to any other user`, (done) => {
      request
          .get('/documents')
          .set({ 'x-access-token': regular1Token })
          .end((err, res) => {
            regularDocsCount = res.body.paginate.totalCount;
            expect(res).to.have.status(200);
            expect(adminDocsCount).to.be.equal(regularDocsCount);
            done();
          });
    });
  });
  describe('PUT /documents/:id', () => {
    it(`it should not allow users update
        documents they did not create`, (done) => {
      request
        .put(`/documents/${publicDocId}`)
        .set({ 'x-access-token': regular2Token })
        .send(updateDocument)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Access Denied');
          done();
        });
    });
    it('it should not allow users update documents that dont exist', (done) => {
      request
        .put('/documents/0')
        .set({ 'x-access-token': regular1Token })
        .send(updateDocument)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Document Not Found');
          done();
        });
    });
    it('it should allow users update documents created by them', (done) => {
      request
        .put(`/documents/${privateDocId}`)
        .set({ 'x-access-token': regular1Token })
        .send(updateDocument)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.document.title).to.equal(updateDocument.title);
          done();
        });
    });
  });
  describe('DELETE /documents/:id', () => {
    it(`it should not allow users delete
      documents they did not create`, (done) => {
      request
          .delete(`/documents/${publicDocId}`)
          .set({ 'x-access-token': regular2Token })
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.equal('Access Denied');
            done();
          });
    });
    it('it should not allow users delete documents that dont exist', (done) => {
      request
        .delete('/documents/0')
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Document Not Found');
          done();
        });
    });
    it('it should allow users delete documents created by them', (done) => {
      request
        .delete(`/documents/${privateDocId}`)
        .set({ 'x-access-token': regular1Token })
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
    it('it should allow admin delete any users document', (done) => {
      request
        .delete(`/documents/${publicDocId}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
