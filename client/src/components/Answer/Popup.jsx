import React, { useEffect, useState } from "react";

export default function Popup({ style, score, total, startQuz }) {
	const [time, setTime] = useState("start");
	const [title, setTitle] = useState("Добро пожаловать на тест");
	const [text, setText] = useState(
		"This is a quiz application built using ReactJS. <br /><br /> Currently it's loaded with CSS questions from W3Scools, but you can easily load any type of questions into it. <br /><br /> It will dynamically load the question->answers pair and upload them into the components.",
	);
	const [buttonText, setButtonText] = useState("Начать");

	// console.log(style, score, total, startQuiz);

	const popupHandle = () => {
		if (time === "start") {
			setTime("end");
			setTitle("Поздравляю!");
			setButtonText("Restart");
			startQuz();
		} else {
			console.log(1);
			// location.reload();// restart the application
		}
	};

	useEffect(() => {
		if (score && total)
			setText(
				"Вы завершили викторину. <br /> Ты получил: <strong>" +
					score +
					"</strong> из <strong>" +
					total +
					"</strong> правильных вопросов.",
			);
	}, [score, total]);

	const createMarkup = (text) => {
		return { __html: text };
	};

	return (
		<div className='popup-container' style={style}>
			<div className='container'>
				<div className='col-md-8 col-md-offset-2'>
					<div className='popup'>
						<h1>{title}</h1>
						<p dangerouslySetInnerHTML={createMarkup(text)} />
						<button className='fancy-btn' onClick={popupHandle}>
							{buttonText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
