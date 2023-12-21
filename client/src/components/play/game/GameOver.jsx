import AnswerBtn from "./AnswerBtn";
import useStore from "../../../Store";
import moneyPyramid from "../pyramid/moneyPyramid.js";
import Pyramid from "../pyramid/Pyramid.jsx";

import {useNavigate} from "react-router-dom";

const GameOver = () => {
  const activeQuestionIndex = useStore((state) => state.activeQuestionIndex);
  const setActiveQuestionIndex = useStore(
    (state) => state.setActiveQuestionIndex
  );
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/play");
  };

  const findClosestMoneySafeState = (index) => {
    let closestIndex = null;

    // Search backward
    for (let i = index; i >= 0; i--) {
      if (moneyPyramid[i].moneySafe) {
        closestIndex = i;
        break;
      }
    }

    if (closestIndex !== null) {
      setActiveQuestionIndex(closestIndex);
    }
  };

  findClosestMoneySafeState(activeQuestionIndex);

  return (
    <div className="playScreen">
      <div className="gameOver">
        <div className="scoreContainer">
          <h4>Dein Gewinn:</h4>
          <h2>{moneyPyramid[activeQuestionIndex].money} €</h2>
          <AnswerBtn onClick={handleRestart}>Restart</AnswerBtn>
        </div>
      </div>
      <Pyramid />
    </div>
  );
};

export default GameOver;
