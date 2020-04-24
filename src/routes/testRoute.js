const router = require('express').Router();
const { getTest } = require('./../Controller/testController');

router.route('/').get(getTest);

module.exports = router;
