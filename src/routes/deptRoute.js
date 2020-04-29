const router = require('express').Router();
const deptController = require('../controllers/deptController');
const authController = require('../controllers/authController');

router.route('/')
    .get(authController.protect, deptController.getAllDepts)
    .post(authController.protect, deptController.createDept);

router.route('/:id')
    .get(authController.protect, deptController.getDept)
    .patch(authController.protect, deptController.updateDept)
    .delete(authController.protect, deptController.deleteDept);

module.exports = router;
