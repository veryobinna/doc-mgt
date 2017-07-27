import express from 'express';
import logger from 'morgan';
import log from 'npmlog';
import bodyParser from 'body-parser';
import path from 'path';
import route from './server/routes/index';
import db from './server/models/';
import swagger from './server/routes/swagger';

require('dotenv').config();

// Set up the express app
const app = express();
const port = process.env.PORT || 3000;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// load the client side
app.use(express.static(path.join(__dirname, './client/public/')));

// Require our routes into the application.
swagger(app);
route(app);
app.use('/docs', express.static(path.join(__dirname, './server/swagger/')));

// Setup a default catch-all route that sends back a welcome message in JSON.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to doc-mgt',
}));

if (process.env.NODE_ENV === 'test') {
  app.listen(port, () => {
    log.info(`Express is up on port ${port}`);
  });
} else {
  db.sequelize.sync().done(() => {
    app.listen(port, () => {
      log.info(`Express is up on port ${port}`);
    });
  });
}


export default app;

