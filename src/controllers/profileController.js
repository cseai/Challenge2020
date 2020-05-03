const User = require('../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const Profile = require('../model/profileModel');
// const User = require('../models/userModel');
//@router   GET api/v1/profile
//@desc     get all users
//@access   private
exports.getAllProfile = catchAsync(async (req, res) => {
	const profile = await Profile.find();
	res.status(200).json({
		success: true,
		data: profile,
	});
});

//@router   POST api/v1/profile
//@desc     CAREATE USE RPROFILE
//@access   private
exports.createProfile = catchAsync(async (req, res) => {
	// for now user id gets from params, in future it get from loged user id
	// find user exist or not
	const user = await User.findById({ _id: req.params.userId });
	if (!user) {
		return res.status(404).json({
			success: false,
			msg: 'user not found',
		});
	}
	// destructure the req
	const { firstName, lastName, type, numbers, birthday, country, place, zip } = req.body;
	const newProfile = {};
	newProfile.user = user._id;
	if (firstName) newProfile.firstName = firstName;
	if (lastName) newProfile.lastName = lastName;
	if (birthday) newProfile.birthday = birthday;
	// contact
	newProfile.contacts = [];
	const newContact = { type, numbers };
	newProfile.contacts.unshift(newContact);
	// newProfile.contacts.type = {};
	// newProfile.contacts.numbers = {};

	// if (contactstype) newProfile.contacts.type = contactstype;
	// if (numbers) newProfile.contacts.numbers = numbers;

	// newProfile.contacts.numbers = [];

	newProfile.presentAddress = {};
	if (country) newProfile.presentAddress.country = country;
	if (zip) newProfile.presentAddress.zip = zip;

	newProfile.presentAddress.place = [];
	if (place) newProfile.presentAddress.place = place;

	// create new profile
	// let profile = new Profile(newProfile);
	// await profile.save();

	res.status(200).json({
		success: true,
		data: newProfile,
	});
});
