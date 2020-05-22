import axios from 'axios';
import { setAlert } from './../actions/alertAction';
// import setAuthToken from '../utils/setAuthToken';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// login
export const login = (email, password) => async (dispatch) => {
	console.log(email, password);

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/v1/users/login', body, config);
		console.log('action --> ', res.data);

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
		// console.log(errors);

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
	console.log(username, email, password);

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
		// console.log(err);

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};
