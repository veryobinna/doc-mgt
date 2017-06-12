import usersController from '../controllers/usersController';
import documentsController from '../controllers/documentsController';
import rolesController from '../controllers/rolesController';
import authenticate from '../middleware/Aunthenticate';


const Routes = (app) => {
  app.get('/test', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/users', usersController.create);
  app.get('/users', authenticate.verifyToken, usersController.list);
  app.get('/users/:id', authenticate.verifyToken, usersController.find);
  app.get('/search/users/', authenticate.verifyToken, usersController.search);
  app.put('/users/:id', usersController.update);
  app.delete('/users/:id', authenticate.verifyToken, usersController.destroy);

  app.post('/login', usersController.login);
  app.post('/logout', usersController.logout);


  app.post('/documents',
  authenticate.verifyToken, documentsController.create);
  app.get('/documents',
  authenticate.verifyToken, documentsController.list);
  app.get('/documents/:id',
  authenticate.verifyToken, documentsController.find);
  app.get('/search/documents/',
  authenticate.verifyToken, documentsController.search);
  app.put('/documents/:id',
  authenticate.verifyToken, documentsController.update);
  app.delete('/documents/:id',
  authenticate.verifyToken, documentsController.destroy);

  app.post('/roles',
  authenticate.verifyToken, rolesController.create);
  app.get('/roles',
  authenticate.verifyToken, rolesController.list);
  app.get('/roles/:id',
  authenticate.verifyToken, rolesController.search);
  app.put('/roles/:id',
  authenticate.verifyToken, rolesController.update);
  app.delete('/roles/:id',
  rolesController.destroy);
};
export default Routes;
