const Dept = require('../model/deptModel');
const MemberGroup = require('../model/memberGroupModel');
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
	const dept = await Dept.findById(req.params.id).populate({
		path: 'children parent eduHub memberGroup',
		select: deselectStr,
	});
	if (!dept) {
		return next(new AppError(`Dept doesn't exists!`, 404));
	}
	return res.status(200).json({
		success: true,
		msg: 'Get dept',
		dept,
	});
});

exports.getAllEduHubs = catchAsync(async (req, res, next) => {
	// EXECUTE QUERY
	const query = { ...req.query };
	query.eduHub = null;
	query.fields = `-address,-verification,-createdAt,-contacts,-__v,-id`;
	// const features = new APIFeatures(Dept.find(), query).filter().sort().limitFields().paginate();
	const features = new APIFeatures(Dept.find(), query).filter().sort().limitFields().paginate();
	const eduHubs = await features.query;

	// SEND RESPONSE
	return res.status(200).json({
		success: true,
		results: eduHubs.length,
		eduHubs,
	});
});

exports.getEduHub = catchAsync(async (req, res, next) => {
	const deselectStr = `-address -verification -createdAt -contacts -__v -id`;

	const dept = await Dept.findById(req.params.id)
		.populate({ path: 'children parent eduHub memberGroup', select: deselectStr })
		.select(deselectStr);
	// const dept = await Dept.findById(req.params.id);
	if (!dept) {
		return next(new AppError(`EduHub doesn't exists!`, 404));
	}

	if (dept.eduHub !== null) {
		const eduHub = await Dept.findById(dept.eduHub)
			.populate({ path: 'children parent eduHub memberGroup', select: deselectStr })
			.select(deselectStr);
		// const eduHub = await Dept.findById(dept.eduHub);
		if (!eduHub) {
			return next(new AppError(`EduHub doesn't exists!`, 404));
		}
		res.status(200).json({
			success: true,
			msg: 'Get eduHub',
			eduHub,
		});
	} else {
		res.status(200).json({
			success: true,
			msg: 'Get dept',
			eduHub: dept,
		});
	}
});

