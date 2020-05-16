const router = require('express').Router();
const hubTreeController = require('../controllers/hubTreeController');
const authController = require('../controllers/authController');

router.route('/').get(authController.protect, hubTreeController.getAllHubTrees);
router.route('/:hubTreeId/').get(authController.protect, hubTreeController.getHubTree);

module.exports = router;
