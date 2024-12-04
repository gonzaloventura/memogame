import { motion } from 'framer-motion';
import { Trophy, XCircle } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  won: boolean;
  timeleft: number
}

export function GameOver({ score, onRestart, won, timeleft }: GameOverProps ) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-gray-800 p-8 rounded-xl flex flex-col items-center gap-4"
      >
        {won ? (
          <Trophy className="w-16 h-16 text-yellow-500" />
        ) : (
          <XCircle className="w-16 h-16 text-red-500" />
        )}
        <h2 className="text-2xl font-bold text-green-500">
          {won ? '¡Ganaste!' : '¡Tiempo Agotado!'}
        </h2>
        <p className="text-green-400">Puntaje Final: {score + timeleft}</p>
        <button
          onClick={onRestart}
          className="mt-4 px-6 py-2 bg-green-500 text-gray-900 rounded-full font-bold hover:bg-green-400 transition-colors"
        >
          Jugar de Nuevo
        </button>
      </motion.div>
    </motion.div>
  );
}