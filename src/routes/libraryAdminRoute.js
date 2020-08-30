const router = require('express').Router();
const libraryController = require('../controllers/library/libraryController');
const authController = require('../controllers/authController');
const libraryUserController = require('../controllers/library/libraryUserController');
const libraryBookController = require('../controllers/library/libraryBookController');
const libraryResourceController = require('../controllers/library/libraryResourceController');
const libraryTrxController = require('../controllers/library/libraryTrxController');

// Library
router.route('/:libraryId/addcontrollers').patch(authController.protect, libraryController.addControllers);
router.route('/:libraryId/removecontrollers').patch(authController.protect, libraryController.removeControllers);
router.route('/:libraryId')
    .get(authController.protect, libraryController.getLibrary)
    .patch(authController.protect, libraryController.updateLibrary);

// Library/User
router.route('/:libraryId/members')
    .get(authController.protect, libraryUserController.getAllMembers);

router.route('/:libraryId/members/:userId')
    .get(authController.protect, libraryUserController.getMember);

// Library/Book
router.route('/:libraryId/books')
    .get(authController.protect, libraryBookController.getAllBooks)
    .post(authController.protect, libraryController.createBook);

router.route('/:libraryId/books/:bookId')
    .get(authController.protect, libraryBookController.getBook)
    .patch(authController.protect, libraryBookController.updateBook);

router.route('/:libraryId/books/:bookId/adddepts').patch(authController.protect, libraryBookController.addDeptsAtBook);
router.route('/:libraryId/books/:bookId/removedepts').patch(authController.protect, libraryBookController.removeDeptsFromBook);
router.route('/:libraryId/books/:bookId/addtags').patch(authController.protect, libraryBookController.addTagsAtBook);
router.route('/:libraryId/books/:bookId/removetags').patch(authController.protect, libraryBookController.removeTagsFromBook);

// Library/Resource
router.route('/:libraryId/resources')
    .get(authController.protect, libraryResourceController.getAllResources)
    .post(authController.protect, libraryController.createResource);

router.route('/:libraryId/resources/:resourceId')
    .get(authController.protect, libraryResourceController.getResource)
    .patch(authController.protect, libraryResourceController.updateResource);

router.route('/:libraryId/resources/:resourceId/adddepts').patch(authController.protect, libraryResourceController.addDeptsAtResource);
router.route('/:libraryId/resources/:resourceId/removedepts').patch(authController.protect, libraryResourceController.removeDeptsFromResource);
router.route('/:libraryId/resources/:resourceId/addtags').patch(authController.protect, libraryResourceController.addTagsAtResource);
router.route('/:libraryId/resources/:resourceId/removetags').patch(authController.protect, libraryResourceController.removeTagsFromResource);

// Library/Trx
router.route('/:libraryId/trxs')
    .get(authController.protect, libraryTrxController.getAllTrxs);

router.route('/:libraryId/trxs/:trxId')
    .get(authController.protect, libraryTrxController.getTrx);

// Library/BookTrx
router.route('/:libraryId/booktrxs')
    .get(authController.protect, libraryTrxController.getAllBookTrxs)
    .post(authController.protect, libraryTrxController.borrowBookTrx);

router.route('/:libraryId/booktrxs/:trxId')
    .get(authController.protect, libraryTrxController.getBookTrx)
    .patch(authController.protect, libraryTrxController.returnBookTrx);

// Library/ResourceTrx
router.route('/:libraryId/resourcetrxs')
    .get(authController.protect, libraryTrxController.getAllResourceTrxs)
    .post(authController.protect, libraryTrxController.borrowResourceTrx);

router.route('/:libraryId/resourcetrxs/:trxId')
    .get(authController.protect, libraryTrxController.getResourceTrx)
    .patch(authController.protect, libraryTrxController.returnResourceTrx);

module.exports = router;