exports.createDept = catchAsync(async (req, res, next) => {
	const clearedData = {...req.body}
	clearedData.user = req.user._id;

	const newDept = await Dept.create(clearedData);
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
	if (clearedData.eduHub) {
		clearedData.eduHub = dept.eduHub;
	}
	if (clearedData.children) {
		clearedData.children = dept.children;
	}

	// IF WANT TO MODIFY PARENT BUT NOT NULL
	if (clearedData.parent) {
		// Execute when: `clearedData.parent` not `null` or not `undefined`
		if (dept.parent === null) {
			// PROTECT: BUG-B: EDUHUB -> DEPT
			return next(new AppError(`Dept update failed! PROTECT: BUG-B: EDUHUB -> DEPT`, 401));
		} else if (dept.parent !== null && String(dept.parent) !== String(clearedData.parent)) {
			// PROTECT/RESTRICT: BUG-C: DEPT -> DEPT [IF BOTH DEPT'S `eduHub` NOT SAME THEN PROTECT]

			const newParentDept = await Dept.findById(clearedData.parent);
			if (!newParentDept) return next(new AppError(`Parent doesn't exist. Dept updation failed!`, 404));

			// C1) IF dept.eduHub !== newParentDept.eduHub THEN PROTECT
			if (newParentDept.eduHub !== null && String(dept.eduHub) !== String(newParentDept.eduHub)) {
				return next(
					new AppError(
						`Dept update failed! PROTECT/RESTRICT: BUG-C: DEPT -> DEPT [IF BOTH DEPT'S 'eduHub' NOT SAME THEN PROTECT]`,
						401
					)
				);
			}

			// remove dept's id from it's parent children list
			dept.removeChildOfParentDept();
		}
	} else if (dept.parent !== null && clearedData.parent === null) {
		// PROTECT: BUG-A: DEPT -> EDUHUB
		return next(new AppError(`Dept update failed! PROTECT: BUG-A: DEPT -> EDUHUB`, 401));
	}

	// const updatedDept = await dept.updateOne(clearedData);
	await dept.set(clearedData);

	// NOTE: save() call need because of parent update
	const updatedAndSavedDept = await dept.save();

	// console.log(`updatedAndSavedDept: ${updatedAndSavedDept}`);
	if (!updatedAndSavedDept) {
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
	});
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


exports.traverseTree = catchAsync(async (req, res, next) => {
	const dept = await Dept.findById(req.params.id);
	if(!dept){
		return next(new AppError(`Dept does not exist!`, 404));
	}
	// Test of Tree Traversing
	const tree = await dept.traverseTree(0, `Tree of Department ${dept.name}-${dept.username}`);

	console.log(tree);

	res.status(200).json({
		success: true,
		msg: 'Get Dept Tree',
		tree
	});

});


exports.addMembers = catchAsync(async (req, res, next) => {
	const members = Array(...req.body.members);
	if(!members || members.length < 1){
		return next(new AppError(`members field is empty!...Please provide valid members.`, 401));
	}

	// Get Dept
	const dept = await Dept.findById(req.params.deptId);
	if(!dept || !dept.active){
		return next(new AppError(`Dept does not exists or deactivated!`, 404));
	}

	// Get MemberGroup
	if(!dept.memberGroup){
		return next(new AppError(`Dept's MemberGroup does not exist. Something went wrong`, 500));
	}
    const memberGroup = await MemberGroup.findById(dept.memberGroup);
	if (!memberGroup || !memberGroup.active) {
		return next(new AppError(`MemberGroup doesn't exists or deactivated!`, 404));
    }
    
    if(members && members.length > 0){
        let membersToAdd = [];
        for(let index=0; members.length > index; index++){
            if(!memberGroup.members.includes(members[index])){
                // Here check member (User) is exist or not
                const user = await User.findById(members[index]);
                // console.log(`user:${user}`);
                if(!user){
                    return next(new AppError(`Provided User Does not exist. Please provide valid userId.`, 401));
                }
                membersToAdd.push(members[index]);
            }
        }

        if(membersToAdd.length > 0){
            // Now validate members that it can be added or be rejected acording to `EduHub` rules
            if(dept.parent !== null){
                // Get parenDept's memberGroup
                const parentMemberGroup = await MemberGroup.findOne({dept: dept.parent});
                if(!parentMemberGroup){
                    return next(new AppError(`Parent Dept's MemberGroup does not exist. Something went wrong`, 500));
                }
                // user can be added if same user is member of it's parent Dept's member... check it here
                for(let index=0; membersToAdd.length > index; index++){
                    if(!parentMemberGroup.members.includes(membersToAdd[index])){
                        return next(new AppError(`Provided User (id:${membersToAdd[index]}) is not a member of ParentDept. Please provide valid userId.`, 401));
                    }
                }
            }

            const addedCount = memberGroup.members.push(...membersToAdd);
            console.log(`Members addedCount:${addedCount}`);
            await memberGroup.save();
        }
        else{
            console.log(`No Members to add or already exist.`);
        }
    }

	res.status(200).json({
		success: true,
		msg: 'Get MemberGroup',
		members: memberGroup.members
	});
});


exports.removeMembers = catchAsync(async (req, res, next) => {
	const members = Array(...req.body.members);
	if(!members || members.length < 1){
		return next(new AppError(`members field is empty!...Please provide valid members.`, 401));
	}

	// Get Dept
	const dept = await Dept.findById(req.params.deptId);
	if(!dept || !dept.active){
		return next(new AppError(`Dept does not exists or deactivated!`, 404));
	}

	// Get MemberGroup
	if(!dept.memberGroup){
		return next(new AppError(`Dept's MemberGroup does not exist. Something went wrong`, 500));
	}
    const memberGroup = await MemberGroup.findById(dept.memberGroup);
	if (!memberGroup || !memberGroup.active) {
		return next(new AppError(`MemberGroup doesn't exists or deactivated!`, 404));
    }

    const removedMembers = [];
    if(members && members.length > 0){
		// Remove member from Dept's MemberGroup
        for(let index=0; members.length > index; index++){
            let id_index = memberGroup.members.indexOf(members[index]);
            if(id_index > -1){
                memberGroup.members.splice(id_index, 1);
                removedMembers.push(members[index]);
            }
        }

        // IF Any User Removed THEN save the MemberGroup
        if(removedMembers.length > 0){
            await memberGroup.save();
            const tree = await dept.removeDescendentsMembers(removedMembers, 0, '');
            console.log(`tree=${tree}`);
        }
        else{
            console.log(`No Members to remove or already removed.`);
        }
    }

	res.status(200).json({
		success: true,
		msg: 'Get MemberGroup',
		members: memberGroup.members
	});
});