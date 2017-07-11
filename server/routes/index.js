import usersController from '../controllers/usersController';
import documentsController from '../controllers/documentsController';
import rolesController from '../controllers/rolesController';
import authenticate from '../middleware/Aunthenticate';


const Routes = (app) => {
  /**
   * @swagger
   * definition:
   *   Users:
   *     type: object
   *     required:
   *       - firstname
   *       - lastname
   *       - email
   *       - username
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
   *       username:
   *         type: string
   *
   */

  /**
 * @swagger
 * /Users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new User
 *     summary: create new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: User Created
 */
  app.post('/users', usersController.create);
    /**
 * @swagger
 * /Users:
 *   get:
 *     tags:
 *       - Users
 *     description: Fetches all users
 *     summary: get users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All Users
 *       schema:
 *           $ref: '#/definitions/Users'
 */
  app.get('/users', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.list);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a User
 *     summary: Returns User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A User
 *         schema:
 *           $ref: '#/definitions/Users'
 */
  app.get('/users/:id', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.find);
/**
 * @swagger
 * /search/users/?q={query}:
 *   get:
 *     tags:
 *       - Search
 *     description: Returns Users that match the search query
 *     summary: Search Users
 *     parameters:
 *       - name: q
 *         type: string
 *         description: search query
 *         in: path
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Search result
 *         schema:
 *           $ref: '#/definitions/Users'
 */
  app.get('/search/users/', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.search);
  /**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a User
 *     summary: update User
 *     produces: application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         type: object
 *         in: path
 *         required: true
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: Successfully updated
 *
 */
  app.put('/users/:id', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a  User
 *     summary: Delete User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses: 204
 */
  app.delete('/users/:id', authenticate.verifyToken,
  authenticate.verifyAdmin, usersController.destroy);
  /**
     * @swagger
     * definition:
     *   Login:
     *     type: object
     *     required:
     *       - loginID
     *       - password
     *     properties:
     *       password:
     *         type: string
     *         format: password
     *       loginID:
     *         type: string
     *         format: text
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
     *       - name: user
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Login'
     *     responses:
     *       200:
     *         description: Login Successfully
     *         schema:
     *           $ref: '#/definitions/Users'
     */
  app.post('/login', usersController.login);
  /**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - Users
 *     description: Logs a user out
 *     summary: Logs out a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: logout Successful
 *         schema:
 *           $ref: '#/definitions/Users'
 */
  app.post('/logout', usersController.logout);
/**
 * @swagger
 * definition:
 *   Documents:
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       access:
 *         type: string
 *       roleId:
 *         type: integer
 *       ownerId:
 *         type: integer
 */

/**
 * @swagger
 * /documents:
 *   post:
 *     tags:
 *       - Documents
 *     description: Creates a new document
 *     summary: Create document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: document
 *         description: documents object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Documents'
 *     responses:
 *       200:
 *         description: Successfully created
 */
  app.post('/documents',
  authenticate.verifyToken, documentsController.create);
/**
 * @swagger
 * /documents:
 *   get:
 *     tags:
 *       - Documents
 *     description: Fetches all documents
 *     summary: get documents
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all documents
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
  app.get('/documents',
  authenticate.verifyToken, documentsController.list);
  /**
 * @swagger
 * /documents:
 *   get:
 *     tags:
 *       - Documents
 *     description: Fetches a document
 *     summary: gets document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Document id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: one document
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
  app.get('/documents/:id',
  authenticate.verifyToken, documentsController.find);
/**
 * @swagger
 * /documents/:id:
 *   get:
 *     tags:
 *       - Documents
 *     description: Fetches all user's documents
 *     summary: user's documents
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Document id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: all user's documents
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
  app.get('/users/:id/documents/',
  authenticate.verifyToken, documentsController.listUsersDocuments);
/**
 * @swagger
 * /search/documents/?q={query}:
 *   get:
 *     tags:
 *       - Search
 *     description: Returns documents that match the search query
 *     summary: Search documents
 *     parameters:
 *       - name: q
 *         type: string
 *         description: search query
 *         in: path
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Search result
 *         schema:
 *           $ref: '#/definitions/Documents'
 */
  app.get('/search/documents/',
  authenticate.verifyToken, documentsController.search);
  /**
 * @swagger
 * /documents/{id}:
 *   put:
 *     tags:
 *       - Documents
 *     description: Updates a document
 *     summary: update document
 *     produces: application/json
 *     parameters:
 *       - name: document
 *         description: document object
 *         type: object
 *         in: path
 *         required: true
 *       - name: id
 *         description: Document id
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Documents'
 *     responses:
 *       200:
 *         description: Successfully updated
 *
 */
  app.put('/documents/:id',
  authenticate.verifyToken, documentsController.update);
/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     tags:
 *       - Documents
 *     description: Deletes a  User
 *     summary: Delete User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: integer
 *     responses: 204
 */
  app.delete('/documents/:id',
  authenticate.verifyToken, documentsController.destroy);

/**
 * @swagger
 * definition:
 *   Roles:
 *     properties:
 *       name:
 *         type: string
 *
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     tags:
 *       - Roles
 *     description: Creates a new role
 *     summary: Create role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: role
 *         description: role object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Roles'
 *     responses:
 *       200:
 *         description: Successfully created
 */
  app.post('/roles',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.create);
  /**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Roles
 *     description: Fetches all roles
 *     summary: get roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all roles
 *         schema:
 *           $ref: '#/definitions/Roles'
 */
  app.get('/roles',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.list);
 /*
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Roles
 *     description: Fetches a role
 *     summary: gets role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: role id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: one role
 *         schema:
 *           $ref: '#/definitions/Roles'
 */
  app.get('/roles/:id',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.search);
    /**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     description: Updates a document
 *     summary: update document
 *     produces: application/json
 *     parameters:
 *       - name: document
 *         description: document object
 *         type: object
 *         in: body
 *         required: true
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Roles'
 *     responses:
 *       200:
 *         description: Successfully updated
 *
 */
  app.put('/roles/:id',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.update);
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags:
 *       - Roles
 *     description: Deletes a  Role
 *     summary: Delete Role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Role id
 *         in: path
 *         required: true
 *         type: integer
 *     responses: 204
 */
  app.delete('/roles/:id',
  authenticate.verifyToken, authenticate.verifyAdmin, rolesController.destroy);
};
export default Routes;
