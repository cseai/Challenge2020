import { LIBEARY_LOAD_FAIL, LIBEARY_LOAD } from './../actions/types';
const initialState = {
	library: null,
	loading: true,
};

// just a comment by munna

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LIBEARY_LOAD:
			return {
				...state,
				library: payload,
				loading: false,
			};
		case LIBEARY_LOAD_FAIL:
			return {
				...state,
				library: null,
				loading: true,
			};
		default:
			return state;
	}
}
