const mongoose = require('mongoose');

// MemberGroup: represent collection of member in a same Dept/Org/PrivacyGroup etc. as a General Design Patern
const memberGroupSchema = new mongoose.Schema(
	{
		// NOTE: This reference should be GFK... later
		// Let's implement simple first
		dept: {
			type: mongoose.Schema.ObjectId,
			ref: 'Dept',
		},
		members: [
			{
				user: {
					type: mongoose.Schema.ObjectId,
					ref: 'User',
				},
				// Note: more property may be added later -> since, active
			},
		],
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

const MemberGroup = mongoose.model('MemberGroup', memberGroupSchema);

module.exports = MemberGroup;
