import { motion } from 'framer-motion';

interface GameStatsProps {
  timeLeft: number;
  score: number;
  targetScore: number;
}

export function GameStats({ timeLeft, score, targetScore }: GameStatsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-800/95 py-4 px-8 flex justify-center gap-8 text-green-500"
    >
      <div className="flex items-center gap-2">
        <span className="text-green-400">TIEMPO:</span>
        <motion.span
          key={timeLeft}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="font-bold"
        >
          {timeLeft}s
        </motion.span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-green-400">PUNTAJE:</span>
        <motion.span
          key={score}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="font-bold"
        >
          {score}/{targetScore}
        </motion.span>
      </div>
    </motion.div>
  );
}