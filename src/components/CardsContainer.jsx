import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "./Card.jsx";

export function Cards({ currentScore, setCurrentScore, setBestScore }) {
  // The total number of cards to be used in the game
  const totalCards = 9;

  // State variables to track if the data has loaded, the cards that have been shuffled, and the cards that have been clicked
  const [dataLoaded, setDataLoaded] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  // A ref to hold the fetched card data
  const cardData = useRef([]);

  // A callback function to shuffle the cards
  const shuffleCards = useCallback(() => {
    setShuffledCards((prevState) =>
      [...prevState].sort(() => Math.random() - 0.5)
    );
  }, []);

  // A callback function to handle restarting the game
  const handleRestart = useCallback(() => {
    setClickedCards([]);
    setBestScore(currentScore);
    setCurrentScore(0);
    shuffleCards();
  }, [currentScore, setBestScore, setCurrentScore, shuffleCards]);

  // Function to handle what happens when a card is clicked
  const handleCardClick = (card) => {
    // If the card has already been clicked, it triggers a game over and restarts the game
    if (clickedCards.includes(card)) {
      alert("Game Over");
      handleRestart();
    } else {
      // If the card has not been clicked, it adds the card to the clicked cards list and increments the score
      setClickedCards((prev) => [...prev, card]);
      setCurrentScore((prevScore) => prevScore + 1);
    }
  };

  // Effect hook to fetch the card data when the component mounts
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

    // Async function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(
            cardNamesParam
          )}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        cardData.current = data;
        console.log(cardData.current); //remove later
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, []);

  // Effect hook to check if the player has won and to handle restarting the game if they have
  useEffect(() => {
    if (currentScore === totalCards) {
      alert("You Won!");
      handleRestart();
    }
  }, [currentScore, totalCards, handleRestart]);

  // Effect hook to shuffle the cards once the data has loaded
  useEffect(() => {
    if (dataLoaded) {
      setShuffledCards(cardData.current.data.sort(() => Math.random() - 0.5));
    }
  }, [dataLoaded]);

  // The component's return statement, rendering a container div with a map function to render each Card component
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
