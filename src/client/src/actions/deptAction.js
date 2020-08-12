import axios from 'axios';
import { GET_DEPT_PROFILE, GET_DEPT_PROFILE_SUCCESS, DEPT_PROFILE_ERROR, DEPT_PROFILE_ERROR_404 } from './types';

// get Dept profile
export const getDept = (deptUsername) => async (dispatch) => {
	try {
		// start loading for dept requested data
		dispatch({
			type: GET_DEPT_PROFILE,
		});
		// get dept api
		const res = await axios.get(`/api/v1/depts/${deptUsername}`);
		// console.log("dept-data");
		// console.log(`from try block res: ${res}`);
		// console.log(res);

		dispatch({
			type: GET_DEPT_PROFILE_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		console.log('from catch block');
		console.log(err);
		const errors = err.response;
		console.log(errors);
		// todos not finish

		// if dept not found
		if (err.status == 404) {
			dispatch({
				type: DEPT_PROFILE_ERROR_404,
			});
		} else {
			dispatch({
				type: DEPT_PROFILE_ERROR,
			});
		}
	}
};
