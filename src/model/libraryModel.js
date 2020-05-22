const mongoose = require('mongoose');

// Library: Library is a broad concept in this project # A Library can be part of Dept/Org etc.
const librarySchema = new mongoose.Schema({
    dept: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dept',
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Library must have a name']
    },
    username: {
        type: String,
        unique: [true, 'Library username must be unique']
        // Note: set random unique username when it first create
    },
    coverImage: {
        type: String,
        // TODO: design it
    },
    profileImage: {
        type: String,
        // TODO: design it
    },
    since: {
        type: Date // Note: The date when this dept established
    },
    shortDescription: {
        type: String, // Note: Short Description about this dept.
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
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: [Number],
    },
    controllers: [{ // NOTE: Only librarian who controle library belongs here
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        role: {
            type: String,
            enum: ['superadmin', 'admin', 'moderator', 'librarian', 'staff'],
            default: 'librarian',
        },
        active: {
            type: Boolean,
            default: true
        }
    }],
    memberGroup: {
        // Same as Dept's `memberGroup`... and always ref same `MemberGroup` for Dept and Library
        type: mongoose.Schema.ObjectId,
        ref: 'MemberGroup' // FK # discussion required
        // NOTE: It should redesign to maintain Transactions... discussion required
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
    // Note: add more if necessary
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;