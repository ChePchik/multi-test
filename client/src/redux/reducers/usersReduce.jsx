import {
	ADD_USER,
	DELETE_USER,
	GET_TEACHER_ONE,
	GET_USER,
	GET_USERS,
} from "../actions/types";

const initialState = {
	currentUser: [],
	oneTeacher: [],
	users: [],
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_USER:
			return {
				...state,
				currentUser: {
					...action.payload,
				},
			};
		case GET_TEACHER_ONE:
			return {
				...state,
				oneTeacher: {
					...action.payload,
				},
			};
		case GET_USERS:
			console.log(state, "users");

			const users = action?.payload?.map((user) => {
				return {
					...user,
				};
			});
			return { ...state, users };

		case ADD_USER:
			console.log(action.payload);
			return 0;
		// return {
		// 	users: [...state, action.payload],
		// 	// users: [
		// 	// 	// {
		// 	// 	// 	name: action.payload.group.name,
		// 	// 	// },
		// 	// ],
		// };

		case DELETE_USER:
			console.log(action.payload);
			// console.log(users, "users");
			console.log(state?.users, "users");
			return {
				...state,
				users: state.users.filter((user) => user._id !== action.payload.id),
			};

		default:
			return state;
	}
}
