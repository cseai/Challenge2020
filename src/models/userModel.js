const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'User must have unique username']
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'User must have unique email'],
        // https://stackoverflow.com/a/1373724/8520849
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordChangedAt: Date,  // Note: Need for secure authentication
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

userSchema.pre('save', async function(next) {
    // Only run this function if the password was actually modified
	// NOTE: one issue-> update will not call pre-save middleware.... should change.... i.e. changing password
    if(!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        
        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;