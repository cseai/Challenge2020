const express = require('express');
const app = express();
const morgan = require('morgan');
const color = require('colors');
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });

const ConnectDB = require('./config/db');
ConnectDB();
const testRoute = require('./routes/testRoute');

// morgan for log
app.use(morgan('dev'));
// express json parse
app.use(express.json());

// test router
app.use('/api/v1/test', testRoute);

// server running
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV} mode`.green.inverse);
});
