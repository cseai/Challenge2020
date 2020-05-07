const MemberGroup = require('../model/memberGroupModel');
const Dept = require('../model/deptModel');
const User = require('../model/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllMemberGroups = catchAsync(async (req, res, next) => {
	// EXECUTE QUERY
	const features = new APIFeatures(MemberGroup.find().populate({path: 'dept', select: `_id name eduHub controllers`}), req.query).filter().sort().limitFields().paginate();
	const memberGroups = await features.query;

	// SEND RESPONSE
	res.status(200).json({
		success: true,
		results: memberGroups.length,
		memberGroups,
	});
});

exports.getMemberGroup = catchAsync(async (req, res, next) => {
    const memberGroup = await MemberGroup.findById(req.params.id).populate({path: 'dept', select: `_id name eduHub controllers`});
	if (!memberGroup) {
		return next(new AppError(`MemberGroup doesn't exists!`, 404));
	}
	res.status(200).json({
		success: true,
		msg: 'Get MemberGroup',
		memberGroup,
	});
});

exports.createMemberGroup = catchAsync(async (req, res, next) => {
    const clearedData = {...req.body};
    if(!clearedData.dept){
        return next(new AppError(`Dept field required. Please provide valid 'dept' id.`, 401));
    }

    // PRE-SAVE PART
    // if(!clearedData.dept){
    //     return next(new AppError(`Dept field required. Please provide valid 'dept' id.`, 401));
    // }
    const dept = await Dept.findById(clearedData.dept);
    if(!dept){
        return next(new AppError(`Dept does not exist. Please provide valid 'dept' id.`, 401));
    }
    // PRE-SAVE END

	const newMemberGroup = await MemberGroup.create(clearedData);
	if (!newMemberGroup) {
		return next(new AppError(`MemberGroup creation failed!`, 500));
    }
    
    // POST-SAVE PART
    // const dept = await Dept.findById(doc.dept);
    // if(!dept){
    //     return next(new AppError(`Dept does not exist. Something went wrong.`, 500));
    // }

    // IF MemberGroup of this Dept is already exist. DELETING THIS MemberGroup
    if(dept.memberGroup && String(dept.memberGroup) !== String(newMemberGroup._id)){
        // DELETE THIS NEWLY CREATED MEMBER GROUP
        console.log(`MemberGroup of this Dept is already exist. DELETING THIS MemberGroup!!!...`);
        await newMemberGroup.deleteOne();
        console.log(`DELETED!`);
        return next(new AppError(`MemberGroup of this Dept is already exist. Please provide valid 'dept' id.`, 500));
    }
    else {
        // UPDATE `Dept`'s `memberGroup`
        await dept.updateOne({memberGroup: newMemberGroup._id});
    }
    // POST-SAVE END

	res.status(201).json({
		success: true,
		msg: 'New MemberGroup created',
		memberGroup: newMemberGroup,
	});
});

exports.addMembersAtMemberGroup = catchAsync(async (req, res, next) => {
    const memberGroup = await MemberGroup.findById(req.params.id);
	if (!memberGroup || !memberGroup.active) {
		return next(new AppError(`MemberGroup doesn't exists or deactivated!`, 404));
    }
    
    const members = Array(...req.body.members);
    
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
            const dept = await Dept.findById(memberGroup.dept);
            if(!dept){
                return next(new AppError(`MemberGroup's Dept does not exist. Something went wrong`, 500));
            }
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
		memberGroup,
	});
});

exports.removeMembersAtMemberGroup = catchAsync(async (req, res, next) => {
    const memberGroup = await MemberGroup.findById(req.params.id);
	if (!memberGroup) {
		return next(new AppError(`MemberGroup doesn't exists!`, 404));
    }

    const members = req.body.members;
    const removedMembers = [];
    if(members && members.length > 0){
        // count how many removed
        // let removeCount = 0;

        for(let index=0; members.length > index; index++){
            let id_index = memberGroup.members.indexOf(members[index]);
            if(id_index > -1){
                memberGroup.members.splice(id_index, 1);
                // removeCount += 1;
                removedMembers.push(members[index]);
            }
        }

        // IF Any User Removed THEN save the MemberGroup
        if(removedMembers.length > 0){
            await memberGroup.save();
            const result = await memberGroup.removeDescendentsMembers(removedMembers=removedMembers, level=0, tree='');
            console.log(`result=${result}`);
        }
        else{
            console.log(`No Members to remove or already removed.`);
        }
    }

	res.status(200).json({
		success: true,
		msg: 'Get MemberGroup',
		memberGroup,
	});
});


exports.deleteMemberGroup = catchAsync(async (req, res, next) => {
    const delMemberGroup = await MemberGroup.findById(req.params.id);
	if (!delMemberGroup) {
		return next(new AppError(`MemberGroup doesn't exist which want to delete!`, 404));
	}

    const dept = await Dept.findByIdAndUpdate(delMemberGroup.dept, {memberGroup: null});
    // MemberGroup active but dept not exist...ERROR
    if(!dept && delMemberGroup.active){
        return next(new AppError(`Active MemberGroup's Dept doesn't exist!!. Something went wrong!`, 500));
    }

    await delMemberGroup.deleteOne();

	res.status(200).json({
		success: true,
		msg: 'MemberGroup deleted',
	});
});