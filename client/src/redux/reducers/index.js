import { combineReducers } from "redux";
import authReducer from "./authReducers.jsx";
import errorReducer from "./errorReducers.jsx";
import helperReducer from "./helperReducer.jsx";
import groupReducer from "./groupReducer.jsx";
import usersReduce from "./usersReduce.jsx";
import testReduce from "./testReduce.jsx";
import examReduce from "./examReduce.jsx";

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	helper: helperReducer,
	group: groupReducer,
	user: usersReduce,
	test: testReduce,
	ex: examReduce,
});
