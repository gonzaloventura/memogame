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
  const [didWin, setDidWin] = useState(false); // Nuevo estado para determinar si ganó

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeLeft(DIFFICULTY_CONFIG[selectedDifficulty].duration);
    setIsPlaying(true);
    setShowGameOver(false);
    setDidWin(false);
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
            setDidWin(false); // Si se termina el tiempo, el jugador pierde
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleScore = (points: number) => {
    const newScore = Math.max(0, score + points);
    setScore(newScore);

    if (difficulty && newScore >= DIFFICULTY_CONFIG[difficulty].targetScore) {
      setIsPlaying(false);
      setShowGameOver(true);
      setDidWin(true); // Marca la victoria si se alcanza el puntaje objetivo
    }
  };

  const handleGameEnd = () => {
    setIsPlaying(false);
    setShowGameOver(true);
    setDidWin(true); // Marca la victoria si se completan todas las cartas
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
              onGameEnd={handleGameEnd} // Llama a esta función si se completan todas las cartas
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
            won={didWin} // Envía el estado de victoria o derrota
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
