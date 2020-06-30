import { GET_DEPT_PROFILE, GET_DEPT_PROFILE_SUCCESS, DEPT_PROFILE_ERROR, DEPT_PROFILE_ERROR_404 } from './../actions/types';
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
				dept: null,
				loading: true,
			};
		case GET_DEPT_PROFILE_SUCCESS:
			return {
				...state,
				dept: payload,
				loading: false,
			};
		case DEPT_PROFILE_ERROR:
			return {
				...state,
				dept: null,
				loading: false,
			};
		case DEPT_PROFILE_ERROR_404:
			return {
				...state,
				dept: null,
				loading: false
			}
		default:
			return state;
	}
}
