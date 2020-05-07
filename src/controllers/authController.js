const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { validationResult } = require('express-validator');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// @route    POST api/v1/users/signup
// @desc     signup  user and get token
// @access   Public
exports.signup = catchAsync(async (req, res, next) => {
	console.log('user signup '.red, req.body);

	// check validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
		});
	}

	// create users
	const newUser = await User.create(req.body);
	if (!newUser) {
		return next(new AppError('Sign up failed when creating User', 500));
	}

	const token = signToken(newUser._id);

	res.status(201).json({ token });
});

// @route    POST api/v1/users/login
// @desc     user login and get token
// @access   Public
exports.login = catchAsync(async (req, res, next) => {
	// check validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
		});
	}

	const { email, password } = req.body;
	// 2) Check if user exists && passord is correct
	const user = await User.findOne({ email }).select('+password');
	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(401).json({
			success: false,
			errors: [{ msg: 'Invalid email and password ' }],
		});
	}

	// 3) If everything ok, send token to client
	const token = signToken(user._id);
	res.status(200).json({ token });
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let token;
	if (req.headers['x-auth-token'] && req.headers) {
		token = req.headers['x-auth-token'];
	}
	if (!token) {
		// if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		// 	token = req.headers.authorization.split(' ')[1];
		// }

		return next(new AppError('You are not loged in! Please log in to get access.', 401));
	}

	// 2) Verification token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError('The user belonging to this token does no longer exist.', 401));
	}

	// 4) Check if user changed password after the token was issued
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(new AppError('User recently changed password! Please log in again.', 401));
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;
	next();
});
