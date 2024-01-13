import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';

// The Deck component manages the deck of cards, drawing a card, and the auto-draw feature
function Deck() {
  const [deckId, setDeckId] = useState(null); // State for storing the deck ID.
  const [cards, setCards] = useState([]); // State for storing drawn cards.
  const [isDrawing, setIsDrawing] = useState(false); // State to manage drawing status.

  // Fetch a new deck of cards when the component mounts.
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
  const drawCard = useCallback(async () => {
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
        setIsDrawing(false);
      }
    } catch (error) {
      console.error("Could not draw a new card:", error);
      setIsDrawing(false);
    }
  }, [deckId]);

  // Auto-draw cards every second when isDrawing is true.
  useEffect(() => {
    let intervalId;

    // Setting up an interval to draw cards every second.
    if (isDrawing && deckId) {
      intervalId = setInterval(drawCard, 1000);
    }

    // Clearing the interval when drawing stops or the component unmounts.
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isDrawing, deckId, drawCard]);

  // Toggles the isDrawing state to start or stop drawing cards.
  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
  }

  // Component renders a button to draw a card and displays the drawn cards.
  return (
    <div>
      <button onClick={toggleDrawing} disabled={!deckId}>
        {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
      </button>
      {cards.map(card => (
        <Card key={card.code} {...card} />
      ))}
    </div>
  );
}

export default Deck;
