const mongoose = require('mongoose');

// Department: represent Department (including EduHub itself) of EduHub
const deptSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true
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
        enum: ['university', 'college', 'school', 'eduhub'],
        default: 'eduhub'
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

const Dept = mongoose.model('Dept', deptSchema);

module.exports = Dept;