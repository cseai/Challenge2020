import { GET_EDUHUB_PROFILE, EDUHUB_PROFILE_ERROR, LOGOUT } from './../actions/types';

const initialState = {
	eduhub: null,
	loading: true,
	error: {},
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	// console.log('payload from reducer ', payload);

	switch (type) {
		case GET_EDUHUB_PROFILE:
			return { ...state, eduhub: payload, loading: false };
		case LOGOUT:
		case EDUHUB_PROFILE_ERROR:
			return {
				...state,
				eduhub: null,
				loading: true,
				error: {},
			};
		default:
			return state;
	}
}
