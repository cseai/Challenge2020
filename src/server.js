const app = require('./app');
const color = require('colors');
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });

const ConnectDB = require('./config/db');
ConnectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV} mode`.green.inverse);
});
