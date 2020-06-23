const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { check } = require('express-validator');

// Example of use middleware
router.route('/latest-2').get(userController.aliasLatestUsers, userController.getAllUsers);

router.post(
	'/signup',
	[
		check('email', 'please enter a valid email').isEmail(),
		check('username', 'please can not be empty').not().isEmpty(),
		check('password', 'password length more than 6').isLength({ min: 6 }),
	],
	authController.signup
);
router.post(
	'/login',
	[check('email', 'please enter a valid email').isEmail(), check('password', 'password Required').not().isEmpty()],
	authController.login
);

router.route('/').get(authController.protect, userController.getAllUsers).post(userController.createUser);

router.route('/:id').patch(userController.updateUser).delete(userController.deleteUser);
router.route('/currentUser').get(authController.protect, userController.getUser);
module.exports = router;
