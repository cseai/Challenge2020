const router = require('express').Router();
const memberGroupController = require('./../controllers/memberGroupController');

// Do Not Use these two route...It will be handled by Dept Route
// router.route('/addmembers/:id').patch(memberGroupController.addMembersAtMemberGroup);
// router.route('/removemembers/:id').patch(memberGroupController.removeMembersAtMemberGroup);

router.route('/')
    .get(memberGroupController.getAllMemberGroups);
    // Do Not Use this route...It will be handled by Dept Route
    // .post(memberGroupController.createMemberGroup);

router.route('/:mgId')
    .get(memberGroupController.getMemberGroup);
    // Do Not Use this route...It will be handled by Dept Route
    // .delete(memberGroupController.deleteMemberGroup);

module.exports = router;