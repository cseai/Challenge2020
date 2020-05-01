import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';

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
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
		});
		const errors = err.response.data.errors;
		console.log(err);

		// if (errors) {
		// 	errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		// }
		// dispatch({
		// 	type: LOGIN_FAIL,
		// });
	}
};
