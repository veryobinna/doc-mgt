import usersController from '../controllers/usersController';
import documentsController from '../controllers/documentsController'

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





};
export default Routes;