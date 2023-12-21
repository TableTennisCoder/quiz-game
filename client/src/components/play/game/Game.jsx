import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import useSound from "use-sound";
import useStore from "../../../Store";

// Components
import AnswerBtn from "./AnswerBtn";
import InfoBoard from "./InfoBoard";

import {useQuestions} from "../../../controllers/useQuestions";
import {checkUserSubmission} from "../../../controllers/useUserSubmission";

// Sounds
import wait from "../../../assets/sounds/wait.mp3";
import correct from "../../../assets/sounds/correct.mp3";
import wrong from "../../../assets/sounds/wrong.mp3";

const Game = () => {
  const activeQuestionIndex = useStore((state) => state.activeQuestionIndex);
  const setActiveQuestionIndex = useStore(
    (state) => state.setActiveQuestionIndex
  );
  const resetActiveQuestionIndex = useStore(
    (state) => state.resetActiveQuestionIndex // Added reset function
  );

  const {isPending, isError, data, error} = useQuestions();
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null); // true or false -> property in json (userSubmit)
  const [correctAnswerId, setCorrectAnswerId] = useState(null); // the correct answer id -> if user select wrong answer, correct one is shown
  const [selectedAnswerId, setSelectedAnswerId] = useState(null); // what the user has selected

  // sounds
  const [letsWait, {stop: stopLetsWait}] = useSound(wait);
  const [correctAnswer, {stop: stopCorrectAnswer}] = useSound(correct);
  const [wrongAnswer, {stop: stopWrongAnswer}] = useSound(wrong);

  const navigate = useNavigate();
  useEffect(() => {
    // if I press "restart" on my game over screen this component is mounted again and I reset the index so I start from zero
    resetActiveQuestionIndex();
    letsWait();
  }, [letsWait]);

  // load next question
  const handleNextQuestion = async (answerId, questionId) => {
    const result = await checkUserSubmission(questionId, answerId);

    // Check if answer is correct
    const isCorrect = result.answered_correctly;
    setIsCorrectAnswer(isCorrect);
    setCorrectAnswerId(result.answer_id);
    setSelectedAnswerId(result.user_submission);

    // handle right and wrong answer
    if (isCorrect) {
      correctAnswer();

      setTimeout(() => {
        setIsCorrectAnswer(null);
        // increase index and make sure its not possible to increase at last question
        if (activeQuestionIndex < data.length - 1) {
          setActiveQuestionIndex(activeQuestionIndex + 1);
        }
      }, 3000);
    } else {
      stopLetsWait();
      wrongAnswer();
      setTimeout(() => {
        navigate("/gameOver");
      }, 2000);
    }
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="game">
      <div className="infoBoard">
        <InfoBoard />
      </div>
      <div className="playContainer">
        <div className="questionContainer">
          <p>{data[activeQuestionIndex].question_text}</p>
        </div>
        <div className="answerContainer">
          {data[activeQuestionIndex].answers.map((answer) => (
            <AnswerBtn
              key={answer.answer_id}
              onClick={() =>
                handleNextQuestion(answer.answer_id, answer.question_id)
              }
              className={
                selectedAnswerId === answer.answer_id
                  ? isCorrectAnswer
                    ? "correctAnswer"
                    : "incorrectAnswer"
                  : ""
              }
            >
              {answer.answer_text}
            </AnswerBtn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
