import {
	UPDATE_TEST,
	ADD_TEST,
	GET_TEST,
	DELETE_TEST,
	GET_TEST_ONE,
} from "../actions/types";

const initialState = {
	tests: [],
	items: [],
	// step:3,
	// mistakes: 0,//error
};
export default function (state = initialState, action) {
	switch (action.type) {
		case ADD_TEST:
			// console.log(action.payload, "red");
			return {
				tests: [
					...state.tests,
					{
						_id: action.payload._id,
						nameTest: action.payload.nameTest,
						authorID: action.payload.authorID,
					},
				],
			};
		case GET_TEST:
			const tests = action.payload.map((test) => {
				return {
					...test,
				};
			});
			return { ...state, tests };
		case GET_TEST_ONE:
			const data_one = action.payload;
			const testOne = data_one.map((tests) => {
				return {
					...tests,
				};
			});
			return { ...state, testOne };
		case DELETE_TEST:
			console.log("DELETE_TEST");
			// console.log(tests);
			console.log(state.tests);
			console.log(action.payload);
			// if (state.tests = )
			return {
				...state,
				tests: state?.tests?.filter((test) => test?._id !== action.payload.id),
			};
		case UPDATE_TEST:
			const data = action.payload;
			console.log(data, "UPDATE_TEST");
			// console.log(data.data);
			console.log("UPDATE_GROUP");
			return {
				tests: data.map((test) => {
					if (data._id === test._id) {
						test = {
							...test,
						};
					}
					return tests;
				}),
			};

		default:
			return state;
	}
}
