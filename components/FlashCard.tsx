'use client';

import { Flashcard } from '@/lib/types';
import { useEffect } from 'react';

interface FlashCardProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {

  // ⌨️ Flip with spacebar
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault();
        onFlip();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onFlip]);

  return (
    <div
      className="card-container w-full h-64 md:h-80 cursor-pointer group"
      onClick={onFlip}
      role="button"
      aria-label="Flashcard - click to flip"
    >
      <div
        className={`card-inner relative w-full h-full ${
          isFlipped ? 'flipped' : ''
        }`}
      >
        {/* ✨ Glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-r from-indigo-200/20 to-pink-200/20"></div>

        {/* ================= FRONT ================= */}
        <div className="card-face bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl flex items-center justify-center p-8">

          <div className="text-center relative z-10">
            <p className="text-xs uppercase tracking-wider opacity-70 mb-3">
              Question
            </p>

            <p className="text-xl md:text-2xl font-semibold leading-relaxed">
              {card.front}
            </p>

            {!isFlipped && (
              <p className="text-xs text-white/70 mt-6 animate-pulse">
                Click or press SPACE to reveal answer
              </p>
            )}
          </div>

        </div>

        {/* ================= BACK ================= */}
        <div className="card-face card-back-face bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center justify-between p-8 border border-gray-200 dark:border-gray-700">

          <div className="text-center relative z-10 flex-1 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
              Answer
            </p>

            <p className="text-lg md:text-xl text-gray-800 dark:text-white leading-relaxed">
              {card.back}
            </p>
          </div>

          {card.hint && (
            <p className="text-sm text-indigo-500 dark:text-indigo-300 mt-4 italic text-center">
              Hint: {card.hint}
            </p>
          )}

          <p className="text-xs text-gray-400 mt-4">
            Click or press SPACE to flip back
          </p>

        </div>
      </div>
    </div>
  );
}