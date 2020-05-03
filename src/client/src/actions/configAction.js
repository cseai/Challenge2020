import { DARK_MODE } from './types';

export const themeMode = (value) => (dispatch) => {
	console.log('value from action ', typeof value);
	dispatch({
		type: DARK_MODE,
		payload: value,
	});
};
