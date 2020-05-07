const mongoose = require('mongoose');
const Dept = require('./deptModel');
const AppError = require('./../utils/appError');

// MemberGroup: represent collection of member in a same Dept/Org/PrivacyGroup etc. as a General Design Patern
const memberGroupSchema = new mongoose.Schema({
    // NOTE: This reference should be GFK... later
    // Let's implement simple first 
    dept: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dept',
        required: [true, `MemberGroup must have a Dept. Please provide Dept ID.`]
    },
    members: [{
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }],
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // Note: add more if necessary
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


memberGroupSchema.pre('save', async function(next) {
    console.log(`pre-save: ${this.dept}`);
    
    /* // ERROR: TypeError: Dept.findById is not a function\n    at model.<anonymous>
    if(!this.dept){
        return next(new AppError(`Dept field required. Please provide valid 'dept' id.`, 401));
    }
    const dept = await Dept.findById(this.dept);
    if(!dept){
        return next(new AppError(`Dept does not exist. Please provide valid 'dept' id.`, 401));
    }
    */
    next();
});


memberGroupSchema.post('save', async function(doc, next) {
    console.log(`post-save: ${doc.dept}`);

    /* // ERROR: TypeError: Dept.findById is not a function\n    at model.<anonymous>
    const dept = await Dept.findById(doc.dept);
    if(!dept){
        return next(new AppError(`Dept does not exist. Something went wrong.`, 500));
    }

    // IF MemberGroup of this Dept is already exist. DELETING THIS MemberGroup
    if(dept.memberGroup && String(dept.memberGroup) !== doc._id){
        // DELETE THIS NEWLY CREATED MEMBER GROUP
        console.log(`MemberGroup of this Dept is already exist. DELETING THIS MemberGroup!!!...`);
        await doc.deleteOne();
        console.log(`DELETED!`);
        return next(new AppError(`MemberGroup of this Dept is already exist. Please provide valid 'dept' id.`, 500));
    }
    else {
        // UPDATE `Dept`'s `memberGroup`
        await dept.updateOne({memberGroup: doc._id});
    }
    */
    next();
});


/*
memberGroupSchema.methods.removeDescendentsMembers = async function(removedMembers, level, tree){
    console.log(`removedMembers=${removedMembers}`);

    // Get Dept
    const dept = await Dept.findById(this.dept);
    if(!dept){
        return new AppError(`Dept not found!... Something went wrong`, 500);
    }

    // Generating Tree
    let tab = ``;
    for(let i=1; i<=level; i++){
        tab = tab + `----`;
    }
    tree = tree + `\n` + `${level+tab}:${dept.name}`
    level = level + 1;


    for(let index=0; index < dept.children.length; index++){
        const newRemovedMembers = [];
        // Get childDept
        const childDept = await Dept.findById(dept.children[index]);
        if(!childDept){
            return new AppError(`ChildDept not found!...Something went wrong`, 500);
        }

        // Get childDept's memberGroup
        if(!childDept.memberGroup){
            return new AppError(`ChildDept's memberGroupId not found!...Something went wrong`, 500);
        }
        const memberGroup = await MemberGroup.findById(childDept.memberGroup);
        if(!memberGroup){
            return new AppError(`ChildDept's memberGroup not found!...Something went wrong`, 500);
        }

        // Check removedMembers exist or not in this memberGroup's members list
        for(let i=0; i < removedMembers.length; i++){
            let id_index = memberGroup.members.indexOf(removedMembers[i]);
            if(id_index > -1){
                // Remove this member
                // memberGroup.members.splice(id_index, 1);

                // store to remove from descendents
                newRemovedMembers.push(removedMembers[i]);
            }
        }

        if(newRemovedMembers.length > 0){
            // forward to descendent
            tree = await childDept.removeDescendentsMembers(newRemovedMembers, level, tree);
        }
    }
    return tree;
}
*/


const MemberGroup = mongoose.model('MemberGroup', memberGroupSchema);

module.exports = MemberGroup;