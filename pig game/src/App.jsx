import { useState } from "react";
import "./assets/App.css";

import dice1 from "./dice-1.png";
import dice2 from "./dice-2.png";
import dice3 from "./dice-3.png";
import dice4 from "./dice-4.png";
import dice5 from "./dice-5.png";
import dice6 from "./dice-6.png";

function PigGame() {

  const WINNING_SCORE = 20;

  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

  const [scores, setScores] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [dice, setDice] = useState(null);

  const switchPlayer = () => {
    setCurrentScore(0);
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  const rollDice = () => {
    if (!playing) return;

    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    setDice(diceNumber);

    if (diceNumber !== 1) {
      setCurrentScore(currentScore + diceNumber);
    } else {
      switchPlayer();
    }
  };

  const holdScore = () => {
    if (!playing) return;

    const newScores = [...scores];
    newScores[activePlayer] += currentScore;

    setScores(newScores);

    if (newScores[activePlayer] >= WINNING_SCORE) {
      setPlaying(false);
    } else {
      switchPlayer();
    }

    setCurrentScore(0);
  };

  const newGame = () => {
    setScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
    setPlaying(true);
    setDice(null);
  };

  return (
    <main>

      {/* Player 1 */}
      <section
        className={`player player--0 
        ${activePlayer === 0 ? "player--active" : ""} 
        ${!playing && scores[0] >= WINNING_SCORE ? "player--winner" : ""}`}
      >
        <h2 className="name">Player 1</h2>
        <p className="score">{scores[0]}</p>

        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">
            {activePlayer === 0 ? currentScore : 0}
          </p>
        </div>
      </section>

      {/* Player 2 */}
      <section
        className={`player player--1 
        ${activePlayer === 1 ? "player--active" : ""} 
        ${!playing && scores[1] >= WINNING_SCORE ? "player--winner" : ""}`}
      >
        <h2 className="name">Player 2</h2>
        <p className="score">{scores[1]}</p>

        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">
            {activePlayer === 1 ? currentScore : 0}
          </p>
        </div>
      </section>

      {/* Dice */}
      {dice && (
        <img
          src={diceImages[dice - 1]}
          alt="Playing dice"
          className="dice"
        />
      )}

      {/* Buttons */}
      <button className="btn btn--new" onClick={newGame}>
        🔄 New game
      </button>

      <button className="btn btn--roll" onClick={rollDice}>
        🎲 Roll dice
      </button>

      <button className="btn btn--hold" onClick={holdScore}>
        📥 Hold
      </button>

    </main>
  );
}

export default PigGame;