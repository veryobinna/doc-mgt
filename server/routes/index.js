import usersController from '../controllers/usersController';
import documentsController from '../controllers/documentsController'
import rolesController from '../controllers/rolesController'


const Routes = (app) => {
  app.get('/test', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/users', usersController.create);
  app.get('/users', usersController.list);
  app.get('/users/:id', usersController.search);
  app.put('/users/:id', usersController.update);
  app.delete('/users/:id', usersController.destroy);

  app.post('/documents', documentsController.create);
  app.get('/documents', documentsController.list);
  app.get('/documents/:id', documentsController.search);
  app.put('/documents/:id', documentsController.update);
  app.delete('/documents/:id', documentsController.destroy);

  app.post('/roles', rolesController.create);
  app.get('/roles', rolesController.list);
  app.get('/roles/:id', rolesController.search);
  app.put('/roles/:id', rolesController.update);
  app.delete('/roles/:id', rolesController.destroy);





};
export default Routes;