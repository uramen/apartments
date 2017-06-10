import _ from 'lodash';
import {rgx} from './helpers/rgx.js';
import {ROOMS, PRICE} from './helpers/regexp.js';

const text = " Р-н Універсітету. Здається окрема кімната на підселення, з веселою доброю хазяйкою. Євро ремонт, нова пральна маш.автомат, новий холодильник, плазмовий телевізор, нові сучасні меблі, дві шафи купе, підігрів підлоги, гар.вода, санвузол окремий від ванної кімнати та у сучасній плиточці, 2-х контурний котел, інтернет. Ще є місце тільки для 1 дівчини студентки 1-2 курсу, або працюючу дівчину до 20 років, одна щаслива дівчина вже проживає в кімнаті. 1500грн, вже разом з ком.послугами-з одієї людини. Показуємо терміново ☎ 0951785834";

console.log(_.toInteger(rgx(PRICE).exec(text, 0).res.match(/^\d+|\d+\b|\d+(?=\w)/g)));


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
// schedule.scheduleJob('*/1 * * * *', () => {
  grabber.start();
// });


export default app;
