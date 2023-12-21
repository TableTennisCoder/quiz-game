import "../Play.css";
import moneyPyramid from "./moneyPyramid.js";
import useStore from "../../../Store.js";

const Pyramid = () => {
  const activeQuestionIndex = useStore((state) => state.activeQuestionIndex);

  const updatedMoneyPyramid = moneyPyramid.map((row, index) => ({
    ...row,
    active: index === activeQuestionIndex,
  }));

  return (
    <div className="pyramid">
      {updatedMoneyPyramid
        .map((row) => (
          <div
            key={row.question}
            className={`pyramidRow ${row.active ? "activeRow" : ""}`}
          >
            <p className="pyramidRow__question">{row.question}</p>
            <p className="pyramidRow__money">€ {row.money}</p>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default Pyramid;
