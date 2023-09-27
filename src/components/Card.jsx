import PropTypes from "prop-types";

export function Card({ card, onCardClick, shuffleCards }) {
  const handleCardClick = () => {
    onCardClick();
    shuffleCards();
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={card.card_images[0].image_url} alt={card.name} />
    </div>
  );
}

/* Prop Validation */

Card.propTypes = {
  card: PropTypes.shape({
    card_images: PropTypes.arrayOf(
      PropTypes.shape({
        image_url: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  shuffleCards: PropTypes.func.isRequired,
};
