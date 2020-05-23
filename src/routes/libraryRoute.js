const router = require('express').Router();
const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

router.route('/:libraryId/addcontrollers').patch(authController.protect, libraryController.addControllers);
router.route('/:libraryId/removecontrollers').patch(authController.protect, libraryController.removeControllers);

router.route('/')
    .get(authController.protect, libraryController.getAllLibraries)

router.route('/:libraryId/books')
    .get(authController.protect, bookController.getAllBooks)
    .post(authController.protect, libraryController.createBook);

router.route('/:libraryId/books/:bookId')
    .get(authController.protect, bookController.getBook)
    .patch(authController.protect, bookController.updateBook);

router.route('/:libraryId')
    .get(authController.protect, libraryController.getLibrary)
    .patch(authController.protect, libraryController.updateLibrary)

module.exports = router;
