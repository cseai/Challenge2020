const mongoose = require('mongoose');

// Author: Author of Book or...(consider later)
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Author must have a name'],
    },
    nicname: {
        type: String
        // Note: remove it if you think unnecessary
    },
    verified: {
        type: Boolean,
        default: false
        // Note: How can be verified... think later
    },
    realUser: {
        // If Author is a `User` too
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Author gender is required field']
    },
    bio: {
        type: String
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
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
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
        // TODO: Make it autoupdate
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


const Author = mongoose.model('Author', authorSchema);

module.exports = Author;