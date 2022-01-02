const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

const artistRouter = require('./routes/artist');
const albumRouter = require('../src/routes/album');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(artistRouter);
app.use(albumRouter);

app.get('/', (request, response) => {
  response.status(200).send('Hello World');
});

module.exports = app;
