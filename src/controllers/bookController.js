const Book = require('../model/bookModel');
const Author = require('../model/authorModel');
const Resource = require('../model/resourceModel');
const Library = require('../model/libraryModel');
const Transaction = require('../model/transactionModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllBooks = catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    // TODOS: filter books in this library only
	// const features = req.params.libraryId ? new APIFeatures(Book.find({ library: req.params.libraryId }), req.query).filter().sort().limitFields().paginate() : new APIFeatures(Book.find(), req.query).filter().sort().limitFields().paginate();
	const features = new APIFeatures(Book.find(), req.query).filter().sort().limitFields().paginate();
	const books = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: books.length,
		books,
	});
});


exports.getBook = catchAsync(async (req, res, next) => {
    const selectForRefBooks = `_id name`;
    // TODOS: filter book in this library only
    // const bookQuery = req.params.libraryId ? Book.find({library: req.params.libraryId}) : Book.findById(req.params.bookId);
    const bookQuery = Book.findById(req.params.bookId);
    const book = await bookQuery.populate({
		path: 'library',
		select: selectForRefBooks,
	}).populate({
		path: `authors`,
		select: `_id, name`
    });

    /*
	const book = await Book.findById(req.params.bookId).populate({
		path: 'library',
		select: selectForRefBooks,
	}).populate({
		path: `authors`,
		select: `_id, name`
    });
    */
	if (!book) {
		return next(new AppError(`Book doesn't exists!`, 404));
    }
    
	return res.status(200).json({
		success: true,
		msg: 'Get Book',
		book,
	});
});

exports.updateBook = catchAsync(async (req, res, next) => {
	// Copy or generate cleared data
    const clearedData = { ...req.body };
    
    // Get Library
	const library = await Library.findById(req.params.libraryId);
	if(!library || !library.active){
		return next(new AppError(`Library does not exists or deactivated!`, 404));
	}

    // IMPORTANT: Check Requested User is a `controller` of this Library or not...if not then REJECT
	let isReqUserController = false;
	for(let i = 0; i < library.controllers.length; i++){
		// compare with String id
		if(String(library.controllers[i].user) === String(req.user._id)){
			isReqUserController = true;
			break;
		}
	}
	if(!isReqUserController){
		return next(new AppError(`Requested user must be a controller to update Book Information. Permission denied`, 401));
	}
    
	// Get book
	const book = await Book.findById(req.params.bookId);
	if(!book){
		return next(new AppError(`Book does not exist`, 404));
	}

	// IMPORTANT: Protect un-updatable data
	if(clearedData.library){
		clearedData.library = book.library;
	}
	if(clearedData.user){
		clearedData.user = book.user;
    }
    if(clearedData.authors){
		clearedData.authors = book.authors;
    }
	if(clearedData.depts){
		clearedData.depts = book.depts;
    }
    if(clearedData.tags){
		clearedData.tags = book.tags;
    }
    if(clearedData.status){
		clearedData.status = book.status;
	}
	if(clearedData.active){
		clearedData.active = book.active
	}
	if(clearedData.createdAt){
		clearedData.createdAt = book.createdAt;
	}

	// Update book
	await book.update(clearedData);

	// Get updated Book
	const bookUpdated = await Book.findById(req.params.bookId);
	if (!bookUpdated) {
		return next(new AppError(`Book doesn't exist!`, 404));
	}

    res.status(200).json({
        success: true,
        msg: 'Book updated',
        book: bookUpdated,
    });
});
