const mongoose = require('mongoose');
const MemberGroup = require('./memberGroupModel');
const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');


// Department: represent Department (including EduHub itself) of EduHub
const deptSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Department must have an username.']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Department must have an name.']
    },
    eduHub: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dept'  // FK # null when it is EduHub
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dept' // FK # null when it is EduHub
    },
    children: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Dept'
        }
    ], // FK # list of direct-child
    category: {
        type: String,     // Note: may be update later # i.e. school/college/university etc.
        enum: ['university', 'college', 'school', 'eduHub'],
        default: 'eduHub'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // FK # User who created this dept
        required: [true, 'Dept must have an user']
    },
    controllers: [{ // NOTE: Only admin,moderator,owner belongs here
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        role: {
            type: String,
            enum: ['admin', 'moderator', 'owner'],
            default: 'moderator',
        },
        active: {
            type: Boolean,
            default: true
        }
    }],
    memberGroup: {
        type: mongoose.Schema.ObjectId,
        ref: 'MemberGroup' // FK # discussion required
    },
    address: {
        country: {
            type: String,
            trim: true,
            // required: true,
        },
        line1: {
            type: String,
            trim: true,
            // required: true,
        },
        line2: {
            type: String,
            trim: true
        },
        zip: {
            type: String,
            trim: true
        },
        // GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
    },
    since: {
        type: Date // Note: The date when this dept established
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    contacts: [{
        method: {
            type: String, // Note: Method could be i.e. mobile/phone/email/fax/postal etc.
            enum: ['mobile', 'phone', 'email'],
            required: [true, 'Contact must have a method type!']
        },
        numbers: [{
            number: {
                type: String, // Note: i.e. mobile/phone/email/fax/postal etc. number as string
                required: true
            },
            description: {
                type: String, // Note: About this contact information i.e. name/schedule/office etc.
                trim: true
            },
            active: {
                type: Boolean,
                default: true
            }
            // TODO: Privacy i.e. public/inner etc.
        }]
    }],
    coverImage: {
        type: String,
        // TODO: design it
    },
    profileImage: {
        type: String,
        // TODO: design it
    },
    shortDescription: {
        type: String, // Note: Short Description about this dept.
    },
    verification: {
        verified: {
            type: Boolean,
            default: false
        },
        verificationDate: {
            type: Date, 
        }
        // TODO: add more like... verifiedBy, certificate etc. 
    },
    calender: {
        type: mongoose.Schema.ObjectId,
        ref: 'Calender', // FK # Calender manage routine/schedule etc.
    },
    library: {
        type: mongoose.Schema.ObjectId,
        ref: 'Library', // FK # A Library can be part of Dept/Org etc.
    },
    // Note: add more if necessary
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


deptSchema.pre('save', async function(next) {
    console.log(`pre-save: ${this.name}`);

    // 1) DEPT
    // 1A) If parent was set, then check is it exists or not and add this to parents children
    // and check req.user is a member of parentDept also otherwise reject... else Error
    if(this.parent){
        const parentDept = await Dept.findById(this.parent);
        if(!parentDept) return next(new AppError(`Parent dept doesn't exist`, 404));

        // IMPORTANT: CHECK IS IT EduHub or Department
        /*
        - If EduHub that means `parent` was given in req.body and
        - so, check the requested user is a member of given parent's member
        - otherwise reject.
        - If parent was not given then it is EduHub and then it's ok
        - IT'S BATTER TO CHECK IT AT CONTROLLER SECTION...BECAUSE EVERYTIME IT SAVE() THIS WILL CALL...
        - AND ALSO CHECK IT HERE OTHERWISE IT CAN BE VALNARABLE SITUATION
        */
        const parentMemberGroup = await MemberGroup.findById(parentDept.memberGroup);
        if(!parentMemberGroup) return next(new AppError(`Parent dept's MemberGroup doesn't exist. Something went wrong.`, 500));

        if(!parentMemberGroup.members.includes(this.user)){
            return next(new AppError(`Requested user is not a member of Parent dept. (Please validate it front-end site.). Permission denied`, 401));
        }

        // Set eduHub
        this.eduHub =  parentDept.parent !== null ? parentDept.eduHub : parentDept._id ;

        // Categry all be same as parentDept
        this.category = parentDept.category;
    } 
    else {  // 2) EDUHUB
        //set as EduHub
        this.eduHub = null;
        this.parent = null;
    }

    next();
});


deptSchema.post('save', async function(doc, next) {
    console.log(`post-save: ${doc.name}`);
    // Check if dept has parent and then that parent's chiled is this dept
    if(doc.parent){
        const parentDept = await Dept.findById(doc.parent);
        // console.log({dept: doc});

        if(!parentDept.children.includes(doc._id)){
            parentDept.children = [...parentDept.children, doc._id];
            const obj = await parentDept.save();
            // console.log({parentObjSaved: obj});
        }
    }

    // Check if it has a MemberGroup or not
    if(!doc.memberGroup){
        //Create a MemberGroup and add owner-user to MemberGroup
        if(!doc.controllers[0].role || doc.controllers[0].role !== 'owner'){
            return next(new AppError(`Dept's OWNER doesn't exist!! Something went VERY wrong!!`, 500));
        }
        const ownerUser = doc.controllers[0].user;
        const memberGroup = await MemberGroup.create({dept: doc._id, members: [ownerUser]});
        if(!memberGroup){
            return next(new AppError(`Dept's MemberGroup creation faild!! Something went wrong!!`, 500));
        }
        await doc.updateOne({memberGroup: memberGroup._id});
    }

    next();
});


/*
updateOne: https://mongoosejs.com/docs/middleware.html#notes
However, if you define pre('updateOne') document middleware, this will be the document being updated. 
That's because pre('updateOne') document middleware hooks into Document#updateOne() rather than Query#updateOne().
*/
deptSchema.pre('updateOne', { document: true, query: false }, function() {
    console.log(`pre-updateOne-> Updating this(which will be updated): ${this.name}`);
});

deptSchema.post('updateOne', { document: true, query: false }, function() {
    console.log(`post-updateOne-> Updated this(which will be updated): ${this.name}`);
});


deptSchema.pre('deleteOne', { document: true }, async function(next) {
    // Runs when you call `doc.deleteOne()`

    // 1) If it has children... then configure child-dept first.
    if(this.children.length > 0){
        return next(new AppError('Dept could not be deleted if it has children. Please configure child-dept first.', 401));
    }
    console.log(`pre-del: Dept [${this.name}] will be deleted.`);
    next();
});

deptSchema.post('deleteOne', { document: true }, async function(next) {
    // Runs when you call `doc.deleteOne()`

    // 1) If it's had parent then remove it's id from parent-dept's children list
    if(this.parent !== null){
        const parentDept = await Dept.findById(this.parent);
        if(!parentDept){
            return next(new AppError(`ParentDept of does not exist. When deleted one who had parnetID!`, 500));
        }

        const id_index = parentDept.children.indexOf(this._id);
        if(id_index > -1){
            parentDept.children.splice(id_index, 1);
            parentDept.save();
        }
    }

    // 2) If it's had MemberGroup then delete/deactivate it
    if(this.memberGroup){
        const memberGroup = await MemberGroup.findById(this.memberGroup);
        if(!memberGroup){
            return next(new AppError(`Referenced MemberGroup of this Dept does not exist. Somthing went wrong!!!`, 500));
        }
        // Deactivate MemberGroup
        await memberGroup.updateOne({active: false});
    }

    console.log(`post-del: Dept [${this.name}] deleted.`);
});

deptSchema.methods.removeChildOfParentDept = async function(){
    if(this.parent){
        const parentDept = await Dept.findById(this.parent);
        if(!parentDept) return new AppError(`Parent doesn't exist... child remove faild!`, 500);

        console.log(`Removing child=${this.name} from it's parent child list...`);

        const id_index = parentDept.children.indexOf(this._id);
        if(id_index > -1){
            parentDept.children.splice(id_index, 1);
            parentDept.save();
        }
    }else{
        return new AppError(`Parent doesn't exist of Dept: ${this.name}... child remove faild!`, 500);
    }
    return;
}


deptSchema.methods.traverseTree = async function(level, tree, treeMap){
    let tab = ``;
    for(let i=1; i<=level; i++){
        tab = tab + `----`;
    }
    tree = tree + `\n` + `${level+tab}:${this.name}`
    // console.log(`${level+tab}:${this.name}`);


    // treeMap.push(this.name);
    // console.log(`L=${level}, and Map= ${treeMap}`)

    level = level + 1;

    // DO SOMETHIN HERE IF NEED
    // START
    // configure controllers and membergroup for owner user
    /*
    const ownerUser = this.user;
    const controllers = [{
        user: ownerUser,
        role: 'owner',
        active: true
    }]
    
    const memberGroup = await MemberGroup.findById(this.memberGroup);
    if(!memberGroup.members.includes(ownerUser)){
        memberGroup.members.push(ownerUser);
        const mg = await memberGroup.save();
    }
    // IMPORTANT: it will remove all previous controllers and set only owner controller
    await this.updateOne({controllers: controllers});
    */

    // Generate JSON-Tree Map




    // END

    for(let index=0; index < this.children.length; index++){
        // console.log(`l=${level} & i=${index}:${this.children[index]._id}`);
        const dept = await Dept.findById(this.children[index]._id);
        // console.log(`dept:${dept.name}`);
        tree = await dept.traverseTree(level, tree, treeMap);
    }
    return tree;
}


deptSchema.methods.removeDescendentsMembers = async function(removedMembers, level, tree){
    console.log(`removedMembers=${removedMembers}`);

    // Generating Tree
    let tab = ``;
    for(let i=1; i<=level; i++){
        tab = tab + `----`;
    }
    tree = tree + `\n` + `${level+tab}:${this.name}`
    level = level + 1;


    for(let index=0; index < this.children.length; index++){
        const newRemovedMembers = [];
        // Get childDept
        const childDept = await Dept.findById(this.children[index]);
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
                memberGroup.members.splice(id_index, 1);

                // store to remove from descendents
                newRemovedMembers.push(removedMembers[i]);
            }
        }

        if(newRemovedMembers.length > 0){
            // Save memberGroup
            await memberGroup.save();
            
            // forward to descendent
            tree = await childDept.removeDescendentsMembers(newRemovedMembers, level, tree);
        }
    }
    return tree;
}


const Dept = mongoose.model('Dept', deptSchema);

module.exports = Dept;