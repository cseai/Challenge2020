import axios from 'axios';
import { GET_DEPT_PROFILE, DEPT_PROFILE_ERROR } from './types';

// get Dept profile
export const getDept = (deptUsername) => async (dispatch) => {
	console.log('edhu hub profile loaded');
	try {
		// get dept api
		const res = await axios.get(`/api/v1/depts/${deptUsername}`);
		// console.log("dept-data");
		// console.log(res.data);
		dispatch({
			type: GET_DEPT_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response;
		console.log(errors);
		// todos not finish
		dispatch({
			type: DEPT_PROFILE_ERROR,
		});
	}
};
