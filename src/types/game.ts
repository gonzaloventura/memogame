export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameConfig {
  gridSize: number;
  duration: number;
  targetScore: number;
}

export interface DifficultySettings {
  difficulty: Difficulty;
  customTime?: number;
}