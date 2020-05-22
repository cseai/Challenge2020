const mongoose = require('mongoose');
const color = require('colors');

const ConnectDB = async () => {
	try {
		// if use local database
		// const DB = process.env.LOCAL_DB.replace('<db_name>', process.env.DB_NAME);
		// if use global database
		const DB = process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD);
		const conn = await mongoose.connect(DB, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log(`Database connected  ${conn.connection.host}:${conn.connection.port}`.red.inverse);
	} catch (err) {
		console.log(`database error `, err);
	}
};

module.exports = ConnectDB;
