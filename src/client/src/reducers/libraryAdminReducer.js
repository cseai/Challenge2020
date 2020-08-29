import { 
	LIBEARY_ADMIN_LOAD,
	LIBEARY_ADMIN_LOAD_FAIL,
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
} from './../actions/types';

const initialState = {
	library: null,
	books: null,
	resources: null,
	trxs: null,
	bookTrxs: null,
	resourceTrxs: null,
	user: null,
	loading: true,
	libLoading: true,
	userLoading: true,
	bookLoading: true,
	resourceLoading: true,
    trxLoading: true,
    bookTrxLoading: true,
    resourceTrxLoading: true,
};

export default function (state = initialState, action){
	const { type, payload } = action;

	switch (type) {
		case LIBEARY_ADMIN_LOAD:
			return {
				...state,
				library: payload,
				libLoading: false,
				loading: false,
			};
		case LIBEARY_ADMIN_LOAD_FAIL:
			return {
				...state,
				library: null,
				loading: true,
			};
		case GET_ADMIN_ALL_BOOKS:
			return {
				...state,
				books: payload,
				bookLoading: false,
				loading: false,
			};
		case GET_ADMIN_ALL_BOOKS_FAIL:
			return {
				...state,
				library: null,
				loading: true,
			};
		case GET_ADMIN_ALL_RESOURCES:
			return {
				...state,
				resources: payload,
				resourceLoading: false,
				loading: false,
			};
		case GET_ADMIN_ALL_RESOURCES_FAIL:
			return {
				...state,
				library: null,
				loading: true,
			};
		case GET_ADMIN_ALL_TRX:
			return {
                ...state,
                trxs: payload,
                trxLoading: false,
                loading: false,
			};
		case GET_ADMIN_ALL_TRX_FAIL:
			return {
                ...state,
                library: null,
				loading: true,
			};
		case GET_ADMIN_ALL_BOOK_TRX:
			return {
                ...state,
                bookTrxs: payload,
                bookTrxLoading: false,
                loading: false,
			};
		case GET_ADMIN_ALL_BOOK_TRX_FAIL:
			return {
                ...state,
                library: null,
                loading: true,
			};
		case GET_ADMIN_ALL_RESOURCE_TRX:
			return {
                ...state,
                resourceTrxs: payload,
                resourceTrxLoading: false,
                loading: false,
			};
		case GET_ADMIN_ALL_RESOURCE_TRX_FAIL:
			return {
                ...state,
                library: null,
                loading: true,
			};
		default:
			return state;
	}
}
