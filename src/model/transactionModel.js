const mongoose = require('mongoose');

// Transaction: Transaction of Book or Resourse in a Library
const transactionSchema = new mongoose.Schema({
    library: {
        type: mongoose.Schema.ObjectId,
        ref: 'Library'
    },
    contentType: {
        type: String,
        enum: ['book', 'resource'],
        required: [true, `Content type required`]
    },
    objectId: { 
        // NOTE: We can not give `ref`, because it is GFK ref... later it implemet
        type: mongoose.Schema.ObjectId,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
        // Note: This should be same as created at... default: Date.now()
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    comment: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    issuedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        trim: true
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


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;