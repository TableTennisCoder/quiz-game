import {usePlayersStore} from "../../../Store";

const InfoBoard = () => {
  const players = usePlayersStore((state) => state.players);

//   console.log(players);

  return (
    <div>
      <h2 className="message">Active Players (2):</h2>
      <h2 className="message">Max</h2>
      <h2 className="message">Peter</h2>
    </div>
  );
};

export default InfoBoard;
