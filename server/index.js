const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {PORT} = require('./constants');

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

const moviesController = require('./movies');
app.use('/movies', moviesController);

app.listen(PORT,()=>{
  console.log(`Running on port ${PORT}`);
});
