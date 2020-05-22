const router = require('express').Router();
const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/authController');

// router.route('/eduhubs/').get(authController.protect, deptController.getAllEduHubs);
// router.route('/:deptId/eduhub/').get(authController.protect, deptController.getEduHub);

// router.route('/:deptId/tree').get(authController.protect, deptController.traverseTree);

// router.route('/:deptId/hubtree').get(authController.protect, deptController.getOrCreateHubTree);

// router.route('/:deptId/addmembers').patch(authController.protect, deptController.addMembers);
// router.route('/:deptId/removemembers').patch(authController.protect, deptController.removeMembers);

router.route('/:libraryId/addcontrollers').patch(authController.protect, libraryController.addControllers);
// router.route('/:deptId/removecontrollers').patch(authController.protect, deptController.removeControllers);

router.route('/')
    .get(authController.protect, libraryController.getAllLibraries)

router.route('/:libraryId')
    .get(authController.protect, libraryController.getLibrary)
    .patch(authController.protect, libraryController.updateLibrary)

module.exports = router;
