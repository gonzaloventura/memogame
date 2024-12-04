import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

export function Logo() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-2 text-4xl font-bold text-green-500"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Gamepad2 className="w-8 h-8" />
      </motion.div>
      <span>Juego de la Memoria</span>
    </motion.div>
  );
}