import axios from "axios";
const setAuthToken = (token) => {
	if (token) {
		// Применяем токен авторизации к каждому запросу, если авторизован
		axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		// axios.defaults.headers.common["Authorization"] = token;
	} else {
		// Удаляем заголовок аутентификации
		delete axios.defaults.headers.common["Authorization"];
	}
};

export default setAuthToken;
