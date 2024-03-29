import PropTypes from "prop-types";

export function Header({ currentScore, bestScore }) {
  return (
    <header className="heading">
      <h1>Memory Game</h1>
      <div className="score-keepers">
        <div className="current-score">
          <p>{`Current Score: ${currentScore}`}</p>
        </div>
        <div className="best-score">
          <p>{`Best Score: ${bestScore}`}</p>
        </div>
      </div>
    </header>
  );
}

/* Prop Validation */

Header.propTypes = {
  currentScore: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
};
