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
