const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
import grabber from './grabber';
const winston  = require('winston');
const schedule = require('node-schedule');

const { apolloExpress, graphiqlExpress } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const { server, database } = require('./config');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { getTokenFromRequest } = require('./utils/auth');

mongoose.Promise = global.Promise;
mongoose.connect(database.uri);
const db = mongoose.connection;

db.on('error', () => {
  const err = new Error('unable to connect to database: ' + config.db);
  winston.error(winston.exception.getAllInfo(err));
});

db.once('open', () => console.log('We are connected to Mongolab DB!'));

const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });
var corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));

app.use('/graphql', bodyParser.json(), apolloExpress(request => ({
  schema,
  context: { token: getTokenFromRequest(request) }
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(server.port, () => console.log(`Now browse to ${server.host}:${server.port}/graphiql`));

// Set up logging
winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.remove(winston.transports.Console);

// Running script every one hour
schedule.scheduleJob('*/60 * * * *', () => {
  grabber.start();
});


module.exports = app;
