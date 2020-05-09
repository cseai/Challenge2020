const router = require('express').Router();
const deptController = require('../controllers/deptController');
const authController = require('../controllers/authController');

router.route('/eduhubs/').get(authController.protect, deptController.getAllEduHubs);
router.route('/:deptId/eduhub/').get(authController.protect, deptController.getEduHub);

router.route('/:deptId/tree').get(authController.protect, deptController.traverseTree);

router.route('/:deptId/addmembers').patch(authController.protect, deptController.addMembers);
router.route('/:deptId/removemembers').patch(authController.protect, deptController.removeMembers);

router.route('/:deptId/addcontrollers').patch(authController.protect, deptController.addControllers);
router.route('/:deptId/removecontrollers').patch(authController.protect, deptController.removeControllers);

router.route('/')
    .get(authController.protect, deptController.getAllDepts)
    .post(authController.protect, deptController.createDept);

router.route('/:deptId')
    .get(authController.protect, deptController.getDept)
    .patch(authController.protect, deptController.updateDept)
    .delete(authController.protect, deptController.deleteDept);

module.exports = router;
