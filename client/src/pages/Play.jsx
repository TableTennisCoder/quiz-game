import "../App.css";
import Game from "../components/play/game/Game";
import Pyramid from "../components/play/pyramid/Pyramid";
import GameOver from "../components/play/game/GameOver";

const Play = () => {
  return (
    <div className="playScreen">
      <Game />
      <Pyramid />
    </div>
  );
};

export default Play;
