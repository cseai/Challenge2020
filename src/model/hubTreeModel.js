const mongoose = require('mongoose');

// HubTree : To store EduHub's Hierarchy for quick access
const hubTreeSchema = new mongoose.Schema({
    hub: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dept',
        unique: [true, `One EduHub can have only one HubTree.`],
        required: [true, `MemberGroup must have a Dept. Please provide Dept ID.`]
    },
    tree: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, `Can not empty!`]
    },
    list: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, `Can not empty!`]
    },
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



const HubTree = mongoose.model('HubTree', hubTreeSchema);

module.exports = HubTree;