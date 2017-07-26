import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import route from './server/routes/index';
import db from './server/models/';
import swagger from './server/routes/swagger';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './client/public/')));

swagger(app);
route(app);
app.use('/docs', express.static(path.join(__dirname, './server/swagger/')));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to doc-mgt',
}));

if (process.env.NODE_ENV === 'test') {
  app.listen(port, () => {
  });
} else {
  db.sequelize.sync().done(() => {
    app.listen(port, () => {
    });
  });
}


export default app;

