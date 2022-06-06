import { GET_ERRORS, CLEAR_ERRORS, GET_ERRORS_W } from "../actions/types";
const initialState = {
	message: "",
	// emailExists: false,
	status: null,
	id: null,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		case GET_ERRORS_W:
			return action.payload;
		case CLEAR_ERRORS:
			return {
				message: "",
				// emailExists: false,
				status: null,
				id: null,
			};
		default:
			return state;
	}
}
