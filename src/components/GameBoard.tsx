import { useEffect, useState } from 'react';
import { Card as CardComponent } from './Card';
import { generateCards, checkForMatch, type Card } from '../utils/gameUtils';
import { Difficulty } from '../types/game';

interface GameBoardProps {
  onScore: (points: number) => void;
  gameTime: number;
  difficulty: Difficulty;
}

export function GameBoard({ onScore, gameTime, difficulty }: GameBoardProps) {
  const [cards, setCards] = useState<Card[]>(() => generateCards(difficulty));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setCards(generateCards(difficulty));
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsProcessing(false);
  }, [difficulty]);

  useEffect(() => {
    if (flippedCards.length === 2 && !isProcessing) {
      const [first, second] = flippedCards;
      setIsProcessing(true);

      if (checkForMatch(cards, first, second)) {
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, cards[first].value]);
          setFlippedCards([]);
          onScore(10);
          setIsProcessing(false);
        }, 300);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsProcessing(false);
        }, 800);
      }
    }
  }, [flippedCards, cards, onScore, isProcessing]);

  const handleCardClick = (index: number) => {
    if (
      isProcessing ||
      flippedCards.includes(index) ||
      matchedPairs.includes(cards[index].value) ||
      flippedCards.length === 2
    ) {
      return;
    }

    setFlippedCards(prev => [...prev, index]);
  };

  const getGridConfig = () => {
    switch (difficulty) {
      case 'easy':
        return 'grid-cols-4 grid-rows-4 max-w-4xl'; // 4 columnas x 4 filas
      case 'medium':
        return 'grid-cols-5 grid-rows-5 max-w-5xl'; // 5 columnas x 5 filas
      case 'hard':
        return 'grid-cols-6 grid-rows-6 max-w-6xl'; // 6 columnas x 6 filas
    }
  };


  return (
    <div className="w-full px-4 flex justify-center mt-8">
      <div
        className={`grid ${getGridConfig()} gap-6 w-full`}
        style={{
          aspectRatio: '1', // Mantén la cuadrícula cuadrada.
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="min-w-[80px] min-h-[80px] md:min-w-[120px] md:min-h-[120px] aspect-w-1 aspect-h-1" // Tamaño mínimo dinámico para las tarjetas
          >
            <CardComponent
              {...card}
              isFlipped={
                flippedCards.includes(index) ||
                matchedPairs.includes(card.value)
              }
              isMatched={matchedPairs.includes(card.value)}
              onClick={() => handleCardClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}