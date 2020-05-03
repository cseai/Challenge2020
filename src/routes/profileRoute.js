const router = require('express').Router();
const { getAllProfile, createProfile } = require('./../controllers/profileController');

router.get('/', getAllProfile).post('/:userId', createProfile);

module.exports = router;
