import { LIBEARY_LOAD_FAIL, LIBEARY_LOAD, GET_ALL_BOOKS_FAIL, GET_ALL_BOOKS } from './../actions/types';
const initialState = {
	library: null,
	books: null,
	loading: true,
	libLoading: true,
	bookLoading: true,
};

// just a comment by munna

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LIBEARY_LOAD:
			return {
				...state,
				library: payload,
				libLoading: false,
				loading: false,
			};
		case LIBEARY_LOAD_FAIL:
			return {
				...state,
				library: null,
				loading: true,
			};
		case GET_ALL_BOOKS:
			return {
				...state,
				books: payload,
				bookLoading: false,
				loading: false,
			};
		case GET_ALL_BOOKS_FAIL:
			return {
				...state,
				library: null,
				loading: true,
			};
		default:
			return state;
	}
}
