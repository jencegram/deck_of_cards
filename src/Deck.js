import React, { useState, useEffect } from 'react';
import Card from './Card';

// // The Deck component manages the deck of cards and the drawing a card feature.
function Deck() {
  const [deckId, setDeckId] = useState(null); // State to store the current deck ID.
  const [cards, setCards] = useState([]); // State to store drawn cards.

  // useEffect hook to fetch a new deck of cards when the component mounts.
  useEffect(() => {
    async function createDeck() {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDeckId(data.deck_id);
      } catch (error) {
        console.error("Could not create a new deck:", error);
      }
    }
  
    createDeck();
  }, []);
  
  
  // Function to draw a card from the deck.
  const drawCard = async () => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success) {
        setCards(existingCards => [...existingCards, ...data.cards]);
      } else {
        alert("Error: no cards remaining!");
      }
    } catch (error) {
      console.error("Could not draw a new card:", error);
    }
  };
  
  // The component renders a button to draw a card and displays the drawn cards.
  return (
    <div>
      <button onClick={drawCard} disabled={!deckId}>Draw Card</button>
      {cards.map(card => (
        <Card key={card.code} {...card} />
      ))}
      
    </div>
  );
}

export default Deck;
