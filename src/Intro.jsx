import PropTypes from "prop-types";

const Intro = (props) => {
  const bestTime = props.bestTime;
  const leastTries = props.leastTries;
  return (
    <>
      <div className="my-div">
        <h4>Best Time: {bestTime ? bestTime : "N/A"}</h4>
        <h1 className="title">Tenzies</h1>
        <h4>Least Trys: {leastTries ? leastTries : "N/A"}</h4>
      </div>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
    </>
  );
};

export default Intro;

Intro.propTypes = {
  bestTime: PropTypes.any,
  leastTries: PropTypes.any,
};
