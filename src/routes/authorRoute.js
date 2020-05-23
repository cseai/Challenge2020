const router = require('express').Router();
const authorController = require('../controllers/authorController');
const authController = require('../controllers/authController');

router.route('/')
    .post(authController.protect, authorController.createAuthor)
    .get(authController.protect, authorController.getAllAuthors)

router.route('/:authorId')
    .get(authController.protect, authorController.getAuthor)
    .patch(authController.protect, authorController.updateAuthor)

module.exports = router;
