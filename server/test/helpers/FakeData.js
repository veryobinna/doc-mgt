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

  validAdmin: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 1,
  },
  validRegularUser1: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 3,
  },
  validRegularUser2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 3,
  },
  validRegularUser3: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 3,
  },
  validRegularUser4: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 3,
  },
  validRegularUser5: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleID: 2,
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
    roleID: 1,
  },
  document2: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 3,
    roleID: 1,
  },
  document3: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 1,
    roleID: 1,
  },
  document4: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 2,
    roleID: 3
  },
  document5: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 2,
    roleID: 3,
  },
  document6: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'public',
    ownerID: 2,
    roleID: 3
  },
  document7: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 3,
    roleID: 3
  },
  document8: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'role',
    ownerID: 4,
    roleID: 3
  },
  document9: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    access: 'private',
    ownerID: 2,
    roleID: 3,
  },
  document10: {
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
