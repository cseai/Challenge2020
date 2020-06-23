import axios from 'axios';
import { GET_EDUHUB_PROFILE, GET_EDUHUB_ERROR } from './types';

// get eduhub profile
export const geteduhub = () => async (dispatch) => {
	console.log('edhu hub profile loaded');
	try {
		const res = await axios.get('/api/v1/depts/5eb3d2537e01aa2869306d2f/eduhub');
		console.log(res.data);
		dispatch({
			type: GET_EDUHUB_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response;
		console.log(errors);
	}
};
