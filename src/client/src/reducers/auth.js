import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	// console.log(payload.token);

	switch (type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				...payload,
				isAuthenticated: false,
				loading: false,
			};
		default:
			return state;
	}
}
