const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Ekart Backend',
    description: 'Ekart Documentation '
  },
  host: 'localhost:45000',
  
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  }
};

const outputFile = '../swagger-output.json';
const routes = ['../app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);