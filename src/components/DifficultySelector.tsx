import { motion } from 'framer-motion';
import { useState } from 'react';
import { Difficulty } from '../types/game';
import { DIFFICULTY_CONFIG } from '../utils/gameUtils';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty, customTime?: number) => void;
}

export function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [customTime, setCustomTime] = useState<number | ''>('');

  const handleSelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleStart = () => {
    if (selectedDifficulty) {
      const validCustomTime = customTime ? Math.max(30, Math.min(300, Number(customTime))) : undefined;
      onSelect(selectedDifficulty, validCustomTime);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex flex-col items-center gap-4 mt-8"
    >
      <h2 className="text-2xl font-bold text-green-500 mb-4">Selecciona la Dificultad</h2>
      <div className="flex gap-4 mb-6">
        {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
          <motion.button
            key={difficulty}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(difficulty)}
            className={`px-6 py-3 rounded-full font-bold transition-colors ${
              selectedDifficulty === difficulty ? 'ring-4 ring-white' : ''
            }`}
            style={{
              backgroundColor: 
                difficulty === 'easy' ? '#22c55e' : 
                difficulty === 'medium' ? '#eab308' : 
                '#ef4444',
              color: '#111827'
            }}
          >
            {difficulty === 'easy' ? 'Fácil' : 
             difficulty === 'medium' ? 'Medio' : 
             'Difícil'}
          </motion.button>
        ))}
      </div>
      
      {selectedDifficulty && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <label className="text-green-500">
              Tiempo (segundos):
              <input
                type="number"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value ? Number(e.target.value) : '')}
                placeholder={String(DIFFICULTY_CONFIG[selectedDifficulty].duration)}
                className="ml-2 px-3 py-1 bg-gray-700 text-green-500 rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                min="30"
                max="300"
              />
            </label>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-8 py-3 bg-green-500 text-gray-900 rounded-full font-bold hover:bg-green-400 transition-colors"
          >
            Comenzar Juego
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}