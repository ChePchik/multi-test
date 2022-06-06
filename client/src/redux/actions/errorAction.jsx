import { GET_ERRORS, CLEAR_ERRORS, GET_ERRORS_W } from "./types";
import { toast } from "react-toastify";

// Return errors
export const returnErrors = (message, status, id = null) => {
	return {
		type: GET_ERRORS,
		payload: { message, status, id },
	};
};
export const toastErrors = (message) => {
	toast.dismiss();
	if (message && message?.request?.response)
		message = JSON.parse(message?.request?.response)?.message;

	toast.error("Ошибка загрузки данных! \n Код ошибки: " + message, {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: 10000,
	});

	return {
		type: GET_ERRORS_W,
		payload: { message: "error" },
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
