import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CardProps {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ value, isFlipped, isMatched, onClick }: CardProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isFlipped) {
      setShowContent(true);
    } else {
      const timer = setTimeout(() => setShowContent(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
      onClick={onClick}
      className="relative aspect-square w-full cursor-pointer perspective"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full h-full relative transform-gpu preserve-3d ${
          isMatched ? 'animate-glow' : ''
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 rounded-xl border-4 ${
            isMatched
              ? 'border-green-500 bg-green-900/20'
              : 'border-green-500/30 bg-gray-800'
          } backface-hidden`}
        />
        
        {/* Back of card */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-xl bg-gray-800 border-4 border-green-500 text-green-500 text-5xl font-bold backface-hidden rotate-y-180`}
        >
          {showContent && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {value}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}