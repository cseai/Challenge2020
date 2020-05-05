const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/globalErrorHandle');
const testRoute = require('./routes/testRoute');
const userRoute = require('./routes/userRoute');
const deptRoute = require('./routes/deptRoute');
const memberGroupRoute = require('./routes/memberGroupRoute');
const profileRoute = require('./routes/profileRoute');

// 1) MIDDLEWARES
// morgan for log when development
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
// express json parse
app.use(express.json());

// 2) ROUTE
// test router
app.use('/api/v1/test', testRoute);
// user router
app.use('/api/v1/users', userRoute);
// profile router
app.use('/api/v1/profile', profileRoute);
// dept router
app.use('/api/v1/depts', deptRoute);
// memberGroup router
app.use('/api/v1/membergroups', memberGroupRoute);

// route protecting
// app.all('*', (req, res, next) => {
// 	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
