import { Difficulty, GameConfig } from '../types/game';

const EMOJIS = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎸', '🎺', '🎻', '🎹', '🎼', '🎧', '🎤', '🎬', '🎨', '🎭'];

export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, GameConfig> = {
  easy: {
    gridSize: 12,
    duration: 60,
    targetScore: 60,
  },
  medium: {
    gridSize: 20,
    duration: 90,
    targetScore: 100,
  },
  hard: {
    gridSize: 24,
    duration: 120,
    targetScore: 120,
  },
};

export function generateCards(difficulty: Difficulty): Card[] {
  const { gridSize } = DIFFICULTY_CONFIG[difficulty];
  const selectedEmojis = EMOJIS.slice(0, gridSize / 2);
  const pairs = [...selectedEmojis, ...selectedEmojis];
  
  return pairs.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  })).sort(() => Math.random() - 0.5);
}

export function checkForMatch(cards: Card[], firstIndex: number, secondIndex: number): boolean {
  return cards[firstIndex].value === cards[secondIndex].value;
}