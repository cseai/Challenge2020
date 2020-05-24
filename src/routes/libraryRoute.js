const router = require('express').Router();
const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');
const resourceController = require('../controllers/resourceController');

// Library
router.route('/:libraryId/addcontrollers').patch(authController.protect, libraryController.addControllers);
router.route('/:libraryId/removecontrollers').patch(authController.protect, libraryController.removeControllers);
router.route('/')
    .get(authController.protect, libraryController.getAllLibraries);

// Library/Book
router.route('/:libraryId/books')
    .get(authController.protect, bookController.getAllBooks)
    .post(authController.protect, libraryController.createBook);

router.route('/:libraryId/books/:bookId')
    .get(authController.protect, bookController.getBook)
    .patch(authController.protect, bookController.updateBook);

router.route('/:libraryId/books/:bookId/adddepts').patch(authController.protect, bookController.addDeptsAtBook);
router.route('/:libraryId/books/:bookId/removedepts').patch(authController.protect, bookController.removeDeptsFromBook);
router.route('/:libraryId/books/:bookId/addtags').patch(authController.protect, bookController.addTagsAtBook);
router.route('/:libraryId/books/:bookId/removetags').patch(authController.protect, bookController.removeTagsFromBook);
      
// Library/Resource
router.route('/:libraryId/resources')
    .get(authController.protect, resourceController.getAllResources)
    .post(authController.protect, libraryController.createResource);

router.route('/:libraryId/resources/:resourceId')
    .get(authController.protect, resourceController.getResource)
    .patch(authController.protect, resourceController.updateResource);

router.route('/:libraryId/resources/:resourceId/adddepts').patch(authController.protect, resourceController.addDeptsAtResource);
router.route('/:libraryId/resources/:resourceId/removedepts').patch(authController.protect, resourceController.removeDeptsFromResource);
router.route('/:libraryId/resources/:resourceId/addtags').patch(authController.protect, resourceController.addTagsAtResource);
router.route('/:libraryId/resources/:resourceId/removetags').patch(authController.protect, resourceController.removeTagsFromResource);
        
// Library
router.route('/:libraryId')
    .get(authController.protect, libraryController.getLibrary)
    .patch(authController.protect, libraryController.updateLibrary)

module.exports = router;
