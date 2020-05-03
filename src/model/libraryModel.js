const mongoose = require('mongoose');

// Library: Library is a broad concept in this project # A Library can be part of Dept/Org etc.
const librarySchema = new mongoose.Schema(
	{
		// TODO: Design it later
		name: {
			type: String,
			required: [true, 'Library must have a name'],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		// Note: add more if necessary
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
