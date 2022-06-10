import React, { useEffect, useState } from "react";
import data from "./data";
import Answers from "./Answers";
import Popup from "./Popup";

export default function Main() {
	const [nr, setNR] = useState(0);
	const [total, setTotal] = useState(data.length);
	const [showButton, setShowButton] = useState(false);
	const [questionAnswered, setQuestionAnswered] = useState(false);
	const [score, setScore] = useState(0);
	const [displayPopup, setDisplayPopup] = useState("flex");
	const [answers, setAnswers] = useState([]);
	const [question, setquestion] = useState(0);
	const [correct, setcorrect] = useState(0);

	useEffect(() => {
		pushData(nr);
	}, []);

	const pushData = (nr) => {
		setNR(nr + 1);
		setAnswers([
			data[nr].answers[0],
			data[nr].answers[1],
			data[nr].answers[2],
			data[nr].answers[3],
		]);
		setquestion(data[nr].question);
		setcorrect(data[nr].correct);
	};

	const nextQuestion = () => {
		console.log(nr, "nr");
		console.log(total, "total");
		if (nr === total) {
			setDisplayPopup("flex");
		} else {
			pushData(nr);
			setShowButton(false);
			setQuestionAnswered(false);
		}
	};

	const handleShowButton = () => {
		// console.log("handleShowButton");
		setShowButton(true);
		setQuestionAnswered(true);
	};

	const handleStartQuiz = () => {
		setDisplayPopup("none");
		setNR(1);
	};

	const handleIncreaseScore = () => {
		setScore(score + 1);
	};
	// console.log(score);
	return (
		<>
			<div className='container'>
				<Popup
					style={{ display: displayPopup }}
					score={score}
					total={total}
					startQuz={handleStartQuiz}
				/>

				<div className='row'>
					<div className='col-lg-10 col-lg-offset-1'>
						<div id='question'>
							<h4>
								Вопрос {nr}/{total}
							</h4>
							<p>{question}</p>
						</div>
						<Answers
							answers={answers}
							correct={correct}
							showButton={handleShowButton}
							isAnswered={questionAnswered}
							increaseScore={handleIncreaseScore}
						/>
						<div id='submit'>
							{showButton ? (
								<button className='fancy-btn' onClick={nextQuestion}>
									{nr === total ? "Закончить" : "Следующий вопрос"}
								</button>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
