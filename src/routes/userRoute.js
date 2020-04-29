const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Example of use middleware
router.route('/latest-2').get(userController.aliasLatestUsers, userController.getAllUsers);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/')
    .get(authController.protect, userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
