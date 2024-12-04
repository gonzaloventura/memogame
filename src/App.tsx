import { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { GameBoard } from './components/GameBoard';
import { GameStats } from './components/GameStats';
import { GameOver } from './components/GameOver';
import { DifficultySelector } from './components/DifficultySelector';
import { Difficulty } from './types/game';
import { DIFFICULTY_CONFIG } from './utils/gameUtils';

export function App() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const startGame = (selectedDifficulty: Difficulty, customTime?: number) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeLeft(customTime || DIFFICULTY_CONFIG[selectedDifficulty].duration);
    setIsPlaying(true);
    setShowGameOver(false);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsPlaying(false);
            setShowGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleScore = (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    if (difficulty && newScore >= DIFFICULTY_CONFIG[difficulty].targetScore) {
      setIsPlaying(false);
      setShowGameOver(true);
    }
  };

  const config = difficulty ? DIFFICULTY_CONFIG[difficulty] : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex flex-col items-center py-8">
        <Logo />
        {!isPlaying && !showGameOver ? (
          <DifficultySelector onSelect={startGame} />
        ) : (
          difficulty && (
            <GameBoard
              difficulty={difficulty}
              onScore={handleScore}
              gameTime={timeLeft}
            />
          )
        )}
        {showGameOver && config && (
          <GameOver
            score={score}
            onRestart={() => {
              setShowGameOver(false);
              setDifficulty(null);
            }}
            won={score >= config.targetScore}
            timeleft={timeLeft}
          />
        )}
        {isPlaying && config && (
          <GameStats
            timeLeft={timeLeft}
            score={score}
            targetScore={config.targetScore}
          />
        )}
      </div>
    </div>
  );
}

export default App;