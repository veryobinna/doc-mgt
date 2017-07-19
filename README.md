[![Coverage Status](https://coveralls.io/repos/github/andela-ookwuolisa/doc-mgt/badge.svg?branch=develop)](https://coveralls.io/github/andela-ookwuolisa/doc-mgt?branch=develop)
[![Build Status](https://travis-ci.org/andela-ookwuolisa/doc-mgt.svg?branch=develop)](https://travis-ci.org/andela-ookwuolisa/doc-mgt)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
# doc-mgt

This is a full stack document management system, complete with roles and privileges. Each document defines access rights; the document defines which roles can access it. An admin only can manage other users. Each document also specifies who created it and the date it was published.

The application is available on Heroku [https://docs-mgt.herokuapp.com/] 

### Table of Contents

  - Functionalities
  - Technologies
  - Setup and Installation
  - How to contribute
  - Limitations
  - Faqs
  
### Functionalities

Documents
- Create documents
- Update document
- Delete document
- Search for documents

### Technologies 
The technologies used are:

* [React js](https://facebook.github.io/react/) - HTML enhanced for web apps!
* [node.js] - evented I/O for the backend
* [PostgresDatabase(ORM)](https://www.postgresql.org/)- PostgreSQL is a powerful, open source object-relational database system. 
* [Sequelize](http://docs.sequelizejs.com/) - great UI boilerplate for modern web apps
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Webpack](https://webpack.js.org/) - webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser
* [Materialize Css](http://breakdance.io) - Materialize is a UI component library created with CSS, JavaScript, and HTML.
* [Babel](https://babeljs.io/) -The compiler for writing next generation JavaScript.



Users
- Create users
- Update users
- Delete users
- Search for users

Role
- Create roles( Admin and moderator and regular users)
 
#### EndPoints
The endpoints can be found here:
[http://docs-mgt.herokuapp.com/docs/]

### Installation
Doc-Mgt requires [Node.js](https://nodejs.org/) to run.

Before you run the app, install postgress on the local machine and populate the data.
To run the app locally, install the dependencies and devDependencies, run sequelize migrate, build a webpack bundle and start the server.

```sh
$ cd doc-mgt
$ npm install
$ npm run migrate
$ npm run build
$ npm start

```
### How to Contribute
To contribute to this project:
1. Fork the project & clone locally
2. Create an upstream remote and sync your local copy before you branch
3. Branch for each separate piece of work.
4. Do the work, write good commit messages, and read the CONTRIBUTING file if there is one.
5. Push to your origin repository
6. Create a new PR in GitHub.
7. Respond to any code review feedback

### Limitations
1. Only text document files can be created and managed with this application.
2. No Google/ Facebook/ Github login available.
3. Users have to populate the database themselves.

### FAQ
1. How can i contact the owner of this project?
- You can send in a comment on this repository
2. How can i contribute to this project?
    To contribute to this project:
    1. Fork the project & clone locally
    2. Create an upstream remote and sync your local copy before you branch
    3. Branch for each separate piece of work.
    4. Do the work, write good commit messages, and read the CONTRIBUTING file if there is one.
    5. Push to your origin repository
    6. Create a new PR in GitHub.
    7. Respond to any code review feedback