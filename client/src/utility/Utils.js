// Соединение массивов Учителя и группы по iD
export const listJoin = (teacher, groups) => {
	let merge = [];
	// delete groups.id;
	//// delete teacher[t].id;
	// delete teacher[t].name;
	// console.log(teacher, 0);
	// console.log(groups, 0);
	let arr3 = groups.concat(teacher);

	teacher?.forEach((t) => {
		groups?.forEach((g) => {
			if (t._id == g.teacherID) {
				merge = { ...t, ...g, ids: g._id, namet: t.name }; //из за того что _id переписывает

				arr3.push(merge);
				var index = arr3.indexOf(g);
				if (index >= 0) {
					arr3.splice(index, 1);
				}
				for (const key in arr3) {
					if (arr3[key] == t) {
						var index = arr3.indexOf(t);
						if (index >= 0) {
							arr3.splice(index, 1);
						}
					}
				}
			}
			if (t._id != g.teacherID) {
				var index = arr3.indexOf(t);
				if (index >= 0) {
					arr3.splice(index, 1);
				}
			}
		});
	});
	return arr3;
};

// Соединение массивов Учителя и Тесты по iD
export const listJoinTest = (teacher, test) => {
	let merge = [];
	let arr3 = test.concat(teacher);

	teacher?.forEach((t) => {
		test?.forEach((o) => {
			if (t._id == o.authorID) {
				merge = { ...o, ...t, ids: o._id }; //из за того что _id переписывает

				arr3.push(merge);
				var index = arr3.indexOf(o);
				if (index >= 0) {
					arr3.splice(index, 1);
				}
				for (const key in arr3) {
					if (arr3[key] == t) {
						var index = arr3.indexOf(t);
						if (index >= 0) {
							arr3.splice(index, 1);
						}
					}
				}
			}
			if (t._id != o.authorID) {
				var index = arr3.indexOf(t);
				if (index >= 0) {
					arr3.splice(index, 1);
				}
			}
		});
	});
	return arr3;
};

// регулярка для проверки JWT token
export const examinationJWT = (key) => {
	let JWTkey =
		key == undefined || ""
			? false
			: key?.match(
					/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
			  )[0];
	if (!JWTkey || JWTkey == undefined || JWTkey == "") {
		return false;
	}
	return true;
};

export const toSecond = (sec) => {};

export const toMinHours = (seconds) => {
	var m = Math.floor(seconds / 60);
	var s = seconds % 60;
	var h = Math.floor(m / 60);
	m = m % 60;

	//    var s = num.toString();
	//     return (s.length < 2) "0" + s : s;
	return h + "ч " + m + "м";
};
