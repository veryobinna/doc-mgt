import log from 'npmlog';
import fakeData from './FakeData';
import db from '../../models';

const adminUser = fakeData.adminUser,
  firstRegularUser = fakeData.firstRegularUser,
  secondRegularUser = fakeData.secondRegularUser,
  thirdRegularUser = fakeData.thirdRegularUser;
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
    return db.Users.create(adminUser)
     .then(() => db.Users.create(firstRegularUser)
       .then(() => db.Users.create(secondRegularUser)
         .then(() => db.Users.create(thirdRegularUser))));
  }
  /**
   * @desc it popultes the document table
   * @static
   * @returns {promise} returns a promise
   * @memberof SeedData
   */
  static populateDocumentTable() {
    const documents = [
      fakeData.firstDocument,
      fakeData.secondDocument,
      fakeData.thirdDocument,
      fakeData.fourthDocument,
      fakeData.fifthDocument,
      fakeData.sixthDocument,
      fakeData.seventhDocument,
      fakeData.eightDocument,
      fakeData.ninthDocument,
      fakeData.tenthDocument,
    ];
    return db.Documents.bulkCreate(documents);
  }
}
export default SeedData;
