const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	// const value = err.errmsg.match(/(["'](\\?.)*?\1)/);
	console.log(err);
	let message;
	const msg = err.errmsg
		.substring(err.errmsg.indexOf('{') + 2, err.errmsg.indexOf('}') - 1)
		.replace(/(\")|(\:)|(\\)/gi, '')
		.split(' ');

	if (msg[0] === 'username') {
		message = `user name : ${msg[1]} exist,try another`;
	}
	if (msg[0] === 'email') {
		message = `email : ${msg[1]} exist,try another`;
	}
	// const message = msg[0];
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const error = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${error.join('. ')}`;
	return new AppError(message, 400);
};

const handleJWTError = (err) => {
	new AppError('Invalid token! try again to login.', 401);
};

const tokenExpire = (err) => {
	new AppError('Your jwt token is expire try login agian', 401);
};

const sendErrorProd = (err, res) => {
	// Operational,trusted error : send message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			success: false,
			status: err.status,
			error: err,
			// message: err.message,
			errors: [
				{
					msg: err.message,
				},
			],
		});
	} else {
		/// programming or others error we didnt sent the client
		// 1) log error
		// console.log('error ', err);
		// 2)send generate message to client
		res.status(500).json({
			status: 'error',
			error: err,
			message: 'Something went very wrong ',
		});
	}
};

// error handler for dev mode
const errorDev = (err, res) => {
	console.log(err.stack);
	return res.status(err.statusCode).json({
		success: false,
		status: err.status,
		message: err.message,
		err,
		stack: err.stack,
	});
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Server Error';

	if (process.env.NODE_ENV === 'development') {
		errorDev(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		if (error.name === 'CastError') {
			console.log('eror from the production casterror '.red);
			error = handleCastErrorDB(error);
		}
		if (error.code === 11000) {
			console.log('eror from the production 11000 '.red);
			error = handleDuplicateFieldsDB(error);
		}
		if (error.name === 'ValidationError') {
			console.log('eror from the production validation Error '.red);
			error = handleValidationErrorDB(error);
		}
		if (error.name === 'JsonWebTokenError') {
			console.log('eror from the production jsonweb token error '.red);

			error = handleJWTError(error);
		}
		if (error.name === 'tokenExpireError') {
			console.log('eror from the production jsonweb token expire error '.red);
			error = tokenExpire(error);
		}
		// console.log(error);
		sendErrorProd(error, res);
	}
};

/*
-->status Code
-->status fail /server error
-->msg
*/
/*
    "status": "Serrver Error",
    "message": "E11000 duplicate key error collection: edukos.users index: username_1 dup key: { username: \"rajib\" }",
    "err": {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "username": 1
        },
        "keyValue": {
            "username": "rajib"
        },
        "errmsg": "E11000 duplicate key error collection: edukos.users index: username_1 dup key: { username: \"rajib\" }",
        "statusCode": 500,
        "status": "Serrver Error"
    },
*/
/*
"errors": [
        {
            "value": "raj@gmailcom",
            "msg": "please enter a valid email",
            "param": "email",
            "location": "body"
        }
    ]
*/
/* 
Validation Error : 

*/
