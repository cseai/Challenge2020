const Library = require('../../model/libraryModel');
const Author = require('../../model/authorModel');
const Book = require('../../model/bookModel');
const Resource = require('../../model/resourceModel');
const Transaction = require('../../model/transactionModel');
const Dept = require('../../model/deptModel');
const MemberGroup = require('../../model/memberGroupModel');
const APIFeatures = require('../../utils/apiFeatures');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

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

exports.removeControllers = catchAsync(async (req, res, next) => {
	// Expecting Array of userId (controller's userId)
	const controllers = Array(...req.body.controllers);
	if(!controllers || controllers.length < 1){
		return next(new AppError(`'controllers' field is empty!...Please provide valid controllers userId.`, 401));
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


    if(controllers && controllers.length > 0){
		// Remove controller from Library's controllers
		let controllersRemovedCount = 0;
        for(let rc_index = 0; controllers.length > rc_index; rc_index++){
			for(let lc_index = 0; library.controllers.length > lc_index; lc_index++){
				if(String(controllers[rc_index]) === String(library.controllers[lc_index].user)){
					// IMPORTANT: Protect from ownership deletion
					if(String(library.controllers[lc_index].role) === 'superadmin'){
						return next(new AppError(`Superadmin can not be removed. Update the ownership first at controllers section.`, 401));
					}
					library.controllers.splice(lc_index, 1);
					controllersRemovedCount += 1;
					break;
				}
			}
        }

        // IF Any Controller Removed THEN Save the Library
        if(controllersRemovedCount > 0){
			// use .save()
            await library.save();
        }
        else{
            console.log(`No controller to remove or already removed.`);
        }
    }

	res.status(200).json({
		success: true,
		msg: 'Library Controllers',
		controllers: library.controllers
	});
});

exports.createBook = catchAsync(async (req, res, next) => {
	// Get Library
	const library = await Library.findById(req.params.libraryId);
	if(!library){
		return next(new AppError(`Library does not exist`, 404));
	}

	// Check req.user is a Controller of Library or not
	let reqUserIsController = false;
	for(let controller_index = 0; controller_index < library.controllers.length; controller_index++){
		if(String(library.controllers[controller_index].user) === String(req.user._id)){
			reqUserIsController = true;
			break;
		}
	}
	if(!reqUserIsController){
		return next(new AppError(`Requested user must be controller of Library to create a Book.`, 401));
	}

	// Copy data
	const clearedData = {...req.body}

	// Check `authors` are valid or not
	if(!clearedData.authors || clearedData.authors.length < 1){
		return next(new AppError(`Book's must have at least one Author.`, 406));
	}else{
		for(let index=0; index < clearedData.authors.length; index++){
			const author = await Author.findById(clearedData.authors[index].authorId);
			if(!author){
				return next(new AppError(`Author does not exist. Please provide valid authors.`, 404));
			}
			else if((!clearedData.authors[index].authorName)  || (author.name !== clearedData.authors[index].authorName)){
				// if the given author name is incorrect then replace with correct name
				clearedData.authors[index].authorName = author.name;
			}
		}
	}

	// Check if `depts` is provides then is it valid or not
	if(clearedData.depts){
		for(let index=0; index < clearedData.depts.length; index++){
			const dept = await Dept.findById(clearedData.depts[index]);
			if(!dept){
				return next(new AppError(`Dept does not exist. Please provide valid depts.`, 404));
			}
		}
	}

	// Set user at Book
	clearedData.user = req.user._id;
	clearedData.library = library._id;

	// Create Book
	const newBook = await Book.create(clearedData);
	if (!newBook) {
		return next(new AppError(`Book creation failed!`));
	}

	res.status(201).json({
		success: true,
		msg: 'New Book created',
		book: newBook,
	});
});

exports.createResource = catchAsync(async (req, res, next) => {
	// Get Library
	const library = await Library.findById(req.params.libraryId);
	if(!library){
		return next(new AppError(`Library does not exist`, 404));
	}

	// Check req.user is a Controller of Library or not
	let reqUserIsController = false;
	for(let controller_index = 0; controller_index < library.controllers.length; controller_index++){
		if(String(library.controllers[controller_index].user) === String(req.user._id)){
			reqUserIsController = true;
			break;
		}
	}
	if(!reqUserIsController){
		return next(new AppError(`Requested user must be controller of Library to create a Resource.`, 401));
	}

	// Copy data
	const clearedData = {...req.body}

	// Check if `depts` is provides then is it valid or not
	if(clearedData.depts){
		for(let index=0; index < clearedData.depts.length; index++){
			const dept = await Dept.findById(clearedData.depts[index]);
			if(!dept){
				return next(new AppError(`Dept does not exist. Please provide valid depts.`, 404));
			}
		}
	}

	// Set user at Resource
	clearedData.user = req.user._id;
	clearedData.library = library._id;

	// Create Resource
	const newResource = await Resource.create(clearedData);
	if (!newResource) {
		return next(new AppError(`Resource creation failed!`));
	}

	res.status(201).json({
		success: true,
		msg: 'New Resource created',
		resource: newResource,
	});
});