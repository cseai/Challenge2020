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
export const getAllBooks = (id) => async (dispatch) => {
	console.log('get all books called');
	try {
		const res = await axios.get(`/api/v1/libraries/${id}/books?fields=title,_id,library,authors&sort=-createdAt`);
		dispatch({
			type: GET_ALL_BOOKS,
			payload: res.data,
		});
		console.log(res.data);
	} catch (err) {
		console.log(err);
	}
};
