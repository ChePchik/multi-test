import {
	ADD_TEST,
	GET_TEST,
	DELETE_TEST,
	GET_ERRORS,
	UPDATE_TEST,
	GET_TEST_ONE,
	GET_SUCCESS_ANSWER,
	SET_REPOS,
} from "./types";
import axios from "axios";
import { toastErrors } from "./errorAction.jsx";

export const loadTest = () => async (dispatch, getState) => {
	await axios
		.get("/api/test/")
		.then((res) => {
			if (res.data) {
				// console.log(res.data);
				dispatch({
					type: GET_TEST,
					payload: res.data,
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
export const loadOneTest =
	(idOne, answers = false) =>
	async (dispatch, getState) => {
		console.log("GET_TEST_ONE");
		let url = `/api/test/${idOne}`;
		// if (answers == true) url = `/api/test/${idOne}/a`;

		await axios
			.get(url)
			.then((res) => {
				if (res.data) {
					// console.log(res.data);
					dispatch({
						type: GET_TEST_ONE,
						payload: res.data,
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

export const createdTest = (name, author) => async (dispatch, getState) => {
	await axios
		.post("/api/test/", { name, author })
		.then((res) => {
			if (res.data) {
				// console.log(res.data);
				dispatch({
					type: ADD_TEST,
					payload: res.data,
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
export const deleteOneTest = (id) => async (dispatch, getState) => {
	await axios
		.delete(`/api/test/${id}`)
		.then((res) => {
			if (res.data.success) {
				dispatch({
					type: DELETE_TEST,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			console.log(err, "del");
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};
export const updateTest = (id, data) => async (dispatch, getState) => {
	// console.log(id,data);
	await axios
		.put(`/api/test/${id}`, data)
		.then((res) => {
			if (res.data.success) {
				dispatch({
					type: UPDATE_TEST,
					payload: res.data,
				});
				dispatch(toastErrors(res.data));
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
