const Library = require('../model/libraryModel');
const Author = require('../model/authorModel');
const Book = require('../model/bookModel');
const Resource = require('../model/resourceModel');
const Transaction = require('../model/transactionModel');
const Dept = require('../model/deptModel');
const MemberGroup = require('../model/memberGroupModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllLibraries = catchAsync(async (req, res, next) => {
	// EXECUTE QUERY
	const features = new APIFeatures(Library.find(), req.query).filter().sort().limitFields().paginate();
	const libraries = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: libraries.length,
		libraries,
	});
});

exports.getLibrary = catchAsync(async (req, res, next) => {
	const selectForRefLibraries = `_id name`;
	const library = await Library.findById(req.params.libraryId).populate({
		path: 'dept',
		select: selectForRefLibraries,
	}).populate({
		path: `memberGroup`,
		select: `_id, members`
	});
	if (!library) {
		return next(new AppError(`Library doesn't exists!`, 404));
	}
	return res.status(200).json({
		success: true,
		msg: 'Get Library',
		library,
	});
});


exports.updateLibrary = catchAsync(async (req, res, next) => {
	// Copy or generate cleared data
	const clearedData = { ...req.body };

	// Get library
	const library = await Library.findById(req.params.libraryId);
	if(!library){
		return next(new AppError(`Library does not exist`, 404));
	}

	// IMPORTANT: Protect un-updatable data
	if(clearedData.dept){
		clearedData.dept = library.dept;
	}
	if(clearedData.controllers){
		clearedData.controllers = library.controllers;
	}
	if(clearedData.memberGroup){
		clearedData.memberGroup = library.memberGroup;
	}
	if(clearedData.active){
		clearedData.active = library.active
	}
	if(clearedData.createdAt){
		clearedData.createdAt = library.createdAt;
	}

	// Update library
	await library.update(clearedData);

	// Get updated Library
	const libraryUpdated = await Library.findById(req.params.libraryId);
	if (!libraryUpdated) {
		return next(new AppError(`Library doesn't exist!`, 404));
	}

	res.status(200).json({
		success: true,
		msg: 'Library updated',
		library: libraryUpdated,
	});
});


// Controllers
exports.addControllers = catchAsync(async (req, res, next) => {
	const controllers = Array(...req.body.controllers);
	if(!controllers || controllers.length < 1){
		return next(new AppError(`'controllers' field is empty!...Please provide valid controllers.`, 401));
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
		return next(new AppError(`Requested user must be a controller to add new controller. Permission denied`, 401));
	}

	// Get MemberGroup
	if(!library.memberGroup){
		return next(new AppError(`Library's MemberGroup does not exist. Something went wrong`, 500));
	}
    const memberGroup = await MemberGroup.findById(library.memberGroup);
	if (!memberGroup || !memberGroup.active) {
		return next(new AppError(`MemberGroup doesn't exists or deactivated!`, 404));
    }
    
    if(controllers && controllers.length > 0){
        let controllersToAdd = [];
        for(let index=0; controllers.length > index; index++){
			// Only if controller is a member in MemberGroup then add otherwise reject it
            if(memberGroup.members.includes(controllers[index].user)){
                controllersToAdd.push(controllers[index]);
            }
        }

        if(controllersToAdd.length > 0){
			// Now validate controllers that is it already exists or not
			// IMPORTANT: Check if these members are controllers or not...IF controllers THEN REJECT
			let controllersAddedCount = 0;
			let controllersUser = [];
			for(let i = 0; i < library.controllers.length; i++){
				// store as String id
				controllersUser.push(String(library.controllers[i].user));
			}
			for(let i = 0; i < controllersToAdd.length; i++){
				// compare with String id
				if(!controllersUser.includes(String(controllersToAdd[i].user))){
					library.controllers.push(controllersToAdd[i]);
					controllersAddedCount += 1;
				}
			}

			if(controllersAddedCount > 0){
				// Save Library using .save()
				await library.save();
				console.log(`Controllers addedCount:${controllersAddedCount}`);
			} else{
				console.log(`No controllers to add or already exist!`);
			}
        }
        else{
			// IMPORTANT: means trying to add non member controllers... So throw error
			return next(new AppError(`Controllers can not be added because this/these controllers not member of MemberGroup. Add them to MemberGroup first!`, 401));
        }
    }

	res.status(200).json({
		success: true,
		msg: 'Controllers of library',
		controllers: library.controllers
	});
});