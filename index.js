const express = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Pokereact API',
      description: 'Pokereact API for Pokereact project',
      contact: {
        name: 'Juan Monsalve'
      },
      servers: ['http://localhost:5000']
    }
  },
  apis: [
    './routes/*.js'
  ]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
