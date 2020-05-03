const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	firstName: {
		type: String,
		requried: [true, 'User must have First Name'],
	},
	lastName: {
		type: String,
		requried: [true, 'User must have Last Name'],
	},
	contacts: [
		{
			type: {
				type: String,
				enum: ['email', 'phone', 'postal'],
				required: [true, 'use contact methods email/phone/postal'],
			},
			numbers: String,
		},
	],
	bio: {
		type: String,
		maxlength: [250, 'write your bio under 250 characters'],
	},
	birthday: {
		type: Date,
		// required: [true, 'user must have a birthday'],
	},
	presentAddress: {
		country: {
			type: String,
			required: [true, 'add your country'],
		},
		place: [
			{
				type: String,
				required: [true, 'enter your home place '],
			},
		],
		zip: {
			type: String,
			required: [true, 'need zip code '],
		},
		// coordinate: {
		// 	type: {
		// 		type: String,
		// 		default: 'Point',
		// 		enum: ['Point'],
		// 	},
		// coordinates: [Number],
		// },
	},
	// it can be null if user past and prestend address is same
	// pastAddress: {
	// 	country: {
	// 		type: String,
	// 		// required: [true, 'add your country'],
	// 	},
	// 	place: [
	// 		{
	// 			type: String,
	// 			// required: [true, 'enter your home place '],
	// 		},
	// 	],
	// 	zip: {
	// 		type: String,
	// 		// required: [true, 'need zip code '],
	// 	},
	// 	coordinate: {
	// 		type: {
	// 			type: String,
	// 			default: 'Point',
	// 			enum: ['Point'],
	// 		},
	// 		coordinates: [Number],
	// 	},
	// },
	// todo future work
	createAt: {
		type: Date,
		default: Date.now(),
	},
	updateAt: {
		type: Date,
		default: Date.now(),
	},
	// todo some keys not write i'll be work in future
});

module.exports = Profile = mongoose.model('Profile', profileSchema);
