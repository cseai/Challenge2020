import axios from 'axios';
import { 
	LIBEARY_ADMIN_LOAD,
	LIBEARY_ADMIN_LOAD_FAIL,
	GET_ADMIN_ALL_MEMBERS,
	GET_ADMIN_ALL_MEMBERS_FAIL,
	GET_ADMIN_CONNECTED_USER,
	GET_ADMIN_CONNECTED_USER_FAIL,
	GET_ADMIN_ALL_BOOKS,
	GET_ADMIN_ALL_BOOKS_FAIL,
	GET_ADMIN_ALL_RESOURCES,
	GET_ADMIN_ALL_RESOURCES_FAIL,
	GET_ADMIN_ALL_TRX,
	GET_ADMIN_ALL_TRX_FAIL,
	GET_ADMIN_ALL_BOOK_TRX,
	GET_ADMIN_ALL_BOOK_TRX_FAIL,
	GET_ADMIN_ALL_RESOURCE_TRX,
	GET_ADMIN_ALL_RESOURCE_TRX_FAIL,
} from './types';
import store from './../store';


// GET | Get Library
export const getAdminLibrary = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe');
		dispatch({
			type: LIBEARY_ADMIN_LOAD,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// GET | Get All Books of Library
export const getAllBooks = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/books');
		dispatch({
			type: GET_ADMIN_ALL_BOOKS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: GET_ADMIN_ALL_BOOKS_FAIL,
		});
	}
};

// GET | Get All Users of Library
export const getAllUsers = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/members');
		dispatch({
			type: GET_ADMIN_ALL_MEMBERS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: GET_ADMIN_ALL_MEMBERS_FAIL,
		});
	}
};


// GET | Get Connected User
export const getConnectedUser = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/members/${userId}`);
		dispatch({
			type: GET_ADMIN_CONNECTED_USER,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: GET_ADMIN_CONNECTED_USER_FAIL,
		});
	}
};

// removeConnectedUser
export const removeConnectedUser = () => async (dispatch) => {
	try {
		dispatch({
			type: GET_ADMIN_CONNECTED_USER,
			payload: null,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: GET_ADMIN_CONNECTED_USER_FAIL,
		});
	}
};
