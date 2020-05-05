const router = require('express').Router();
const memberGroupController = require('./../controllers/memberGroupController');

router.route('/addmembers/:id').patch(memberGroupController.addMembersAtMemberGroup);
router.route('/removemembers/:id').patch(memberGroupController.removeMembersAtMemberGroup);

router.route('/')
    .get(memberGroupController.getAllMemberGroups)
    .post(memberGroupController.createMemberGroup);

router.route('/:id')
    .get(memberGroupController.getMemberGroup)
    .delete(memberGroupController.deleteMemberGroup);

module.exports = router;