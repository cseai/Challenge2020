const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasLatestUsers = (req, res, next) => {
	req.query.limit = '2';
	req.query.sort = '-createdAt';
	req.query.fields = 'name,username,email';
	// console.log(req.query);
	next();
};


exports.getAllUsers = async (req, res) => {
	try {
		// EXECUTE QUERY
		const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();
		const users = await features.query;

		// SEND RESPONSE
		res.status(200).json({
			success: true,
            results: users.length,
            users: users
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json({
			success: true,
            msg: 'Get User',
            data: {
                user
            }
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};


exports.createUser = async (req, res) => {
	try {
		const newUser = await User.create(req.body);
        // console.log(req.body);
		res.status(201).json({
			success: true,
            msg: 'New User Created',
            data: {
                user: newUser
            }
        });
	} catch (err) {
		return res.status(500).json({
			status: 'fail',
			msg: 'Server Error',
			err: err,
		});
	}
};


exports.updateUser = async (req, res) => {
	try {
		// NOTE: one issue-> update will not call pre-save middleware.... should change.... i.e. changing password
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});
		res.status(200).json({
			success: true,
            msg: 'Update User',
            data: {
                user
            }
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};


exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(204).json({
			success: true,
            msg: 'Delete User',
            data: null
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			msg: 'Server Error',
			err: err,
		});
	}
};

