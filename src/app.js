const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/globalErrorHandle');
const testRoute = require('./routes/testRoute');
const userRoute = require('./routes/userRoute');
const deptRoute = require('./routes/deptRoute');
const memberGroupRoute = require('./routes/memberGroupRoute');
const hubTreeRoute = require('./routes/hubTreeRoute');
const profileRoute = require('./routes/profileRoute');
const libraryRoute = require('./routes/libraryRoute');
const authorRoute = require('./routes/authorRoute');

// 1) MIDDLEWARES
app.use(cors());
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
// hubTree router
app.use('/api/v1/hubtrees', hubTreeRoute);
// library router
app.use('/api/v1/libraries', libraryRoute);
// author router
app.use('/api/v1/authors', authorRoute);

// route protecting
// app.all('*', (req, res, next) => {
// 	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// for the heroku
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.use(globalErrorHandler);

module.exports = app;
