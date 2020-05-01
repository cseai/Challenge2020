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
    /* CAREFULLY NOTE
    - `eduHub` and `children` property can be update manually... it will be changed automaticaly
    - so that never UPDATE using req.body data without check `eduHub` and `children` property
    - always validate data before update
    */

    // const dept = await Dept.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true
    // });

    const dept = await Dept.findById(req.params.id);
    if(!dept){
        return next(new AppError(`Department doesn't exist!`, 404));
    }

    const clearedData = {...req.body};
    console.log(`req.body: ${req.body}, clearedData: ${clearedData}, dept: ${dept}`);
    clearedData.eduHub = dept.eduHub;
    clearedData.children = dept.children;

    // CASES: 01, 10, 11, 00->UNCHANGED
    // NOTE: This is dangarous buggy code.... somehow pre-update doesn't work, so this way
    if(clearedData.parent === null && dept.parent !== null){
        // EDUHUB
        clearedData.parent = null;
        clearedData.eduHub = null;

        // Update parent-dept's children... remove it's id
        const parentDept = await Dept.findById(dept.parent);
        if(!parentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));

        const id_index = parentDept.children.indexOf(dept._id);
        if(id_index > -1){
            parentDept.children.splice(id_index, 1);
            parentDept.save();
        }
    } else if(clearedData.parent !== null && dept.parent === null){
        // CHANGE PARENT: EDUHUB TO DEPT
        const newParentDept = await Dept.findById(clearedData.parent);
        if(!newParentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));
        
        // set eduHub id
        clearedData.eduHub = clearedData.parent;


        const id_index = newParentDept.children.indexOf(dept._id);
        if(id_index > -1){
            newParentDept.children.splice(id_index, 1);
            newParentDept.save();
        }
    } else if((clearedData.parent !== dept.parent) && clearedData.parent !== null && dept.parent !== null){
        // CHANGE PARENT
        const oldParentDept = await Dept.findById(dept.parent);
        if(!oldParentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));

        // remov children from old parent
        const id_index = oldParentDept.children.indexOf(dept._id);
        if(id_index > -1){
            oldParentDept.children.splice(id_index, 1);
            oldParentDept.save();
        }

        // add children to new parent
        // call `save` after dept-update... this will change automatically
    }



    const updatedDept = await dept.updateOne(clearedData);

    // NOTE: save() call need because of parent update
    dept.save();

    if(!updatedDept){
        console.log(`updatedDept: ${updatedDept} , clearedData: ${clearedData}, dept: ${dept}`);
        return next(new AppError('Dept update faild. Fix BUG..'));
    }

    console.log(`updatedDept: ${updatedDept} , clearedData: ${clearedData}, dept: ${dept}`);

    res.status(200).json({
        success: true,
        msg: 'Department updated',
        dept
    })
});


exports.deleteDept = catchAsync(async (req, res, next) => {
    // await Dept.findByIdAndDelete(req.params.id);
    const delDept = await Dept.findById(req.params.id);
    if(!delDept){
        return next(new AppError(`Dept doesn't exist which want to delete!`, 404));
    }
    
    const status = await delDept.deleteOne();
    console.log(`delete-status: ${status}`);

    res.status(200).json({
        success: true,
        msg: 'Department deleted',
    })
});