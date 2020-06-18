import { DARK_MODE } from './../actions/types';

export default function (state = {}, action) {
	const { type, payload } = action;
	// console.log('payload from reducer ', payload);

	switch (type) {
		case DARK_MODE:
			return { ...state, darkMode: payload };
		default:
			return state;
	}
}
