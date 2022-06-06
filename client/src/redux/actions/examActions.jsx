import { GET_SUCCESS_ANSWER, GET_ERRORS } from "./types";
import axios from "axios";
import { toastErrors } from "./errorAction.jsx";

export const ExaminationsAnswer = (answ) => async (dispatch, getState) => {
	await axios
		.get(`/api/test/exam/${answ}`)
		.then((res) => {
			// console.log(res?.data?.success);
			if (res?.data) {
				// console.log(res.data);
				dispatch({
					type: GET_SUCCESS_ANSWER,
					payload: res.data.success,
				});
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};
