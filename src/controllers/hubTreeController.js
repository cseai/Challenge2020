const HubTree = require('../model/hubTreeModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

// TODO: When Dept will be update then HubTree also need to update...

exports.getAllHubTrees = catchAsync(async (req, res, next) => {
	// EXECUTE QUERY
    const query = { ...req.query };
    
	if(!query.fields){
		query.fields = `-createdAt,-updatedAt,-__v,-id`;
    }
    
	const features = new APIFeatures(HubTree.find(), query).filter().sort().limitFields().paginate();
    const hubTrees = await features.query;

    if(!hubTrees){
        return next(new AppError(`HubTree does not found.`, 404));
    }

	// SEND RESPONSE
	return res.status(200).json({
		success: true,
		results: hubTrees.length,
		hubTrees,
	});
});



exports.getHubTree = catchAsync(async (req, res, next) => {
	const hubTree = await HubTree.findById(req.params.hubTreeId);
	
	if (!hubTree) {
		return next(new AppError(`HubTree doesn't exists!`, 404));
	}

    res.status(200).json({
        success: true,
        msg: 'Get HubTree',
        hubTree,
    });
});
