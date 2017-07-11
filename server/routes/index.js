import usersController from '../controllers/usersController';
import documentsController from '../controllers/documentsController';
import rolesController from '../controllers/rolesController';
import authenticate from '../middleware/Aunthenticate';


const Routes = (app) => {
  /**
   * @swagger
   * definition:
   *   NewUser:
   *     type: object
   *     required:
   *       - firstname
   *       - lastname
   *       - email
   *       - password
   *     properties:
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       password:
   *         type: string
   *         format: password
   *       email:
   *         type: string
   *   User:
   *     type: object
   *     required:
   *       - firstname
   *       - lastname
   *       - email
   *       - password
   *     properties:
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       roleId:
   *         type: integer
   *       email:
   *         type: string
   *       userId:
   *         type: integer
   *       createdAt:
   *         type: string
   *         format: date
   *       activeToken:
   *          type: string
   *   SafeUser:
   *     type: object
   *     required:
   *       - firstname
   *       - lastname
   *       - email
   *       - password
   *     properties:
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       roleId:
   *         type: integer
   *       email:
   *         type: string
   *       userId:
   *         type: integer
   *       createdAt:
   *         type: string
   *         format: date
   */
  app.post('/users', usersController.create);
  app.get('/users', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.list);
  app.get('/users/:id', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.find);
  app.get('/search/users/', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.search);
  app.put('/users/:id', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.update);
  app.delete('/users/:id', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.destroy);
  /**
     * @swagger
     * definition:
     *   Login:
     *     type: object
     *     required:
     *       - email
     *       - password
     *     properties:
     *       password:
     *         type: string
     *         format: password
     *       email:
     *         type: string
     *         format: email
     */

    /**
     * @swagger
     * /login:
     *   post:
     *     description: Signs in a user
     *     tags:
     *      - Signs in a user
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Login'
     *     responses:
     *       200:
     *         description: Jwt access token
     *         schema:
     *           $ref: '#/definitions/User'
     */
  app.post('/login', usersController.login);
  app.post('/logout', usersController.logout);

  app.post('/documents',
  authenticate.verifyToken, documentsController.create);
  app.get('/documents',
  authenticate.verifyToken, documentsController.list);
  app.get('/documents/:id',
  authenticate.verifyToken, documentsController.find);
  app.get('/users/:id/documents/',
  authenticate.verifyToken, documentsController.listUsersDocuments);
  app.get('/search/documents/',
  authenticate.verifyToken, documentsController.search);
  app.put('/documents/:id',
  authenticate.verifyToken, documentsController.update);
  app.delete('/documents/:id',
  authenticate.verifyToken, documentsController.destroy);

  app.post('/roles',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.create);
  app.get('/roles',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.list);
  app.get('/roles/:id',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.search);
  app.put('/roles/:id',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.update);
  app.delete('/roles/:id',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.destroy);
};
export default Routes;
