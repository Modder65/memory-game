import { useState } from "react";
import "../styles/App.css";
import { Header } from "./Header.jsx";
import { CardGame } from "./CardsContainer.jsx";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="app">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <CardGame
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
    </div>
  );
}

export default App;
