import {
	GET_USER,
	GET_USERS,
	GET_ERRORS,
	GET_TEACHER_ONE,
	DELETE_USER,
} from "./types";
import axios from "axios";
// import { returnErrors } from "./errorAction.jsx";
import { returnErrors, toastErrors } from "./errorAction.jsx";
import { toastLoad } from "./helperAction";

export const loadUser = (email) => (dispatch, getState) => {
	axios
		.post("/api/users/user", { email })
		.then((res) => {
			if (res.data) {
				dispatch({
					type: GET_USER,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			// console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};
export const loadUsers = () => (dispatch, getState) => {
	axios
		.get("/api/users/user")
		.then((res) => {
			if (res.data) {
				dispatch({
					type: GET_USERS,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			// console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};

export const getOneTeacher = (id) => (dispatch, getState) => {
	axios
		.post("/api/users/teacher/" + id)
		.then((res) => {
			if (res.data) {
				dispatch({
					type: GET_TEACHER_ONE,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			// console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};

export const deleteUser = (id) => (dispatch, getState) => {
	axios
		.put(`/api/users/user/${id}`)
		.then((res) => {
			console.log(res);
			if (res.data.success) {
				dispatch({
					type: DELETE_USER,
					payload: res.data,
				});
				dispatch(toastLoad(`Пользователь удалён!`, "warning"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(returnErrors(err));
			dispatch(toastErrors(err));
		});
};
