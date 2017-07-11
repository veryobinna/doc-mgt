import swaggerJSDoc from 'swagger-jsdoc';

  // swagger definition
const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'Document Management System API',
    version: '1.0.0',
    description: 'API documentation to create, manage and edit documents',
  },
  host: process.env.BASE_URL,
  basePath: '/'
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [
    './server/routes/index.js'
  ],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const swagger = (router) => {
  console.log(swaggerDefinition.host, 'ooasf')
  router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};


export default swagger;
