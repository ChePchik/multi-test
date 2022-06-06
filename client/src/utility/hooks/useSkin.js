// ** React Imports
import { useEffect } from "react";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";
// import { handleSkin } from "../../redux/actions/helperAction";

export const useSkin = () => {
	// console.log("useSkin");
	// ** Hooks
	const dispatch = useDispatch();
	const skin = useSelector((state) => state.helper.skin);

	const setSkin = (type) => {
		// console.log(type, "type");
		// dispatch(handleSkin(type));
	};
	// console.log(skin, "store.skin");

	useEffect(() => {
		// console.log(skin, "store.skin");
		// ** Get Body Tag
		const element = window.document.body;

		// ** Remove all classes from Body on mount
		element.classList.remove(...element.classList);

		// ** If skin is not light add skin class
		if (skin !== "light") {
			// element.classList.add("dark");
		}
	}, [skin]);

	return { skin, setSkin };
};
