const User = require('../model/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.aliasLatestUsers = (req, res, next) => {
	req.query.limit = '2';
	req.query.sort = '-createdAt';
	req.query.fields = 'name,username,email';
	// console.log(req.query);
	next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
	// EXECUTE QUERY
	const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();
	const users = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: users.length,
		users: users,
	});
});

// @route    GET api/v1/users/currentUser
// @desc     load current user
// @access   Private

exports.getUser = catchAsync(async (req, res, next) => {
	console.log('error from get current user');
	const user = await User.findById(req.user).select('-_id -createdAt -__v');
	if (!user) {
		return next(new AppError(`User doesn't exists!`, 404));
	}
	res.status(200).json(user);
});

exports.createUser = catchAsync(async (req, res, next) => {
	const newUser = await User.create(req.body);
	if (!newUser) {
		return next(new AppError(`User creation failed!`));
	}

	// console.log(req.body);
	res.status(201).json({
		success: true,
		msg: 'New User Created',
		data: {
			user: newUser,
		},
	});
});

exports.updateUser = catchAsync(async (req, res, next) => {
	// NOTE: one issue-> update will not call pre-save middleware.... should change.... i.e. changing password
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	if (!user) {
		return next(new AppError(`User update failed!`, 404));
	}

	res.status(200).json({
		success: true,
		msg: 'Update User',
		data: {
			user,
		},
	});
});

exports.deleteUser = catchAsync(async (req, res, next) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(204).json({
		success: true,
		msg: 'User Deleted',
		data: null,
	});
});
