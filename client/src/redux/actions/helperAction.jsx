import {
	TOGGLE_SIDEBAR,
	GET_TEACHERS,
	GET_ERRORS,
	GET_TOAST,
	TOGGLE_OFFCANVAS_EDIT,
	// SET_SKIN,
	// ADD_AVATAR,
} from "./types";
import axios from "axios";
import { toastErrors } from "./errorAction.jsx";
import { toast } from "react-toastify";

// Toggle view sidebar
// export const handleSkin = (skin) => {
// 	window.localStorage.setItem("skin", skin);
// 	console.log(skin, 1);
// 	return {
// 		type: SET_SKIN,
// 		payload: {
// 			skin,
// 		},
// 	};
// };
export const sidebarToggle = (sidebarState) => {
	return {
		type: TOGGLE_SIDEBAR,
		payload: {
			sidebarState,
		},
	};
};
export const offcanvasToggleEdit = (offcanvasState) => {
	return {
		type: TOGGLE_OFFCANVAS_EDIT,
		payload: {
			offcanvasState,
		},
	};
};
// User loading
// export const setUserLoading = () => {
// 	return {
// 		type: USER_LOADING,
// 	};
// };
export const loadTeacher = () => async (dispatch, getState) => {
	await axios
		// export const loadTeacher = () => (dispatch, getState) => {
		// 	axios
		.get("/api/group/teacher")
		.then((res) => {
			if (res.data) {
				dispatch({
					type: GET_TEACHERS,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			// console.log("catch", error);
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};

export const toastLoad = (message, typeMess = "info") => {
	const toasts = {
		info: toast.info,
		warning: toast.warn,
		success: toast.success,
		error: toast.error,
	};
	toasts[typeMess](message, {
		position: "top-right",
		autoClose: 5000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
	return {
		type: GET_TOAST,
		payload: { message: message },
	};
};

export const uploadAvatar = (file, idUser) => async (dispatch, getState) => {
	console.log(file, idUser);
	await axios
		.post("/api/file/upload-avatar/" + idUser, file, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => {
			if (res.data) {
				console.log("OK");
				// dispatch({
				// 	type: ADD_AVATAR,
				// 	payload: res.data,
				// });
			}
		})
		.catch((err) => {
			// console.log("catch", error);
			dispatch({
				type: GET_ERRORS,
				payload: err,
			});
			dispatch(toastErrors(err));
		});
};
