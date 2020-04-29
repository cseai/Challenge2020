const Dept = require('../models/deptModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');


exports.getAllDepts = catchAsync(async (req, res, next) => {
	// EXECUTE QUERY
	const features = new APIFeatures(Dept.find(), req.query).filter().sort().limitFields().paginate();
	const depts = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: depts.length,
		depts
	});
});


exports.getDept = catchAsync(async (req, res, next) => {
	const dept = await Dept.findById(req.params.id);
	if(!dept){
		return next(new AppError(`Dept doesn't exists!`, 404));
	}
	res.status(200).json({
		success: true,
		msg: 'Get dept',
		dept
	});
});


exports.createDept = catchAsync(async (req, res, next) => {
    req.body.user = req.user._id;

    // console.log({body: req.body});

    const newDept = await Dept.create(req.body);
    if(!newDept){
        return next(new AppError(`Department creation failed!`));
    }

    res.status(201).json({
        success: true,
        msg: 'New Dept created',
        dept: newDept
    })
});

exports.updateDept = catchAsync(async (req, res, next) => {
    const dept = await Dept.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if(!dept){
        return next(new AppError(`Department update failed!`, 404));
    }

    res.status(200).json({
        success: true,
        msg: 'Department updated',
        dept
    })
});


exports.deleteDept = catchAsync(async (req, res, next) => {
    await Dept.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        msg: 'Department deleted',
    })
});