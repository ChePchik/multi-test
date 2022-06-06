import {
	// GET_TEACHERS,
	GET_ERRORS,
	GET_GROUPS,
	UPDATE_GROUP,
	DELETE_GROUP,
	ADD_GROUP,
} from "./types";
import axios from "axios";
import { toastErrors } from "./errorAction.jsx";
import { toastLoad } from "./helperAction";

export const loadGroup = () => (dispatch, getState) => {
	axios
		.get("/api/group/")
		.then((res) => {
			if (res.data) {
				dispatch({
					type: GET_GROUPS,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};

export const updateGroup = (id, data) => (dispatch, getState) => {
	// console.log(id,data);
	axios
		.put(`/api/group/${id}`, data)
		.then((res) => {
			if (res.data.success) {
				dispatch({
					type: UPDATE_GROUP,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};

export const addGroup = (name, id) => (dispatch, getState) => {
	console.log("добавлена группа");

	axios
		.post("/api/group", { name, id })
		.then((res) => {
			if (name) {
				dispatch({
					type: ADD_GROUP,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			// console.log(error)
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};

export const deleteGroup = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/group/${id}`)
		.then((res) => {
			if (res.data.success) {
				dispatch({
					type: DELETE_GROUP,
					payload: res.data,
				});
				dispatch(toastLoad(`Группа удалена!`, "warning"));
			}
		})
		.catch((err) => {
			// console.log(err)
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};
