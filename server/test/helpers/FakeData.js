import faker from 'faker';

const fakeData = {
  invalidEmailUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: 'wrong data',
    password: faker.internet.password(),
    roleID: 3,
  },
  invalidPasswordUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: '',
    roleID: 3,
  },

  adminUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 1,
  },
  firstRegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 3,
  },
  secondRegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 3,
  },
  thirdRegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 3,
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
  firstDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'public',
    ownerID: 1,
    roleID: 1,
  },
  secondDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 3,
    roleID: 1,
  },
  thirdDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 1,
    roleID: 1,
  },
  fourthDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 2,
    roleID: 3
  },
  fifthDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 2,
    roleID: 3,
  },
  sixthDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 4,
    roleID: 3
  },
  seventhDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'public',
    ownerID: 2,
    roleID: 3
  },
  eightDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 3,
    roleID: 3
  },
  ninthDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 2,
    roleID: 3,
  },
  tenthDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'public',
    ownerID: 2,
    roleID: 3
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
    name: '!nv @l!d'
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
