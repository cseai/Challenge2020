const Dept = require('../model/deptModel');
const MemberGroup = require('../model/memberGroupModel');
const Library = require('../model/libraryModel');
const HubTree = require('../model/hubTreeModel');
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
	const selectForRefDepts = `_id name`;
	const dept = await Dept.findById(req.params.deptId).populate({
		path: 'children parent eduHub',
		select: selectForRefDepts,
	}).populate({
		path: `memberGroup`,
		select: `_id, members`
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
	if(!query.fields){
		query.fields = `-address,-verification,-createdAt,-contacts,-__v,-id`;
	}
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
	// const selectForRefDepts = `_id name`;

	const dept = await Dept.findById(req.params.deptId);
	
	if (!dept) {
		return next(new AppError(`EduHub doesn't exists!`, 404));
	}

	if (dept.eduHub !== null) {
		const eduHub = await Dept.findById(dept.eduHub);
		
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

	// IMPORTANT: CHECK IS IT EduHub or Department
	/*
	- If EduHub that means `parent` was given in req.body and
	- so, check the requested user is a member of given parent's member
	- otherwise reject.
	- BEST PRACTISE CHECK IT FIRST FRONT-END AND ALSO CHECK IT PRE-SAVE()
	- If parent was not given then it is EduHub and then it's ok
	*/

	// IMPORTANT: Set `user` (who create) and owner-controller at `controllers`
	clearedData.user = req.user._id;
	clearedData.controllers = [{
		user: req.user._id,
		role: `owner`,
		active: true
	}]

	// Create Dept
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

	const dept = await Dept.findById(req.params.deptId);
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
	if(clearedData.controllers){
		clearedData.controllers = dept.controllers;
	}
	if(clearedData.memberGroup){
		clearedData.memberGroup = dept.memberGroup;
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
	const deptUpdated = await Dept.findById(req.params.deptId);
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
	const delDept = await Dept.findById(req.params.deptId);
	if (!delDept) {
		return next(new AppError(`Dept doesn't exist which want to delete!`, 404));
	}

	// IMPORTANT: Consedering deleting Dept...can be deactivate...think later
	const status = await delDept.deleteOne();

	res.status(200).json({
		success: true,
		msg: 'Department deleted',
	});
});


exports.traverseTree = catchAsync(async (req, res, next) => {
	const dept = await Dept.findById(req.params.deptId);
	if(!dept){
		return next(new AppError(`Dept does not exist!`, 404));
	}

	// Test of Tree Traversing
	let hubTreeObj = {
		level: 0,
		name: dept.name,
		username: dept.username,
		id: dept._id,
		children: Array()
	};
	let hubDeptList = [];
	const treeStr = await dept.traverseTree(0, `Tree of Department ${dept.name}-${dept.username}`, hubTreeObj, hubDeptList);

	console.log(treeStr);

	res.status(200).json({
		success: true,
		msg: 'Get Dept Tree',
		treeStr,
		hubTreeObj,
		hubDeptList
	});

});

exports.getOrCreateHubTree = catchAsync(async (req, res, next) => {
	const dept = await Dept.findById(req.params.deptId);
	if(!dept){
		return next(new AppError(`Dept does not exist!`, 404));
	}

	const eduHubId = dept.parent !== null ? dept.eduHub : dept._id ;

	let hubTree = await HubTree.findOne({hub: eduHubId});
	if(!hubTree){
		// EduHub Tree Traversing
		let hubTreeObj = {
			level: 0,
			name: dept.name,
			username: dept.username,
			id: dept._id,
			children: Array()
		};
		let hubDeptList = [];
		const eduHub = await Dept.findById(eduHubId); 
		const status = await eduHub.generateHubTree(0, hubTreeObj, hubDeptList);
		console.log(`status: ${status}`);

		// create HubTree
		hubTree = await HubTree.create({
			hub: eduHub._id,
			tree: hubTreeObj,
			list: hubDeptList
		});
	}

	res.status(200).json({
		success: true,
		msg: 'HubTree got',
		hubTree
	});
});


// Members
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
		// Get Library of Dept if exist
		let isLibraryExist = false;
		let library;
		if(dept.library){
			library = await Library.findById(dept.library);
			if(!library){
				return next(new AppError(`Dept's libray id exist but Library does not exist. Something went wrong.`, 500));
			}
			isLibraryExist = true;
		}

		// Copy Library controllers userId
		let libraryControllers = [];
		if(isLibraryExist){
			for(let i = 0; i < library.controllers.length; i++){
				// Store string id
				libraryControllers.push(String(library.controllers[i].user));
			}
		}

		// Copy Dept controllers userId
		let deptControllers = [];
		for(let i = 0; i < dept.controllers.length; i++){
			// Store string id
			deptControllers.push(String(dept.controllers[i].user));
		}

		// IMPORTANT: Check if these members are controllers or not...IF controllers (either Dept's or Library's controllers) THEN REJECT
		for(let i = 0; i < members.length; i++){
			// compare with string id
			if(deptControllers.includes(String(members[i]))){
				return next(new AppError(`Members can not be removed because this (${members[i]}) exists in Dept's 'controllers' section. Remove member from 'controllers' first!`, 401));
			}
			// compare with string id
			if(isLibraryExist && libraryControllers.includes(String(members[i]))){
				return next(new AppError(`Members can not be removed because this (${members[i]}) exists in Library's 'controllers' section. Remove member from 'controllers' first!`, 401));
			}
		}

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
		msg: 'Members',
		members: memberGroup.members
	});
});


