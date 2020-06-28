import { GET_DEPT_PROFILE, DEPT_PROFILE_ERROR } from './../actions/types';
const initialState = {
	dept: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_DEPT_PROFILE:
			return {
				...state,
				dept: payload,
				loading: false,
			};
		case DEPT_PROFILE_ERROR:
			return {
				...state,
				dept: null,
				loading: true,
			};
		default:
			return state;
	}
}
