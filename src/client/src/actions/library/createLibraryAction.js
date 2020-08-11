import { CREATE_LIBRARY_SUCCESS, CREATE_LIBRARY_FAIL, LIBEARY_LOAD, LOAD_LIBRARY_SUCCESS, LIBEARY_LOAD_FAIL } from '../types';
import axios from 'axios';
import { setAlert } from '../alertAction';
// create library profile
export const createLibraryProfile = (clearedFormData, deptId) => async (dispatch) => {
	console.log(clearedFormData, deptId);
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post(`/api/v1/depts/${deptId}/library`, clearedFormData, config);
		console.log(res);
		dispatch({
			type: LIBEARY_LOAD,
			payload: res.data,
		});
		// dispatch(setAlert('Library created', 'success'));
	} catch (err) {
		console.log('from catch block');
		console.log(err);
		const errors = err.response;
		console.log(errors);
		// todos not finish
		
		// if dept not found
		// if (err.status == 404){
		// 	dispatch({
		// 		type: DEPT_PROFILE_ERROR_404,
		// 	});
		// }else{
		// 	dispatch({
		// 		type: DEPT_PROFILE_ERROR,
		// 	});
		// }
	}
};
