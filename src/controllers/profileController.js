const User = require('../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const Profile = require('../model/profileModel');
// const User = require('../models/userModel');
//@router   GET api/v1/profile
//@desc     get all users
//@access   private
exports.getAllProfile = catchAsync(async (req, res) => {
	// const profile = await Profile.find();
	user = req.user._id;
	res.status(200).json({
		success: true,
		// data: profile,
		user,
	});
});

//@router   POST api/v1/profile
//@desc     CAREATE USE RPROFILE
//@access   private
exports.createProfile = catchAsync(async (req, res) => {
	// for now user id gets from params, in future it get from loged user id
	// find user exist or not
	console.log(`${typeof JSON.stringify(req.user)}`.red);
	const id = JSON.stringify(req.user);
	const user = await User.findById(req.user);
	console.log(`${user}`.red);

	// if (!user) {
	// 	console.log(user);

	// 	return res.status(404).json({
	// 		success: false,
	// 		msg: 'user not found',
	// 	});
	// }
	// destructure the req
	// const { firstName, lastName, type, numbers, birthday, country, place, zipCode } = req.body;
	// const newProfile = {};
	// newProfile.user = req.user;
	// if (firstName) newProfile.firstName = firstName;
	// if (lastName) newProfile.lastName = lastName;
	// if (birthday) newProfile.birthday = birthday;
	// // contact
	// newProfile.contacts = [];
	// const newContact = { type, numbers };
	// newProfile.contacts.unshift(newContact);
	// //address
	// newProfile.presentAddress = {};
	// if (country) newProfile.presentAddress.country = country;
	// if (zipCode) newProfile.presentAddress.zip = zipCode;

	// newProfile.presentAddress.place = [];
	// if (place) newProfile.presentAddress.place = place;

	// // create new profile
	// let profile = new Profile(newProfile);
	// await profile.save();

	// res.status(200).json({
	// 	success: true,
	// 	data: newProfile,
	// });
});
