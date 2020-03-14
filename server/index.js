const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {PORT} = require('./constants');
const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const {queryType} = require('./query.js');

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());


app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

const schema = new GraphQLSchema({ query: queryType });

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));


const moviesController = require('./movies');
app.use('/movies', moviesController);

app.listen(PORT,()=>{
  console.log(`Running on port ${PORT}`);
});
