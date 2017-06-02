import usersController from '../controllers/usersController';

const Routes = (app) => {
  app.get('/test', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/users', usersController.create);
  app.get('/users', usersController.list);
  app.get('/users/:id', usersController.search);
  app.put('/users/:id', usersController.update);
  app.delete('/users/:id', usersController.destroy);

};
export default Routes;