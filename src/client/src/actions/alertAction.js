import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => async (dispatch) => {
	const id = uuid.v4();
	dispatch({
		type: SET_ALERT,
		payload: { msg, id, alertType },
	});
	setTimeout(() => {
		dispatch({
			type: REMOVE_ALERT,
			payload: id,
		});
	}, 3000);
};
