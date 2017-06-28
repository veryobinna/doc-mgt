import faker from 'faker';

const fakeData = {
  invalidEmailUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: 'wrong data',
    password: faker.internet.password(),
    roleID: 1,
  },
  invalidPasswordUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: '',
    roleID: 1,
  },

  validAdmin: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 3,
  },
  validRegularUser1: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 1,
  },
  validRegularUser2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 1,
  },
  validRegularUser3: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 1,
  },
  validRegularUser4: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 1,
  },
  validRegularUser5: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 1,
  },
  emtptyTitleDocument: {
    title: '',
    content: faker.lorem.paragraphs(),
    access: 'public',
  },
  emtptyContentDocument: {
    title: faker.lorem.word(),
    content: '',
    access: 'public',
  },
  invalidRoleDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'random',
  },
  document1: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'public',
    ownerID: 1,
    roleID: 3,
  },
  document2: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 1,
    roleID: 3,
  },
  document3: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 1,
    roleID: 3,
  },
  document4: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 2,
    roleID: 1
  },
  document5: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 2,
    roleID: 1,
  },
  document6: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'public',
    ownerID: 2,
    roleID: 1
  },
  document7: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 3,
    roleID: 1
  },
  document8: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 4,
    roleID: 1
  },
  document9: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 2,
    roleID: 1,
  },
  document10: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'public',
    ownerID: 2,
    roleID: 1
  },
  adminRole: {
    name: 'admin'
  },
  moderatorRole: {
    name: 'moderator'
  },
  regularRole: {
    name: 'regular'
  },
  invalidRole: {
    name: 'random'
  },
  emptyRole: {
    name: ''
  },
  generateRandomUser(roleID) {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.name.firstName(),
      email: faker.internet.email(),
      roleID,
      password: faker.internet.password()
    };
  },
  generateRandomRole(roleName) {
    return {
      name: roleName
    };
  },
  generateRandomDocument(access) {
    return {
      title: faker.lorem.word(),
      content: faker.lorem.paragraphs(),
      access,
    };
  },
};
export default fakeData;
