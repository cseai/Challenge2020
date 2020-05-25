const Book = require('../model/bookModel');
const Dept = require('../model/deptModel');
const Library = require('../model/libraryModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllBooks = catchAsync(async (req, res, next) => {
    // NOTE: This is general route for Books or Books of a specific Library
	
    // Note: Filter book in a specific library if libraryId provided (Library/Books route)...Else general query for Book
	const features = req.params.libraryId ? new APIFeatures(Book.find({ library: req.params.libraryId }), req.query).filter().sort().limitFields().paginate() : new APIFeatures(Book.find(), req.query).filter().sort().limitFields().paginate();
	const books = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: books.length,
		books,
	});
});

exports.getBook = catchAsync(async (req, res, next) => {
	// NOTE: This is general route for Books or Books of a specific Library
	
    // Note: Filter book in a specific library if libraryId provided (Library/Books route)...Else general query for Book
    const bookQuery = req.params.libraryId ? Book.findOne({library: req.params.libraryId, _id: req.params.bookId}) : Book.findById(req.params.bookId);
    const book = await bookQuery;
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
    
	// Get book of this library
	const book = await Book.findOne({library: req.params.libraryId, _id: req.params.bookId});
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
	const bookUpdated = await Book.findOne({library: req.params.libraryId, _id: req.params.bookId});
	if (!bookUpdated) {
		return next(new AppError(`Book doesn't exist!`, 404));
	}

    res.status(200).json({
        success: true,
        msg: 'Book updated',
        book: bookUpdated,
    });
});

exports.addDeptsAtBook = catchAsync(async (req, res, next) => {
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
    
	// Get book of this library
	const book = await Book.findOne({library: req.params.libraryId, _id: req.params.bookId});
	if(!book){
		return next(new AppError(`Book does not exist`, 404));
	}
    
    if(clearedData.depts && clearedData.depts.length > 0){
        // Check depts are valid or not
        let deptsToAdd = [];
        for(let dept_index=0; dept_index < clearedData.depts.length; dept_index++){
            const dept = await Dept.findById(clearedData.depts[dept_index]);
            if(!dept){
		        return next(new AppError(`Dept does not exist. Please provide valid DeptId.`, 404));
            }
            // Check dept already exist in Book's depts or not
            if(book.depts.includes(clearedData.depts[dept_index])){
		        return next(new AppError(`Dept already exist in Book's depts. Please provide valid DeptId.`, 401));
            }
            deptsToAdd.push(clearedData.depts[dept_index]);
        }

        // Add depts if there are deptsToAdd
        if(deptsToAdd.length > 0){
            book.depts = [...book.depts, ...deptsToAdd];
            await book.save();
        }
    }
    else{
        return next(new AppError(`No depts to add.`, 401));
    }

    res.status(200).json({
        success: true,
        msg: 'Depts added to Book',
        book,
    });
});

exports.removeDeptsFromBook = catchAsync(async (req, res, next) => {
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
    
	// Get book of this library
	const book = await Book.findOne({library: req.params.libraryId, _id: req.params.bookId});
	if(!book){
		return next(new AppError(`Book does not exist`, 404));
	}
    
    if(clearedData.depts && clearedData.depts.length > 0){
        // Check depts are valid or not
        let deptsRemovedCounted = 0;
        for(let dept_index=0; dept_index < clearedData.depts.length; dept_index++){
            let id_index = book.depts.indexOf(clearedData.depts[dept_index]);
            if(id_index > -1){
                book.depts.splice(id_index, 1);
				deptsRemovedCounted += 1;
			}
        }

        // IF Any Dept Removed THEN save the Book
        if(deptsRemovedCounted > 0){
            await book.save();
        }
        else{
            console.log(`No depts to remove or already removed.`);
        }
    }
    else{
        return next(new AppError(`No depts given to remove.`, 401));
    }

    res.status(200).json({
        success: true,
        msg: 'Depts removed to Book',
        book,
    });
});

exports.addTagsAtBook = catchAsync(async (req, res, next) => {
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
    
	// Get book of this library
	const book = await Book.findOne({library: req.params.libraryId, _id: req.params.bookId});
	if(!book){
		return next(new AppError(`Book does not exist`, 404));
	}
    
    if(clearedData.tags && clearedData.tags.length > 0){
        // Check tags are valid or not
        let tagsToAdd = [];
        for(let tag_index=0; tag_index < clearedData.tags.length; tag_index++){
            // Check tag already exist in Book's tags or not
            if(book.tags.includes(clearedData.tags[tag_index])){
		        return next(new AppError(`Tag already exist in Book's tags. Please provide valid Tag.`, 401));
            }
            tagsToAdd.push(clearedData.tags[tag_index]);
        }

        // Add tags if there are tagsToAdd
        if(tagsToAdd.length > 0){
            book.tags = [...book.tags, ...tagsToAdd];
            await book.save();
        }
    }
    else{
        return next(new AppError(`No tags to add.`, 401));
    }

    res.status(200).json({
        success: true,
        msg: 'Tags added to Book',
        book,
    });
});

exports.removeTagsFromBook = catchAsync(async (req, res, next) => {
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
    
	// Get book of this library
	const book = await Book.findOne({library: req.params.libraryId, _id: req.params.bookId});
	if(!book){
		return next(new AppError(`Book does not exist`, 404));
	}
    
    if(clearedData.tags && clearedData.tags.length > 0){
        // Check tags are valid or not
        let tagsRemovedCounted = 0;
        for(let tag_index=0; tag_index < clearedData.tags.length; tag_index++){
            let id_index = book.tags.indexOf(clearedData.tags[tag_index]);
            if(id_index > -1){
                book.tags.splice(id_index, 1);
				tagsRemovedCounted += 1;
			}
        }

        // IF Any tag Removed THEN save the Book
        if(tagsRemovedCounted > 0){
            await book.save();
        }
        else{
            console.log(`No tags to remove or already removed.`);
        }
    }
    else{
        return next(new AppError(`No tags given to remove.`, 401));
    }

    res.status(200).json({
        success: true,
        msg: 'Tags removed to Book',
        book,
    });
});
