import { TEST_LOAD_FAIL, TEST_LOAD } from './types';
import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';
// load user
export const testData = () => async (dispatch) => {
	if (window.localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const user = await axios.get('/api/v1/users/currentUser');
		dispatch({
			type: TEST_LOAD,
			payload: user.data,
		});
	} catch (err) {
		dispatch({
			type: TEST_LOAD_FAIL,
		});
	}
};
