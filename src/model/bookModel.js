const mongoose = require('mongoose');

// Book: Book of a library
const bookSchema = new mongoose.Schema({
    library: {
        type: mongoose.Schema.ObjectId,
        ref: 'Library'
    },
    title: {
        type: String,
        required: [true, 'Book must have a title']
    },
    authors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Author'
    }],
    edition: {
        type: String
    },
    pagination: {
        type: String
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
    isbn: {
        type: String,
        required: [true, 'Book must have an isbn number']
        // Note: need customization later -> uniqe or not
    },
    publisher: {
        type: String
    },
    description: {
        type: String
    },
    language: {
        type: String
    },
    publicationDate: {
        type: Date
        // Note: may be it's type can be string...only YEAR and/or MONTH
    },
    lastRevisionDate: {
        type: Date
        // Note: may be it's type can be string...only YEAR and/or MONTH
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


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;