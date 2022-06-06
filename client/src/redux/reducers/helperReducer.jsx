import {
	TOGGLE_SIDEBAR,
	GET_TEACHERS,
	GET_TOAST,
	TOGGLE_OFFCANVAS_EDIT,
} from "../actions/types";

const initialState = {
	sidebarState: false,
	offcanvasState: false,
	teachers: [],
	// skin: window.localStorage.getItem("skin") || "light",
};
// console.log(initialState.skin, 0);
export default function (state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return {
				...state,
				sidebarState: action.payload.sidebarState,
			};
		case TOGGLE_OFFCANVAS_EDIT:
			return {
				...state,
				offcanvasState: action.payload.offcanvasState,
			};
		// case SET_SKIN:
		// 	console.log(action.payload.skin, 3);
		// 	return {
		// 		...state,
		// 		skin: action.payload.skin,
		// 	};
		// case USER_LOADING:
		// 	return {
		// 		...state,
		// 		loading: true,
		// 	};
		case GET_TOAST:
			return {
				...action.payload,
			};

		case GET_TEACHERS:
			// console.log("GET_TEACHER");
			const teachers = action.payload.map((teacher) => {
				return {
					// _id: teacher._id,
					// id: teacher.id,
					// surname: teacher.surname,
					...teacher,
				};
			});
			return { teachers: [...teachers] };

		default:
			return state;
	}
}
