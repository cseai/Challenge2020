const Trx = require('../model/transactionModel');
const Library = require('../model/libraryModel');
const Book = require('../model/bookModel');
const Resource = require('../model/resourceModel');
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