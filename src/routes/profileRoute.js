const router = require('express').Router();
const { check } = require('express-validator');
const { getAllProfile, createProfile } = require('./../controllers/profileController');
const { protect } = require('./../controllers/authController');

router.get('/', protect, getAllProfile).post(
	'/:userId',
	// [
	// 	check('firstName', 'first name cant empty').not().empty(),
	// 	check('lastName', 'Last Name cant be empyt').not().empty(),
	// 	check('type', 'need a contact type').not().empty(),
	// 	check('number', 'enter contact information').not().empty(),
	// 	check('country', 'enter your country').not().empty(),
	// 	check('place', 'enter your place').not().empty(),
	// 	check('number', 'enter contact information').not().empty(),
	// ],
	protect,
	createProfile
);

module.exports = router;
