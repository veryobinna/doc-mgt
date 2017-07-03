import log from 'npmlog';
import fakeData from './FakeData';
import db from '../../models';

const validAdmin = fakeData.validAdmin,
  validRegularUser1 = fakeData.validRegularUser1,
  validRegularUser2 = fakeData.validRegularUser2,
  validRegularUser3 = fakeData.validRegularUser3;
/**
 * @class SeedData
 */
class SeedData {
/**
 * @desc initializes the seeding of data into the db.
 * @static
 * @returns {promise} returns a promise
 * @memberof SeedData
 */
  static init() {
    log.info('message', 'seeding Datatbase');
    return db.sequelize.sync({ force: true })
    .then(() => this.populateRoleTable()
      .then(() => this.populateUserTable()
        .then(() => this.populateDocumentTable()
          .then(() => {
            log.info('message', 'seed complete ');
          })
          .catch((err) => {
            log.error('error', err);
          }))
        .catch((err) => {
          log.error('error', err);
        }))
      .catch((err) => {
        log.error('error', err);
      }))
    .catch((err) => {
      log.error('error', err);
    });
  }
  /**
   * @desc it populates the role table
   * @static
   * @returns {promise} returns a promise
   * @memberof SeedData
   */
  static populateRoleTable() {
    const roles = [
      fakeData.adminRole, fakeData.moderatorRole, fakeData.regularRole
    ];
    return db.Roles.bulkCreate(roles);
  }
  /**
   * @desc it populates the user table
   * @static
   * @returns {promise} returns a promise
   * @memberof SeedData
   */
  static populateUserTable() {
    return db.Users.create(validAdmin)
     .then(() => db.Users.create(validRegularUser1)
       .then(() => db.Users.create(validRegularUser2)
         .then(() => db.Users.create(validRegularUser3))));
  }
  /**
   * @desc it popultes the document table
   * @static
   * @returns {promise} returns a promise
   * @memberof SeedData
   */
  static populateDocumentTable() {
    const documents = [
      fakeData.document1,
      fakeData.document2,
      fakeData.document3,
      fakeData.document4,
      fakeData.document5,
      fakeData.document6,
      fakeData.document7,
      fakeData.document8,
      fakeData.document9,
      fakeData.document10,
    ];
    return db.Documents.bulkCreate(documents);
  }
}
export default SeedData;
