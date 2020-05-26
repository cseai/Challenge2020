const Resource = require('../model/resourceModel');
const Library = require('../model/libraryModel');
const Dept = require('../model/deptModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllResources = catchAsync(async (req, res, next) => {
    // NOTE: This is Resources of a specific Library
	
	// Filter resource in a specific library
	const features = new APIFeatures(Resource.find({ library: req.params.libraryId }), req.query).filter().sort().limitFields().paginate();
	const resources = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: resources.length,
		resources,
	});
});

exports.getResource = catchAsync(async (req, res, next) => {
    // NOTE: This is Resources of a specific Library
	
	// Filter resource in a specific library
	const resourceQuery = Resource.findOne({library: req.params.libraryId, _id: req.params.resourceId});
    const resource = await resourceQuery;
	if (!resource) {
		return next(new AppError(`Resource doesn't exists!`, 404));
    }
    
	return res.status(200).json({
		success: true,
		msg: 'Get Resource',
		resource,
	});
});

exports.updateResource = catchAsync(async (req, res, next) => {
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
		return next(new AppError(`Requested user must be a controller to update Resource Information. Permission denied`, 401));
	}
    
	// Get resource of this library
	const resource = await Resource.findOne({library: req.params.libraryId, _id: req.params.resourceId});
	if(!resource){
		return next(new AppError(`Resource does not exist`, 404));
	}

	// IMPORTANT: Protect un-updatable data
	if(clearedData.library){
		clearedData.library = resource.library;
	}
	if(clearedData.user){
		clearedData.user = resource.user;
    }
	if(clearedData.depts){
		clearedData.depts = resource.depts;
    }
    if(clearedData.tags){
		clearedData.tags = resource.tags;
    }
    if(clearedData.status){
		clearedData.status = resource.status;
	}
	if(clearedData.active){
		clearedData.active = resource.active
	}
	if(clearedData.createdAt){
		clearedData.createdAt = resource.createdAt;
	}

	// Update resource
	await resource.update(clearedData);

	// Get updated Resource
	const resourceUpdated = await Resource.findOne({library: req.params.libraryId, _id: req.params.resourceId});
	if (!resourceUpdated) {
		return next(new AppError(`Resource doesn't exist!`, 404));
	}

    res.status(200).json({
        success: true,
        msg: 'Resource updated',
        resource: resourceUpdated,
    });
});

exports.addDeptsAtResource = catchAsync(async (req, res, next) => {
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
		return next(new AppError(`Requested user must be a controller to update Resource Information. Permission denied`, 401));
	}
    
	// Get resource of this library
	const resource = await Resource.findOne({library: req.params.libraryId, _id: req.params.resourceId});
	if(!resource){
		return next(new AppError(`Resource does not exist`, 404));
	}
    
    if(clearedData.depts && clearedData.depts.length > 0){
        // Check depts are valid or not
        let deptsToAdd = [];
        for(let dept_index=0; dept_index < clearedData.depts.length; dept_index++){
            const dept = await Dept.findById(clearedData.depts[dept_index]);
            if(!dept){
		        return next(new AppError(`Dept does not exist. Please provide valid DeptId.`, 404));
            }
            // Check dept already exist in Resource's depts or not
            if(resource.depts.includes(clearedData.depts[dept_index])){
		        return next(new AppError(`Dept already exist in Resource's depts. Please provide valid DeptId.`, 401));
            }
            deptsToAdd.push(clearedData.depts[dept_index]);
        }

        // Add depts if there are deptsToAdd
        if(deptsToAdd.length > 0){
            resource.depts = [...resource.depts, ...deptsToAdd];
            await resource.save();
        }
    }
    else{
        return next(new AppError(`No depts to add.`, 401));
    }

    res.status(200).json({
        success: true,
        msg: 'Depts added to Resource',
        resource,
    });
});

exports.removeDeptsFromResource = catchAsync(async (req, res, next) => {
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
		return next(new AppError(`Requested user must be a controller to update Resource Information. Permission denied`, 401));
	}
    
	// Get resource of this library
	const resource = await Resource.findOne({library: req.params.libraryId, _id: req.params.resourceId});
	if(!resource){
		return next(new AppError(`Resource does not exist`, 404));
	}
    
    if(clearedData.depts && clearedData.depts.length > 0){
        // Check depts are valid or not
        let deptsRemovedCounted = 0;
        for(let dept_index=0; dept_index < clearedData.depts.length; dept_index++){
            let id_index = resource.depts.indexOf(clearedData.depts[dept_index]);
            if(id_index > -1){
                resource.depts.splice(id_index, 1);
				deptsRemovedCounted += 1;
			}
        }

        // IF Any Dept Removed THEN save the Resource
        if(deptsRemovedCounted > 0){
            await resource.save();
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
        msg: 'Depts removed to Resource',
        resource,
    });
});

exports.addTagsAtResource = catchAsync(async (req, res, next) => {
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
		return next(new AppError(`Requested user must be a controller to update Resource Information. Permission denied`, 401));
	}
    
	// Get resource of this library
	const resource = await Resource.findOne({library: req.params.libraryId, _id: req.params.resourceId});
	if(!resource){
		return next(new AppError(`Resource does not exist`, 404));
	}
    
    if(clearedData.tags && clearedData.tags.length > 0){
        // Check tags are valid or not
        let tagsToAdd = [];
        for(let tag_index=0; tag_index < clearedData.tags.length; tag_index++){
            // Check tag already exist in Resource's tags or not
            if(resource.tags.includes(clearedData.tags[tag_index])){
		        return next(new AppError(`Tag already exist in Resource's tags. Please provide valid Tag.`, 401));
            }
            tagsToAdd.push(clearedData.tags[tag_index]);
        }

        // Add tags if there are tagsToAdd
        if(tagsToAdd.length > 0){
            resource.tags = [...resource.tags, ...tagsToAdd];
            await resource.save();
        }
    }
    else{
        return next(new AppError(`No tags to add.`, 401));
    }

    res.status(200).json({
        success: true,
        msg: 'Tags added to Resource',
        resource,
    });
});

exports.removeTagsFromResource = catchAsync(async (req, res, next) => {
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
		return next(new AppError(`Requested user must be a controller to update Resource Information. Permission denied`, 401));
	}
    
	// Get resource of this library
	const resource = await Resource.findOne({library: req.params.libraryId, _id: req.params.resourceId});
	if(!resource){
		return next(new AppError(`Resource does not exist`, 404));
	}
    
    if(clearedData.tags && clearedData.tags.length > 0){
        // Check tags are valid or not
        let tagsRemovedCounted = 0;
        for(let tag_index=0; tag_index < clearedData.tags.length; tag_index++){
            let id_index = resource.tags.indexOf(clearedData.tags[tag_index]);
            if(id_index > -1){
                resource.tags.splice(id_index, 1);
				tagsRemovedCounted += 1;
			}
        }

        // IF Any tag Removed THEN save the Resource
        if(tagsRemovedCounted > 0){
            await resource.save();
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
        msg: 'Tags removed to Resource',
        resource,
    });
});
