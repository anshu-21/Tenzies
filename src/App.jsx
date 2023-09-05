import Intro from "./Intro";
import Die from "./Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  //Generates a random number between 1-6
  //and returns an object consisting of that random number
  //an id and a isHeld property set to false
  const generateDiceValue = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return { value: randomNumber, isHeld: false, id: nanoid() };
  };

  //returns an array of length 10 consists
  //of objects returned by generateDiceValue() function
  const allNewDice = () => {
    const numArr = [];
    let i = 10;
    while (i--) {
      numArr.push(generateDiceValue());
    }
    return numArr;
  };

  const [dice, setDice] = useState(allNewDice()); //holds the array of dice
  const [tenzies, setTenzies] = useState(false); //like a flag to determine when the game ends
  const [rollCount, setRollCount] = useState(0); //holds the number of rolls an user took to win the game
  const [startTime, setStartTime] = useState(null); //holds the time an user took to win the game

  //checking for win coditions
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  //calculating the number of rolls and the time it took to win the game
  useEffect(() => {
    if (tenzies) {
      const endTime = new Date(); //tracking the end time
      const timeDiff = (endTime - startTime) / 1000; //calculating the time in seconds
      const bestTime = localStorage.getItem("bestTime");
      const leastTries = localStorage.getItem("leastTries");

      if (!bestTime || timeDiff < parseFloat(bestTime)) {
        localStorage.setItem("bestTime", timeDiff.toFixed(2));
      }
      if (!leastTries || rollCount < parseInt(leastTries)) {
        localStorage.setItem("leastTries", rollCount);
      }
    }
  }, [tenzies, rollCount, startTime]);

  //it's changing the isHeld property to true
  //for the one that user holds
  const holdDice = (id) => {
    setDice((prv) =>
      prv.map((el) => (el.id === id ? { ...el, isHeld: !el.isHeld } : el))
    );
  };

  //creating Die components according to the Dice array
  const diceElements = dice.map((el) => (
    <Die
      value={el.value}
      isHeld={el.isHeld}
      key={el.id}
      holdDice={() => holdDice(el.id)}
    />
  ));

  const clickHandler = () => {
    if (!startTime) {
      setStartTime(new Date()); //tracking the game start time
    }
    setRollCount((prev) => prev + 1); //increasing roll count on every click
    return tenzies
      ? (setDice(allNewDice()), //reseting the game after win
        setTenzies((prev) => !prev),
        setStartTime(null),
        setRollCount(0))
      : setDice(
          (
            prev //generating new values except the one that are marked as held
          ) => prev.map((el) => (el.isHeld ? el : generateDiceValue()))
        );
  };

  //retriving the besttime and leastTries to pass as props
  const bestTime = localStorage.getItem("bestTime");
  const leastTries = localStorage.getItem("leastTries");

  return (
    <>
      <center>{tenzies && <h1>You Won!</h1>}</center>
      <main>
        {tenzies && <Confetti />}

        <Intro bestTime={bestTime} leastTries={leastTries} />
        <div className="dice-container">{diceElements}</div>

        <button className="roll" onClick={clickHandler}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}

export default App;
