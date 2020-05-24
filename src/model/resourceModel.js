const mongoose = require('mongoose');

// Resource: Resource (without Book) of a library
const resourceScema = new mongoose.Schema({
    library: {
        type: mongoose.Schema.ObjectId,
        ref: 'Library'
    },
    title: {
        type: String,
        required: [true, 'Resource must have a title']
    },
    category: {
        type: String,
        enum: ['magazine', 'software', 'hardware', 'other'],
        required: [true, 'Resource must have a category']
    },
    accessionNumber: {
        type: String,
        // required: [true, 'Book must have an accession number']
        // Note: need customization later -> uniqe or not
    },
    callNumber: {
        type: String
    },
    copyNumber: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        quantity: Number,
        currency: String
        // Note: need discussion
    },
    barcode: {
        type: String
    },
    image: {
        type: String
        // Note: add extra property if required...like size, same image with different size
    },
    depts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Dept'
    }],
    tags: [{
        type: String
        // Note: redesign later
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    infoProvided: {
        type: Number,
        min: 0,
        max: 100,
        default: 20
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


const Resource = mongoose.model('Resource', resourceScema);

module.exports = Resource;