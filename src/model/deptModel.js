const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


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
    controllers: [{ // NOTE: Only admin,moderator,woner belongs here
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
            default: false
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
    console.log(`pre-save: ${this.username}`);

    // 1) DEPT
    // 1A) If parent was set, then check is it exists or not and add this to parents children... else Error
    if(this.parent){
        const parentDept = await Dept.findById(this.parent);
        if(!parentDept) return next(new AppError(`Parent dept doesn't exist`, 404));

        this.eduHub =  parentDept.parent !== null ? parentDept.eduHub : parentDept._id ;

        // If eduHub was not set, then set it from parent EduHub
        // if(this.eduHub !== null){
        //     // Check if parent-dept is a  Dept or EduHub
        //     // a) Dept 
        //     if(parentDept.eduHub !== null){
        //         // set this dept's eduHub to it's parent eduHub
        //         this.eduHub = parentDept.eduHub;
        //     }else{
        //         // that means parent is actual EduHub
        //         // so set this dept's eduHub to it's parent's _id
        //         this.eduHub = parentDept._id;
        //         // console.log(`parentDept._id=${parentDept._id}`);
        //     }
        // } else if(this.eduHub === null){
        //     // this.eduHub =  parentDept.parent !== null ? parentDept.eduHub : parentDept._id ;
        // }
    } else {  // 2) EDUHUB
        //check if it's eduHub set...THEN set it NULL
        this.eduHub = null;
        this.parent = null;
        // return next(new AppError(`Department's Parent dept doesn't exist`, 404));
    }

    next();
});


deptSchema.post('save', async function(doc, next) {
    console.log(`post-save: doc=${doc.name}`);
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
    // console.log(`children: ${this.children}.`);
    if(this.children.length > 0){
        return next(new AppError('Dept could not be deleted if it has children. Please configure child-dept first.', 401));
    }
    console.log(`pre-del: Dept [${this.name}] will be deleted.`);
    next();
});

deptSchema.post('deleteOne', { document: true }, async function() {
    // Runs when you call `doc.deleteOne()`

    // 1) If it's had parent then remove it's id from parent-dept's children list
    if(this.parent !== null){
        const parentDept = await Dept.findById(this.parent);

        // console.log(`post-del => id: ${this._id}, children(before removed): ${parentDept.children}`);

        const id_index = parentDept.children.indexOf(this._id);
        if(id_index > -1){
            parentDept.children.splice(id_index, 1);
            parentDept.save();
            // console.log(`post-del => id: ${this._id}, children(after removed): ${parentDept.children}`);
        }
    }
    console.log(`post-del: Dept [${this.name}] deleted.`);
});

deptSchema.methods.removeChildLink = async function(){
    console.log(`Removing child=${this.name} from it's parent child list...`);
    
    if(!this.parent) return;

    const parentDept = await Dept.findById(this.parent);
    if(!parentDept) return new AppError(`Parent doesn't exist... child remove faild!`, 404);

    const id_index = parentDept.children.indexOf(this._id);
    if(id_index > -1){
        parentDept.children.splice(id_index, 1);
        parentDept.save();
        // console.log(`post-del => id: ${this._id}, children(after removed): ${parentDept.children}`);
    }

    return;
}

const Dept = mongoose.model('Dept', deptSchema);

module.exports = Dept;