import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utility/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions.jsx";

import "./App.css";
import store from "./store";
import AppRoutes from "./AppRoutes";

const token = localStorage.getItem("jwtToken");
if (token) {
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000; // to get in milliseconds

	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = "./login";
	}
}

function App() {
	return (
		<>
			<Provider store={store}>
				<Router>
					<Suspense fallback={<>Loading</>}>
						<AppRoutes />
					</Suspense>
				</Router>
			</Provider>
		</>
	);
}

export default App;
