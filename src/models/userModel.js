const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'User must have unique username']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'User must have unique email']
    },
    name: {
        type: String,
        trim: true,
    },
    // profileID: {
    //     type: profileSchema,  // FK # represents Profile of User... OneToOne Relation
    //     required: true,
    //     unique: true  
    // },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;