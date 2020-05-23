const Author = require('../model/authorModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllAuthors = catchAsync(async (req, res, next) => {
	// EXECUTE QUERY
	const features = new APIFeatures(Author.find(), req.query).filter().sort().limitFields().paginate();
	const authors = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: authors.length,
		authors,
	});
});

exports.getAuthor = catchAsync(async (req, res, next) => {
	const author = await Author.findById(req.params.authorId);
	if (!author) {
		return next(new AppError(`Author doesn't exists!`, 404));
    }
    
	return res.status(200).json({
		success: true,
		msg: 'Get Author',
		author,
	});
});

exports.createAuthor = catchAsync(async (req, res, next) => {
    // Copy data
    const clearedData = {...req.body}
    
    // Set createdBy User
    clearedData.createdBy = req.user._id;

	// IMPORTANT: Set some pre-config properties
	clearedData.verified = false;
	clearedData.realUser = null;

	// Create Library
	const newAuthor = await Author.create(clearedData);
	if (!newAuthor) {
		return next(new AppError(`Author creation failed!`));
	}

	return res.status(200).json({
		success: true,
		msg: 'New Author created',
		author: newAuthor,
    });
});

exports.updateAuthor = catchAsync(async (req, res, next) => {
    // IMPORTANT: THIS UPDATE DESIGN NEED DISCUSSION LATER

    const author = await Author.findById(req.params.authorId);
    if (!author) {
        return next(new AppError(`Author does not exist.`, 404));
    }

	// Copy or generate cleared data
	const clearedData = { ...req.body };

	// IMPORTANT: Protect un-updatable data
	if(clearedData.verified){
		clearedData.verified = author.verified;
	}
	if(clearedData.realUser){
		clearedData.realUser = author.realUser;
	}
	if(clearedData.active){
		clearedData.active = author.active;
	}
	if(clearedData.createdAt){
		clearedData.createdAt = author.createdAt;
	}

	// Update library
	await author.update(clearedData);

	// Get updated Author
	const authorUpdated = await Author.findById(req.params.authorId);
	if (!authorUpdated) {
		return next(new AppError(`Author doesn't exist!`, 404));
	}

	res.status(200).json({
		success: true,
		msg: 'Author updated',
		author: authorUpdated,
	});
});