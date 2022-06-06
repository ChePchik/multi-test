import { GET_SUCCESS_ANSWER } from "../actions/types";

const initialState = {
	exam: null,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SUCCESS_ANSWER:
			return {
				exam: action.payload,
			};
		default:
			return state;
	}
}
