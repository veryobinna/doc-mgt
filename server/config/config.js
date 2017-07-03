require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: 'postgres'
    // "username": "obinna",
    // "password": null,
    // "database": "doc-mgt-db",
    // "host": "127.0.0.1",
    // "port": 5432,
    // "dialect": "postgres"
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
    logging: false
    // "username": "obinna",
    // "password": null,
    // "database": "doc-mgt-test",
    // "host": "127.0.0.1",
    // "dialect": "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
    // "username": "obinna",
    // "password": null,
    // "database": "doc-mgt",
    // "host": "127.0.0.1",
    // "dialect": "postgres"
  }
};

