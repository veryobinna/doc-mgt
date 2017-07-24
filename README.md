[![Coverage Status](https://coveralls.io/repos/github/andela-ookwuolisa/doc-mgt/badge.svg?branch=develop)](https://coveralls.io/github/andela-ookwuolisa/doc-mgt?branch=develop)
[![Build Status](https://travis-ci.org/andela-ookwuolisa/doc-mgt.svg?branch=develop)](https://travis-ci.org/andela-ookwuolisa/doc-mgt)
[![Code Climate](https://codeclimate.com/github/andela-ookwuolisa/doc-mgt/badges/gpa.svg)](https://codeclimate.com/github/andela-ookwuolisa/doc-mgt)
# doc-mgt

This is a full stack document management system, complete with roles and privileges. Each document defines access rights; the document defines which roles can access it. An admin only can manage other users. Each document also specifies who created it and the date it was published.

The application is available on [heroku] (https://docs-mgt.herokuapp.com/)

### Table of Contents

  - Functionalities
  - Technologies
  - API Documentation
  - Setup and Installation
  - Testing
  - How to contribute
  - Limitations
  - Faqs
  
### Functionalities

The following features are available to a user:
- Create an account and login to the app
- View public documents of other registered users
- Create document and specify the audience of the document, either public, private or role.
- Update a document created by the user
- Delete document a document created by the user
- View user's private document
- Search for a document via the document title.

In addition to the features available to the user, an admin can do the following:
- Update users profile
- Delete users account from the system
- Search for users
- View users public, private and role document
- Update any document in the system
- Delete any document in the system


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

 
#### API Documentation
The API documentation can be found [here](http://docs-mgt.herokuapp.com/docs/)

### Installation
Doc-Mgt requires 

1. [Node.js](https://nodejs.org/).
2. [Postgress](https://www.postgresql.org/download/).

To install the app, clone this repo and navigate to the directory, then create a `.env` file  in the root directory as described in the `.env-sample`. After that, install the dependencies and devDependencies, then run sequelize migrate.

```sh
$ cd doc-mgt
$ npm install
$ npm run migrate
```
- You can undo the migrations by running this command npm run `db:migrate:undo`.

To run the app, use `npm start` and open `localhost:3000` on your browser.

### Testing 
- Run Test `npm test` to run client and server side tests.
- Run e2e test with `npm run start:selenium` and on another console, run `npm run e2e` (ensure application is running).


### How to Contribute
To contribute to this project:
1. Fork the project & clone locally.
2. Create an upstream remote and sync your local copy before you branch.
3. Branch for each separate piece of work.
4. Do the work, write good commit messages, and push to your branch.
5. Make sure all the tests are passing.
5. Create a new PR in GitHub.
6. Respond to any code review feedback.

### Limitations
1. Only text document files can be created and managed with this application.
2. No Google/ Facebook/ Github login available.
3. Users have to populate the database themselves.

### FAQ
1. How can I contact the owner of this project?
- You can send in a comment on this repository


### License 
MIT