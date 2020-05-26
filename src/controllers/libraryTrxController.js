const Trx = require('../model/transactionModel');
const Library = require('../model/libraryModel');
const Book = require('../model/bookModel');
const Resource = require('../model/resourceModel');
const MemberGroup = require('../model/memberGroupModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllTrxs = catchAsync(async (req, res, next) => {
    // NOTE: This is Trxs of a specific Library
	
    // Filter trx in a specific library
	const features = new APIFeatures(Trx.find({ library: req.params.libraryId }), req.query).filter().sort().limitFields().paginate();
	const trxs = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: trxs.length,
		trxs,
	});
});

exports.getTrx = catchAsync(async (req, res, next) => {
	// NOTE: This is Trxs of a specific Library
	
    // Filter trx in a specific library
	const trxQuery = Trx.findOne({library: req.params.libraryId, _id: req.params.trxId});
    const trx = await trxQuery;
	if (!trx) {
		return next(new AppError(`Trx doesn't exists!`, 404));
    }
    
	return res.status(200).json({
		success: true,
		msg: 'Get Trx',
		trx,
	});
});

exports.getAllBookTrxs = catchAsync(async (req, res, next) => {
    // NOTE: This is BookTrxs of a specific Library
	
    // Filter book trx in a specific library
	const features = new APIFeatures(Trx.find({ library: req.params.libraryId, contentType: 'book' }), req.query).filter().sort().limitFields().paginate();
	const trxs = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: trxs.length,
		trxs,
	});
});

exports.getBookTrx = catchAsync(async (req, res, next) => {
	// NOTE: This is BookTrxs of a specific Library
	
    // Filter book trx in a specific library
	const trxQuery = Trx.findOne({library: req.params.libraryId, contentType: 'book', _id: req.params.trxId});
    const trx = await trxQuery;
	if (!trx) {
		return next(new AppError(`Trx doesn't exists!`, 404));
    }
    
	return res.status(200).json({
		success: true,
		msg: 'Get Trx',
		trx,
	});
});

exports.borrowBookTrx = catchAsync(async (req, res, next) => {
	// Copy data and pre-validate
	const clearedData = {...req.body};
	if(!clearedData.objectId){
		return next(new AppError(`'objectId' (bookId) field is required`, 401));
	}

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

	// Get Book of this library which is `available`
	const book = await Book.findOne(
            { library: req.params.libraryId, _id: clearedData.objectId, status: 'available' }
        );
	if (!book) {
		return next(new AppError(`Book does not exist or unavailable.`, 404));
	}

	// validate data
	clearedData.library = library._id;
	clearedData.contentType = 'book';
	clearedData.objectId = book._id;
	// `issueDate` : Note: This should be same as created at... default: Date.now()
	clearedData.issueDate = Date.now();
	if(!clearedData.dueDate){
		// Note: this should be given by client...and validation ERROR
		return next(new AppError(`Due Date field is required`, 401));
	}
	if(clearedData.returnDate){
		// `returnDate`: Return date will be asigned during book return
		clearedData.returnDate = null;
	}
	if(!clearedData.user){
		// `user`: User who borrowing the book required
		return next(new AppError(`Borrower User field is required`, 401));
	}
	else{
		// Verify the user is a member of this Library
		const memberGroup = await MemberGroup.findById(library.memberGroup);
		if(!memberGroup.members.includes(clearedData.user)){
			return next(new AppError(`Borrower User must be a member of this library.`, 401));
		}
		// Verify the user is not same as requested user
		if(String(req.user._id) === String(clearedData.user)){
			return next(new AppError(`User can not borrow Book himself/herself.`, 401));
		}
	}
	// `issuedBy`: User who created this Trx
	clearedData.issuedBy = req.user._id;
	if(clearedData.updatedBy){
		// `updatedBy` [Array]: This field will be asigned during book Trx update
		clearedData.updatedBy = [];
	}
	if(clearedData.active){
		// `active`: This will be 'true' when trx is active... and when closed then 'false'
		clearedData.active = true;
	}
	if(clearedData.createdAt){
		// `createdAt`: This field has auto generated value
		clearedData.createdAt = Date.now();
	}
	if(clearedData.updatedAt){
		// `createdAt`: When the Trx will be updated then this field will be assigned
		clearedData.createdAt = null;
	}

	const newTrx = await Trx.create(clearedData);
	if(!newTrx){
		return next(new AppError(`Transaction failed!. Something went wrong`, 500));
	}
	
	// IMPORTANT: This must be done better way...like pre or post save
	book.status = 'unavailable';
	await book.save();

	// Send Response
	return res.status(201).json({
		success: true,
		msg: 'Trx created.',
		trx: newTrx,
		book
	});
});

exports.returnBookTrx = catchAsync(async (req, res, next) => {
	// Copy data and pre-validate
	const clearedData = {...req.body};
	if(!clearedData.objectId){
		return next(new AppError(`'objectId' (bookId) field is required`, 401));
	}
	if(!clearedData.user){
		return next(new AppError(`'user' (Borrower) field is required`, 401));
	}

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

	// validate data
	clearedData.contentType = 'book';
	if(!clearedData.user){
		// `user`: User who borrowing the book required
		return next(new AppError(`Borrower User field is required`, 401));
	}
	else{
		// Verify the user is a member of this Library... this step can be ignored during return
		const memberGroup = await MemberGroup.findById(library.memberGroup);
		if(!memberGroup.members.includes(clearedData.user)){
			return next(new AppError(`Borrower User must be a member of this library.`, 401));
		}
		// Verify the user is not same as requested user
		if(String(req.user._id) === String(clearedData.user)){
			return next(new AppError(`User can not borrow Book himself/herself.`, 401));
		}
	}

	// Get Book of this library which is `unavailable`
	const book = await Book.findOne(
            { library: req.params.libraryId, _id: clearedData.objectId, status: 'unavailable' }
        );
	if (!book) {
		return next(new AppError(`Book does not exist or already returned.`, 404));
	}

	// Get trx	
	const trx = await Trx.findOne(
		{ library: req.params.libraryId, objectId: clearedData.objectId, user: clearedData.user, _id: req.params.trxId, active: true }
	);
	if(!trx){
		return next(new AppError(`Transaction not found!.`, 404));
	}

	// `updatedBy` [Array]: This field will be asigned during book Trx update
	trx.updatedBy = [...trx.updatedBy, req.user._id]
	// `active`: This will be 'true' when trx is active... and when closed then 'false'
	trx.active = false;
	// `updatedAt`: When the Trx will be updated then this field will be assigned
	trx.updatedAt = Date.now();
	
	// IMPORTANT: Save changed by deactivate trx and also save book by changing status
	await trx.save();
	// IMPORTANT: This must be done better way...like pre or post save
	book.status = 'available';
	await book.save();

	// Send Response
	return res.status(200).json({
		success: true,
		msg: 'Trx updated.',
		trx,
		book
	});
});