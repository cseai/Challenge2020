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
		check('username', 'please can not be empty').exists(),
		check('password', 'password Required').exists(),
	],
	authController.signup
);
router.post(
	'/login',
	[check('email', 'please enter a valid email').isEmail(), check('password', 'password Required').exists()],
	authController.login
);

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
