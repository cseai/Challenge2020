import axios from 'axios';
import { setAlert } from './../actions/alertAction';
import setAuthToken from '../utils/setAuthToken';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT, AUTH_ERROR, LOAD_USER } from './types';

// load user
export const loadUser = () => async (dispatch) => {
	if (window.localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const user = await axios.get('/api/v1/users/currentUser');
		dispatch({
			type: LOAD_USER,
			payload: user.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// login
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/v1/users/login', body, config);
		// console.log('action --> ', res.data);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		// dispatch()
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
		});
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// register
export const register = ({ username, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const body = JSON.stringify({
		username,
		email,
		password,
	});

	try {
		const res = await axios.post('/api/v1/users/signup', body, config);
		console.log(res.data);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// LOGOUT
export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};
