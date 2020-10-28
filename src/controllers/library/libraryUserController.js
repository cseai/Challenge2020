const User = require('../../model/userModel');
const Library = require('../../model/libraryModel');
const MemberGroup = require('../../model/memberGroupModel');
// const APIFeatures = require('../../utils/apiFeatures');
const AppError = require('./../../utils/appError');
const catchAsync = require('./../../utils/catchAsync');

// GET | Get All Members of Library
// @route    GET /api/v1/libraries/admin/:libraryId/members
// @desc     Get All Members of Library
// @access   Private
exports.getAllMembers = catchAsync(async (req, res, next) => {
    // NOTE: This is Users of a specific Library
    
    // Get Library
	const library = await Library.findById(req.params.libraryId);
	if (!library || !library.active) {
		return next(new AppError(`Library does not exists or deactivated!`, 404));
    } else if (!library.memberGroup || library.memberGroup === null){
		return next(new AppError(`Library's memberGroup does not exists or deactivated!`, 404));
    }
    
    // Get Library Users from MemberGroup
    const memberGroup = await MemberGroup.findById(library.memberGroup).populate({
        path: 'members', 
        select: `id username email`
    });
	if (!memberGroup) {
		return next(new AppError(`MemberGroup doesn't exists!`, 404));
	}
	res.status(200).json({
		success: true,
		msg: 'Get Library Members',
		members: memberGroup.members,
	});
});

// @route    GET /api/v1/libraries/admin/:libraryId/members/:userId
// @desc     Get Member of Library
// @access   Private

exports.getMember = catchAsync(async (req, res, next) => {
    // TODO
	const user = await User.findById(req.params.userId).select('-_id -createdAt -__v');

	if (!user) {
		console.log('error from Get Member of Library');

		return next(new AppError(`User doesn't exists!`, 404));
	}
	res.status(200).json({
        success: true,
        msg: "Get User (Member)",
        user,
    });
});