import {
	GET_GROUPS,
	UPDATE_GROUP,
	DELETE_GROUP,
	ADD_GROUP,
} from "../actions/types";

const initialState = {
	groups: [],
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_GROUPS:
			const groups = action?.payload?.map((group) => {
				return {
					name: group,
					// _id: group._id,
					// name: group.name,
				};
			});
			// console.log(groups);
			return { groups };

		case UPDATE_GROUP:
			const data = action.payload.data;
			// console.log("UPDATE_GROUP");
			return {
				groups: state.groups.map((group) => {
					if (data._id === group._id) {
						group = {
							...group,
							_id: data._id,
							name: data.name,
							// teacherID: data.teacherID,
						};
					}
					return group;
				}),
			};
		case DELETE_GROUP:
			return {
				groups: state.groups.filter((group) => group._id !== action.payload.id),
			};

		case ADD_GROUP:
			return {
				groups: [
					...state.groups,
					{
						_id: action.payload.group._id,
						name: action.payload.group.name,
					},
				],
			};
		default:
			return state;
	}
}
