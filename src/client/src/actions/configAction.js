import { DARK_MODE } from './types';

export function themeMode(value) {
	// console.log('value from action ', typeof value);
	return {
		type: DARK_MODE,
		payload: value,
	};
}
