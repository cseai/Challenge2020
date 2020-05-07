const router = require('express').Router();
const deptController = require('../controllers/deptController');
const authController = require('../controllers/authController');

router.route('/eduhubs/').get(authController.protect, deptController.getAllEduHubs);
router.route('/eduhubs/:id').get(authController.protect, deptController.getEduHub);

router.route('/:id/tree').get(authController.protect, deptController.traverseTree);

router.route('/:deptId/addmembers').patch(authController.protect, deptController.addMembers);
router.route('/:deptId/removemembers').patch(authController.protect, deptController.removeMembers);

router.route('/')
    .get(authController.protect, deptController.getAllDepts)
    .post(authController.protect, deptController.createDept);

router.route('/:id')
    .get(authController.protect, deptController.getDept)
    .patch(authController.protect, deptController.updateDept)
    .delete(authController.protect, deptController.deleteDept);

module.exports = router;
