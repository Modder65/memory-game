import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 1. create 1 component for the page header and 2 score keepers
// 2. create 1 component for the container of all the cards
// 3. create 1 component for a card that makes an API call to retrieve the data of 10 cards
// 4. in card, use the map method to display all cards to the page with its jsx filled out with the data from the API object
// 5. use state to keep track of all clicked cards
// 6. update that state each time a card is clicked
// 7. create a handler function passed as an onClick to each card that updates the state for all clicked cards
// 8. everytime that state updates check in useEffect if the clicked card is already included in the current state
// 9. if it is then restart the game
// 10. if not then shuffle the cards and increment the current score and best score by 1

/*

UseEffect(() => {
  //reshuffle the cards on the screen

  //check if the clickedCards state includes the current value of the chosenCard state
  //if it does then call function to reset the game
  //if not then continue the game

  //update the current card state passing in the value of null

}, [selectedCardState]);

*/

//Card images are 421x614
