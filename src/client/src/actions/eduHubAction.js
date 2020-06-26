import axios from 'axios';
import { GET_EDUHUB_PROFILE, GET_EDUHUB_ERROR } from './types';

// get eduhub profile
export const geteduhub = (deptIdOrUsername) => async (dispatch) => {
	console.log('edhu hub profile loaded');
	try {
		// get dept api
		const res = await axios.get(`/api/v1/depts/${deptIdOrUsername}`);
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
