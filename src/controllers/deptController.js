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
    - `eduHub` and `children` property can not be update manually... it will be changed automaticaly BUT...
    - IF when need to change ROOT EDUHUB that's the TERRIBLE SITUATION TO HANDLE...THIS BUG DID NOT FIXED YET
    - so that never UPDATE using req.body data without check `eduHub` and `children` property
    - always validate data before update
    */
    
    const dept = await Dept.findById(req.params.id);
    if(!dept){
        return next(new AppError(`Department doesn't exist!`, 404));
    }


    // PROTECT EDUHUB DELETION/MOVE (BUG-PROTECTION)
    // A) PROTECT: DEPT -> EDUHUB
    // B) PROTECT: EDUHUB -> DEPT
    // C) PROTECT/RESTRICT: DEPT -> DEPT [IF BOTH DEPT'S `eduHub` NOT SAME THEN PROTECT]
    
    // CASES-COMBINATION: oldDept->newDept [0=EDUHUB, 1=DEPT]
    // 1->0:(BUG-A), 0->1:(BUG-B), 1->1:(RESTRICTED, BUG(SOME CASES)), 0->0->UNCHANGED

    
    const clearedData = {...req.body};
    // console.log(`req.body: ${req.body}, clearedData: ${clearedData}, dept: ${dept}`);
    // COPY PROTECTED PROPERTY
    clearedData.eduHub = dept.eduHub;
    clearedData.children = dept.children;

    // NOTE: This is dangarous buggy code.... somehow pre-update doesn't work, so this way
    if(dept.parent !== null && clearedData.parent === null){
        // PROTECT: BUG-A: DEPT -> EDUHUB
        return next(new AppError(`Dept update failed! PROTECT: BUG-A: DEPT -> EDUHUB`, 401));
        /*
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
        */
    } else if(dept.parent === null && clearedData.parent !== null){
        // PROTECT: BUG-B: EDUHUB -> DEPT
        return next(new AppError(`Dept update failed! PROTECT: BUG-B: EDUHUB -> DEPT`, 401));
        /*
        const newParentDept = await Dept.findById(clearedData.parent);
        if(!newParentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));
        
        // set eduHub id
        clearedData.eduHub = newParentDept.parent !== null ? newParentDept.eduHub : newParentDept._id ;

        // add children to newParentDept's children list
        if(!newParentDept.children.includes(dept._id)){
            newParentDept.children = [...newParentDept.children, dept._id];
            const obj = await newParentDept.save();
            // console.log({parentObjSaved: obj});
        }
        */
    } else if((dept.parent !== clearedData.parent) && dept.parent !== null && clearedData.parent !== null){
        // PROTECT/RESTRICT: BUG-C: DEPT -> DEPT [IF BOTH DEPT'S `eduHub` NOT SAME THEN PROTECT]
        
        // BUT ONE BUG REMAINING: 
        // When changing dept-parent in case-BUG-C old-parent's children didn't remove...NEED TO FIX
        
        const newParentDept = await Dept.findById(clearedData.parent);
        if(!newParentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));
        // C1) IF dept.eduhub !== newParentDept.eduHub THEN PROTECT
        if((dept.eduhub !== newParentDept.eduHub) && (newParentDept.eduHub !== null)){
            return next(new AppError(`Dept update failed! PROTECT/RESTRICT: BUG-C: DEPT -> DEPT [IF BOTH DEPT'S 'eduHub' NOT SAME THEN PROTECT]`, 401));
        }

        // const newParentDept = await Dept.findById(clearedData.parent);
        // if(!newParentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));

        // set eduHub id
        // clearedData.eduHub = newParentDept.parent !== null ? newParentDept.eduHub : newParentDept._id ;
        
        // add children to newParentDept's children list
        if(!newParentDept.children.includes(dept._id)){
            newParentDept.children = [...newParentDept.children, dept._id];
            const obj = await newParentDept.save();
            // console.log({parentObjSaved: obj});
        }

        const oldParentDept = await Dept.findById(dept.parent);
        if(!oldParentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));

        // remove children from old parent
        const id_index = oldParentDept.children.indexOf(dept._id);
        if(id_index > -1){
            oldParentDept.children.splice(id_index, 1);
            oldParentDept.save();
        }
    }



    // const updatedDept = await dept.update(clearedData); // deprecated
    const updatedDept = await dept.updateOne(clearedData);
    // NOTE: save() call need because of parent update

    const updatedAndSavedDept = await dept.save();

    console.log(`updatedAndSavedDept: ${updatedAndSavedDept}`);
    if(!updatedAndSavedDept){
        // console.log(`updatedDept: ${updatedDept} , clearedData: ${clearedData}, dept: ${dept}`);
        return next(new AppError('Dept update faild. Fix BUG..'));
    }

    // console.log(`updatedDept: ${updatedDept} , clearedData: ${clearedData}, dept: ${dept}`);

    res.status(200).json({
        success: true,
        msg: 'Department updated',
        dept: updatedAndSavedDept
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