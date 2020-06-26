import { TEST_LOAD_FAIL, TEST_LOAD } from './../actions/types';
const initialState = {
	user: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case TEST_LOAD:
			return {
				...state,
				user: payload,
				loading: false,
			};
		case TEST_LOAD_FAIL:
			return {
				...state,
				user: null,
				loading: true,
			};
		default:
			return state;
	}
}
