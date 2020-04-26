const router = require('express').Router();
const userController = require('./../Controller/userController');

// router.param('id', userController.checkID);

// Example of use middleware
router.route('/latest-2').get(userController.aliasLatestUsers, userController.getAllUsers);

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
