const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = async (req, res, next) => {
    try{
        const newUser = await User.create(req.body);

        const token = signToken(newUser._id);

        res.status(201).json({
			success: true,
            msg: 'New User Created',
            token,
            user: newUser
        });
	} catch (err) {
		return res.status(500).json({
			status: 'fail',
			msg: 'Server Error',
			err: err,
		});
	}
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if(!email || !password){
            // Note: need to fixed
            return next(new Error('Please provide email and password', 400));
        }
        
        // 2) Check if user exists && passord is correct
        const user = await User.findOne({ email }).select('+password');
        if( !user || !(await user.correctPassword(password, user.password))){
            // Note: need to fixed
            return next(new Error('Incorrect email and password', 401));
        }


        // 3) If everything ok, send token to client
        const token = signToken(user._id);
        res.status(200).json({
			success: true,
            msg: 'User Loged In',
            token
        });

    } catch (err) {
		return res.status(500).json({
			status: 'fail',
			msg: 'Server Error',
			err: err,
		});
	}
};

exports.protect = async (req, res, next) => {
    try{
        // 1) Getting token and check of it's there
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return next(new Error('You are not loged in! Please log in to get access.', 401));
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const freshUser = await User.findById(decoded.id);
        if(!freshUser){
            return next(new Error('The user belonging to this token does no longer exist.', 401));
        }

        // 4) Check if user changed password after the token was issued
        if(freshUser.changedPasswordAfter(decoded.iat)){
            return next(new Error('User recently changed password! Please log in again.', 401));
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = freshUser;
        next();
    } catch(err){
        return res.status(500).json({
			status: 'fail',
			msg: 'Server Error',
			err: err,
		});
    };
    
};

