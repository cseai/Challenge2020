import { DARK_MODE } from './../actions/types';

const initialState = {
	darkMode: localStorage.getItem('theme'),
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	console.log('payload from reducer ', payload);

	switch (type) {
		case DARK_MODE:
			return { ...state, darkMode: payload };
		default:
			return state;
	}
}
