const Dept = require('../model/deptModel');
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
		depts,
	});
});

exports.getDept = catchAsync(async (req, res, next) => {
    const deselectStr = `-address -verification -createdAt -contacts -__v -id`;
	const dept = await Dept.findById(req.params.id).populate({path: 'children parent eduHub', select: deselectStr });
	if (!dept) {
		return next(new AppError(`Dept doesn't exists!`, 404));
	}
	res.status(200).json({
		success: true,
		msg: 'Get dept',
		dept,
	});
});

exports.getAllEduHubs = catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const query = {...req.query};
    query.eduHub = null;
    query.fields = `-address,-verification,-createdAt,-contacts,-__v,-id`;
	// const features = new APIFeatures(Dept.find(), query).filter().sort().limitFields().paginate();
	const features = new APIFeatures(Dept.find(), query).filter().sort().limitFields().paginate();
	const eduHubs = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: eduHubs.length,
		eduHubs
	});
});

exports.getEduHub = catchAsync(async (req, res, next) => {
    const deselectStr = `-address -verification -createdAt -contacts -__v -id`;

    const dept = await Dept.findById(req.params.id).populate({path: 'children parent eduHub', select: deselectStr }).select(deselectStr);
    // const dept = await Dept.findById(req.params.id);
	if(!dept){
		return next(new AppError(`EduHub doesn't exists!`, 404));
    }

    if(dept.eduHub !== null){
        const eduHub = await Dept.findById(dept.eduHub).populate({path: 'children parent eduHub', select: deselectStr}).select(deselectStr);
        // const eduHub = await Dept.findById(dept.eduHub);
        if(!eduHub){
            return next(new AppError(`EduHub doesn't exists!`, 404));
        }
        res.status(200).json({
            success: true,
            msg: 'Get eduHub',
            eduHub
        });
    } else{
        res.status(200).json({
            success: true,
            msg: 'Get dept',
            eduHub: dept
        });
    }
});

 
exports.createDept = catchAsync(async (req, res, next) => {
	req.body.user = req.user._id;

	// console.log({body: req.body});

	const newDept = await Dept.create(req.body);
	if (!newDept) {
		return next(new AppError(`Department creation failed!`));
	}

	res.status(201).json({
		success: true,
		msg: 'New Dept created',
		dept: newDept,
	});
});

exports.updateDept = catchAsync(async (req, res, next) => {
	/* CAREFULLY NOTE
    - `eduHub` and `children` property can not be update manually... it will be changed automaticaly BUT...
    - IF when need to change ROOT EDUHUB that's the TERRIBLE SITUATION TO HANDLE...THIS BUG DID NOT FIXED YET
    - so that never UPDATE using req.body data without check `eduHub` and `children` property
    - always validate data before update
    */

	const dept = await Dept.findById(req.params.id);
	if (!dept) {
		return next(new AppError(`Department doesn't exist!`, 404));
	}

	// PROTECT EDUHUB DELETION/MOVE (BUG-PROTECTION)
	// A) PROTECT: DEPT -> EDUHUB
	// B) PROTECT: EDUHUB -> DEPT
	// C) PROTECT/RESTRICT: DEPT -> DEPT [IF BOTH DEPT'S `eduHub` NOT SAME THEN PROTECT]

	// CASES-COMBINATION: oldDept->newDept [0=EDUHUB, 1=DEPT]
	// 1->0:(BUG-A), 0->1:(BUG-B), 1->1:(RESTRICTED, BUG(SOME CASES)), 0->0->UNCHANGED

	const clearedData = { ...req.body };
	// console.log(`req.body: ${req.body}, clearedData: ${clearedData}, dept: ${dept}`);
    // COPY PROTECTED PROPERTY
    if(clearedData.eduHub){
        clearedData.eduHub = dept.eduHub;
    }
    if(clearedData.children){
        clearedData.children = dept.children;
    }

    // IF WANT TO MODIFY PARENT BUT NOT NULL
    if(clearedData.parent){ // Execute when: `clearedData.parent` not `null` or not `undefined`
        if (dept.parent === null) {
            // PROTECT: BUG-B: EDUHUB -> DEPT
            return next(new AppError(`Dept update failed! PROTECT: BUG-B: EDUHUB -> DEPT`, 401));
        } 
        else if(dept.parent !== null && (String(dept.parent) !== String(clearedData.parent))){
            // PROTECT/RESTRICT: BUG-C: DEPT -> DEPT [IF BOTH DEPT'S `eduHub` NOT SAME THEN PROTECT]

            const newParentDept = await Dept.findById(clearedData.parent);
            if(!newParentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));

            // C1) IF dept.eduHub !== newParentDept.eduHub THEN PROTECT
            if((newParentDept.eduHub !== null) && (String(dept.eduHub) !== String(newParentDept.eduHub))){
                return next(new AppError(`Dept update failed! PROTECT/RESTRICT: BUG-C: DEPT -> DEPT [IF BOTH DEPT'S 'eduHub' NOT SAME THEN PROTECT]`, 401));
            }

            // remove dept's id from it's parent children list
            dept.removeChildOfParentDept();
        }
    }
    else if (dept.parent !== null && clearedData.parent === null) {
        // PROTECT: BUG-A: DEPT -> EDUHUB
        return next(new AppError(`Dept update failed! PROTECT: BUG-A: DEPT -> EDUHUB`, 401));
    }

    // const updatedDept = await dept.updateOne(clearedData);
    await dept.set(clearedData);

    // NOTE: save() call need because of parent update
    const updatedAndSavedDept = await dept.save();

    // console.log(`updatedAndSavedDept: ${updatedAndSavedDept}`);
    if(!updatedAndSavedDept){
        // console.log(`updatedDept: ${updatedDept} , clearedData: ${clearedData}, dept: ${dept}`);
        return next(new AppError('Dept update faild. Fix BUG..'));
    }
    
    // Get updated Dept
    const deptUpdated = await Dept.findById(req.params.id);
	if (!deptUpdated) {
		return next(new AppError(`Department doesn't exist!`, 404));
	}


    res.status(200).json({
        success: true,
        msg: 'Department updated',
        dept: updatedAndSavedDept,
        deptUpdated,
    })
});


exports.deleteDept = catchAsync(async (req, res, next) => {
	// await Dept.findByIdAndDelete(req.params.id);
	const delDept = await Dept.findById(req.params.id);
	if (!delDept) {
		return next(new AppError(`Dept doesn't exist which want to delete!`, 404));
	}

    const status = await delDept.deleteOne();
    // console.log(`delete-status: ${status}`);

	res.status(200).json({
		success: true,
		msg: 'Department deleted',
	});
});
