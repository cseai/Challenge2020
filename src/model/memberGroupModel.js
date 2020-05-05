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

const MemberGroup = mongoose.model('MemberGroup', memberGroupSchema);

module.exports = MemberGroup;