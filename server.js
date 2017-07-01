import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import route from './server/routes/index';
import db from './server/models/';

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
route(app);
// Setup a default catch-all route that sends back a welcome message in JSON.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to doc-mgt',
}));

app.listen(port, () => {
  console.log(`Express is up on port ${port}`);
});
export default app;

// db.sequelize.sync().done(() => {
//   app.listen(port, () => {
//     console.log(`Express is up on port ${port}`);
//   });
// });