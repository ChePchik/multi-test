import axios from "axios";
import setAuthToken from "../../utility/setAuthToken";
import jwt_decode from "jwt-decode";
import { ADD_USER, GET_ERRORS, SET_CURRENT_USER } from "./types";
import { toastErrors } from "./errorAction.jsx";
import { url } from "./variable";

export const registerUser =
	(userData, another = true) =>
	(dispatch) => {
		axios
			.post(url + "/api/auth/register", userData)
			.then((res) => {
				// re-direct to login on successful register
				// let navigate = useNavigate();
				if (another) dispatch(loginUser(userData));
				dispatch({
					type: ADD_USER,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch(toastErrors("Неверные данные"));
				console.log(err);
				dispatch({
					type: GET_ERRORS,
					payload: err?.response?.data,
				});
			});
	};
// Login - get user token
export const loginUser = (userData) => (dispatch) => {
	axios
		.post(url + "/api/auth/login", userData, { mode: "cors" })
		.then((res) => {
			// Save to localStorage
			// Set token to localStorage
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) => {
			dispatch(toastErrors("Неверные данные"));
			dispatch({
				type: GET_ERRORS,
				payload: err?.response?.data,
				// payload: err,
			});
		});
};
// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};
// User loading
// export const setUserLoading = () => {
// 	return {
// 		type: USER_LOADING,
// 	};
// };
// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from local storage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
