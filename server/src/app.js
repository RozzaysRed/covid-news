import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import userRouter from './routes/user';
import { connectDb } from './models';

import sendTextToUsers from './twilio-text';

let Cronjob = require('cron').CronJob;

var app = express();

// Setup Mongoose
connectDb()
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

// Setup and Start Cron Job to Send Text message
var job = new Cronjob('0 8 * * *', function() {
            sendTextToUsers();
          });
job.start();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
