import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import grabber from './grabber';
import winston from 'winston';
import schedule from 'node-schedule';

import {apolloExpress, graphiqlExpress} from 'apollo-server';
import {makeExecutableSchema} from 'graphql-tools';

import {server, database} from './config';
import {getTokenFromRequest} from './utils/auth';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

//# Set up db connection
mongoose.Promise = global.Promise;
mongoose.connect(database.uri);
const db = mongoose.connection;

// If connection with db failing, invokes exception
db.on('error', () => {
  const err = new Error('unable to connect to database: ' + database);
  winston.error(winston.exception.getAllInfo(err));
});

// If everything is fine
db.once('open', () => console.log('We are connected to Mongolab DB!'));


const app = express();

// Schema for graphql
const schema = makeExecutableSchema({ typeDefs, resolvers });

// CORS
const corsOptions = { origin: server.refer };

//# Middlewares
app.use(cors(corsOptions));

app.use('/graphql', bodyParser.json(), apolloExpress(request => ({
  schema,
  context: { token: getTokenFromRequest(request) }
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start server
app.listen(server.port, () => console.log(`Now browse to ${server.host}:${server.port}/graphiql`));

// Set up logging
winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.remove(winston.transports.Console);

// Running script every one hour
schedule.scheduleJob('*/1 * * * *', () => {
  grabber.start();
});


export default app;
