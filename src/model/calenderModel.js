const mongoose = require('mongoose');

// Calender: It represent the Calender that includes routine/Schedule etc. # Note: it is a broad design section
const calenderSchema = new mongoose.Schema({
    // TODO: Design it later
    name: {
        type: String,
        required: [true, 'Library must have a name']
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

const Calender = mongoose.model('Calender', calenderSchema);

module.exports = Calender;
