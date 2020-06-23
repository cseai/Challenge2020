import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	LOAD_USER,
	AUTH_ERROR,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOAD_USER:
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				loading: false,
			};
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
		case LOGOUT:
		case AUTH_ERROR:
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
