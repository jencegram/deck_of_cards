import React from 'react';

// Card component for displaying a single card.
// It accepts the prop 'image' which is the URL of the card image to display.
function Card({ image }) {
  // Defined inline CSS for card
  const cardStyle = {
    width: '100px',
    height: '150px',
  };

  // The component renders an image element with the provided image URL and styling.
  return (
    <img
      src={image}
      alt="card"
      className="card"
      style={cardStyle}
    />
  );
}

export default Card;
