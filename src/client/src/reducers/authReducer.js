import { LOGIN_SUCCESS, LOGIN_FAIL } from './../actions/types';
import setAuthToken from './../utils/setAuthToken';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOGIN_FAIL:
			localStorage.removeItem('token');
		default:
			return state;
	}
}
