'use client';

import { Flashcard } from '@/lib/types';
import { motion } from 'framer-motion';

interface FlashCardProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div
      className="card-container w-full h-64 md:h-80 cursor-pointer group perspective"
      onClick={isFlipped ? undefined : onFlip}
    >
      <motion.div
        className={`card-inner ${isFlipped ? 'flipped' : ''} relative w-full h-full`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >

        {/* 🔥 Glow Layer */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-r from-indigo-200/20 to-pink-200/20"></div>

        {/* Front */}
        <div className="card-face bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center p-8 border border-white/30 dark:border-gray-700">

          <div className="text-center relative z-10">
            <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-white leading-relaxed">
              {card.front}
            </p>

            {/* Hint to flip */}
            {!isFlipped && (
              <p className="text-xs text-gray-400 mt-4">
                Click to reveal answer
              </p>
            )}
          </div>

        </div>

        {/* Back */}
        <div className="card-face card-back-face bg-indigo-100/60 dark:bg-indigo-900/40 backdrop-blur-xl rounded-2xl shadow-xl flex flex-col items-center justify-between p-8 border border-white/30 dark:border-gray-700">

          <div className="flex-1 flex items-center justify-center text-center relative z-10">
            <p className="text-lg md:text-xl text-gray-800 dark:text-white leading-relaxed">
              {card.back}
            </p>
          </div>

          {card.hint && (
            <p className="text-sm text-indigo-500 dark:text-indigo-300 mt-4 italic text-center">
              Hint: {card.hint}
            </p>
          )}
        </div>

      </motion.div>
    </div>
  );
}