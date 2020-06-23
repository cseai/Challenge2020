import { PROFILE, PROFILE_ERROR } from './types';
import axios from 'axios';
import { setAlert } from './alertAction';
// create profile
export const createProfile = (formData) => async (dispatch) => {
	console.log(formData);
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/v1/profile', formData, config);
		console.log(res);
		dispatch(setAlert('profile created', 'success'));
	} catch (err) {
		// const errors = err.response.data;
		// console.log(errors);
	}
};