// Controllers
exports.addControllers = catchAsync(async (req, res, next) => {
	const controllers = Array(...req.body.controllers);
	if(!controllers || controllers.length < 1){
		return next(new AppError(`'controllers' field is empty!...Please provide valid controllers.`, 401));
	}

	// Get Dept
	const dept = await Dept.findById(req.params.deptId);
	if(!dept || !dept.active){
		return next(new AppError(`Dept does not exists or deactivated!`, 404));
	}

	// IMPORTANT: Check Requested User is a `controller` of this Dept or not...if not then REJECT
	let isReqUserController = false;
	for(let i = 0; i < dept.controllers.length; i++){
		// compare with String id
		if(String(dept.controllers[i].user) === String(req.user._id)){
			isReqUserController = true;
			break;
		}
	}
	if(!isReqUserController){
		return next(new AppError(`Requested user must be a controller to add new controller. Permission denied`, 401));
	}

	// Get MemberGroup
	if(!dept.memberGroup){
		return next(new AppError(`Dept's MemberGroup does not exist. Something went wrong`, 500));
	}
    const memberGroup = await MemberGroup.findById(dept.memberGroup);
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
			for(let i = 0; i < dept.controllers.length; i++){
				// store as String id
				controllersUser.push(String(dept.controllers[i].user));
			}
			for(let i = 0; i < controllersToAdd.length; i++){
				// compare with String id
				if(!controllersUser.includes(String(controllersToAdd[i].user))){
					dept.controllers.push(controllersToAdd[i]);
					controllersAddedCount += 1;
				}
			}

			if(controllersAddedCount > 0){
				// Save Dept using .save()
				await dept.save();
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
		msg: 'Controllers of Dept',
		controllers: dept.controllers
	});
});


exports.removeControllers = catchAsync(async (req, res, next) => {
	// Expecting Array of userId (controller's userId)
	const controllers = Array(...req.body.controllers);
	if(!controllers || controllers.length < 1){
		return next(new AppError(`'controllers' field is empty!...Please provide valid controllers userId.`, 401));
	}

	// Get Dept
	const dept = await Dept.findById(req.params.deptId);
	if(!dept || !dept.active){
		return next(new AppError(`Dept does not exists or deactivated!`, 404));
	}

    if(controllers && controllers.length > 0){
		// Remove controller from Dept's controllers
		let controllersRemovedCount = 0;
        for(let rc_index = 0; controllers.length > rc_index; rc_index++){
			for(let dc_index = 0; dept.controllers.length > dc_index; dc_index++){
				if(String(controllers[rc_index]) === String(dept.controllers[dc_index].user)){
					// IMPORTANT: Protect from ownership deletion
					if(String(dept.controllers[dc_index].role) === 'owner'){
						return next(new AppError(`Owner can not be removed. Update the ownership first at controllers section.`, 401));
					}
					dept.controllers.splice(dc_index, 1);
					controllersRemovedCount += 1;
					break;
				}
			}
        }

        // IF Any Controller Removed THEN Save the Dept
        if(controllersRemovedCount > 0){
			// use .save()
            await dept.save();
        }
        else{
            console.log(`No controller to remove or already removed.`);
        }
    }

	res.status(200).json({
		success: true,
		msg: 'Dept Controllers',
		controllers: dept.controllers
	});
});


exports.createLibrary = catchAsync(async (req, res, next) => {
	// Get Dept
	const dept = await Dept.findById(req.params.deptId);
	if(!dept){
		return next(new AppError(`Dept does not exist`, 404));
	}

	// Check Library already exist or not
	if(dept.library){
		return next(new AppError(`Dept's Library already exist`, 401));
	}

	// Check req.user is a Controller of Dept or not
	let reqUserIsController = false;
	for(let controller_index = 0; controller_index < dept.controllers.length; controller_index++){
		if(String(dept.controllers[controller_index].user) === String(req.user._id)){
			reqUserIsController = true;
			break;
		}
	}
	if(!reqUserIsController){
		return next(new AppError(`Requested user must be controller of Dept to create a Library.`, 401));
	}

	// Copy data
	const clearedData = {...req.body}

	// Set admin-controller at `controllers`
	clearedData.controllers = [{
		user: req.user._id,
		role: `admin`,
		active: true
	}]
	// IMPORTANT: Set `dept` and `memberGroup`
	clearedData.dept = dept._id;
	clearedData.memberGroup = dept.memberGroup;

	// Create Library
	const newLibrary = await Library.create(clearedData);
	if (!newLibrary) {
		return next(new AppError(`Library creation failed!`));
	}

	// Update Dept's `library` after creating Library
	// BETTER: DO IT PRE-SAVE METHOD AT LIBRARY
	await dept.update({library: newLibrary._id});

	res.status(201).json({
		success: true,
		msg: 'New Library created',
		library: newLibrary,
	});
});