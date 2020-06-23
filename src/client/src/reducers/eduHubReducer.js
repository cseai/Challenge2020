import { GET_EDUHUB_PROFILE, GET_EDUHUB_ERROR } from './../actions/types';

const initialState = {
	eduhub: null,
	loading: true,
	error: {},
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	// console.log('payload from reducer ', payload);

	switch (type) {
		case GET_EDUHUB_PROFILE:
			return { ...state, eduhub: payload, loading: false };
		default:
			return state;
	}
}
