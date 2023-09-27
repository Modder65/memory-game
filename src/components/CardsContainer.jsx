import { useState, useEffect, useCallback } from "react";
import { Card } from "./Card.jsx";
import PropTypes from "prop-types";

const useCardData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect(() => {
    const cardNames = [
      "Blue-Eyes White Dragon",
      "Seiyaryu",
      "Red-Eyes Black Dragon",
      "Luster Dragon",
      "Tri-Horned Dragon",
      "Alexandrite Dragon",
      "The Dragon Dwelling In The Cave",
      "Crawling Dragon",
      "Hunter Dragon",
    ];

    const cardNamesParam = cardNames.join("|");

    const fetchData = async () => {
      try {
        const fetchedData = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(
            cardNamesParam
          )}`
        );
        const jsonData = await fetchedData.json();
        setShuffledCards(jsonData.data.sort(() => Math.random() - 0.5));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { loading, error, shuffledCards, setShuffledCards };
};

export function CardGame({
  currentScore,
  setCurrentScore,
  bestScore,
  setBestScore,
}) {
  const { loading, error, shuffledCards, setShuffledCards } = useCardData();
  const totalCards = 9;
  const [clickedCards, setClickedCards] = useState([]);

  const shuffleCards = useCallback(() => {
    setShuffledCards((prevState) =>
      [...prevState].sort(() => Math.random() - 0.5)
    );
  }, [setShuffledCards]);

  const handleRestart = useCallback(() => {
    setClickedCards([]);
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    setCurrentScore(0);
    shuffleCards();
  }, [currentScore, bestScore, setBestScore, setCurrentScore, shuffleCards]);

  const handleCardClick = (card) => {
    if (clickedCards.includes(card)) {
      alert("Game Over");
      handleRestart();
    } else {
      setClickedCards((prev) => [...prev, card]);
      setCurrentScore((prevScore) => prevScore + 1);
    }
  };

  useEffect(() => {
    if (currentScore === totalCards) {
      alert("You Won!");
      handleRestart();
    }
  }, [currentScore, totalCards, handleRestart]);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="cards-container">
      {shuffledCards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onCardClick={() => handleCardClick(card)}
          shuffleCards={shuffleCards}
        />
      ))}
    </div>
  );
}

/* Prop Validation */

CardGame.propTypes = {
  currentScore: PropTypes.number.isRequired,
  setCurrentScore: PropTypes.func.isRequired,
  bestScore: PropTypes.number.isRequired,
  setBestScore: PropTypes.func.isRequired,
};
