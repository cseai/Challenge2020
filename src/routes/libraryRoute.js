const router = require('express').Router();
const libraryAdminRiute = require('./libraryAdminRoute');
const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/authController');
const libraryBookController = require('../controllers/libraryBookController');
const libraryResourceController = require('../controllers/libraryResourceController');

// Library admin-panel
router.use('/admin', libraryAdminRiute);

// Library
router.route('/')
    .get(authController.protect, libraryController.getAllLibraries);

router.route('/:libraryId')
    .get(authController.protect, libraryController.getLibrary);

// Library/Book
router.route('/:libraryId/books')
    .get(authController.protect, libraryBookController.getAllBooks);

router.route('/:libraryId/books/:bookId')
    .get(authController.protect, libraryBookController.getBook);

// Library/Resource
router.route('/:libraryId/resources')
    .get(authController.protect, libraryResourceController.getAllResources);

router.route('/:libraryId/resources/:resourceId')
    .get(authController.protect, libraryResourceController.getResource);

module.exports = router;
