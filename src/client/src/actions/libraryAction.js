import axios from 'axios';
import { GET_ALL_BOOKS, LIBEARY_LOAD, LIBEARY_LOAD_FAIL } from './types';
import store from './../store';

// get current library
export const getLibrary = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/v1/libraries/5ec6367d30bac62ae0cda5fe');
		dispatch({
			type: LIBEARY_LOAD,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// get all book from specific library
export const getAllBooks = (id, sortBy) => async (dispatch) => {
	console.log('get all books called');
	//const sortBy = 'createdAt';
	try {
		const res = await axios.get(`/api/v1/libraries/${id}/books?fields=title,_id,library,authors&sort=-${sortBy}`);
		dispatch({
			type: GET_ALL_BOOKS,
			payload: res.data,
		});
		console.log(res.data);
	} catch (err) {
		console.log(err);
	}
};

// create library profile
// import { CREATE_LIBRARY_SUCCESS, CREATE_LIBRARY_FAIL, LIBEARY_LOAD, LOAD_LIBRARY_SUCCESS, LIBEARY_LOAD_FAIL } from '../types';
// import axios from 'axios';
// import { setAlert } from '../alertAction';
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
