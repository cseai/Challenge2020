const User = require('../models/userModel');
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
		users: users
	});
});

exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if(!user){
		return next(new AppError(`User doesn't exists!`, 404));
	}
	res.status(200).json({
		success: true,
		msg: 'Get User',
		data: {
			user
		}
	});
});


exports.createUser =catchAsync(async (req, res, next) => {
	const newUser = await User.create(req.body);
	if(!newUser){
		return next(new AppError(`User creation failed!`));
	}

	// console.log(req.body);
	res.status(201).json({
		success: true,
		msg: 'New User Created',
		data: {
			user: newUser
		}
	});
});


exports.updateUser = catchAsync(async (req, res) => {
	// NOTE: one issue-> update will not call pre-save middleware.... should change.... i.e. changing password
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	if(!user){
		return next(new AppError(`User update failed!`, 404));
	}

	res.status(200).json({
		success: true,
		msg: 'Update User',
		data: {
			user
		}
	});
});


exports.deleteUser = catchAsync(async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(204).json({
		success: true,
		msg: 'User Deleted',
		data: null
	});
});