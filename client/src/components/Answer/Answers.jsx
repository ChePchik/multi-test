import React, { useEffect, useState } from "react";

export default function Answers({ answers, correct, showButton, isAnswered, increaseScore }) {
	const [classNames, setclassNames] = useState(["", "", "", ""]);

	useEffect(() => {
		setclassNames(["", "", "", ""]);
	}, [answers]);

	const checkAnswer = (e) => {
		console.log("checkAnswer");
		if (!isAnswered) {
			let elem = e.currentTarget;
			let answer = Number(elem.dataset.id);
			let updatedClassNames = classNames;
			console.log(answer, correct);
			if (answer === correct) {
				updatedClassNames[answer - 1] = "right";
				increaseScore();
			} else {
				updatedClassNames[answer - 1] = "wrong";
			}

			setclassNames(updatedClassNames);

			showButton();
		}
	};

	return (
		<div id='answers'>
			<ul>
				<li onClick={(e) => checkAnswer(e)} className={classNames[0]} data-id='1'>
					<span>A</span> <p>{answers[0]}</p>
				</li>
				<li onClick={(e) => checkAnswer(e)} className={classNames[1]} data-id='2'>
					<span>B</span> <p>{answers[1]}</p>
				</li>
				<li onClick={(e) => checkAnswer(e)} className={classNames[2]} data-id='3'>
					<span>C</span> <p>{answers[2]}</p>
				</li>
				<li onClick={(e) => checkAnswer(e)} className={classNames[3]} data-id='4'>
					<span>D</span> <p>{answers[3]}</p>
				</li>
			</ul>
		</div>
	);
}
