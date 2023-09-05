import PropTypes from "prop-types";

const Die = (props) => {
  const value = props.value;
  const isHeld = props.isHeld;
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  //initializing the dots array
  const dotsArr = [];
  //dynamically generating dots based on the value prop
  const dots = (value) => {
    for (let i = 0; i < value; i++) {
      dotsArr.push(<div key={i} className="die-dot"></div>);
    }
    return dotsArr;
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {dots(value)}
    </div>
  );
};

Die.propTypes = {
  value: PropTypes.number.isRequired,
  isHeld: PropTypes.bool.isRequired,
  holdDice: PropTypes.func.isRequired,
};

export default Die;
