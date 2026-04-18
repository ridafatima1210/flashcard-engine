'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rating } from '@/lib/types';

interface RatingButtonsProps {
  onRate: (rating: Rating) => void;
  isLoading?: boolean;
}

/* ✅ Proper typing FIX */
const BUTTONS: {
  label: string;
  rating: Rating;
  color: string;
  key: string;
}[] = [
  { label: 'Again', rating: 0, color: 'from-red-500 to-red-600', key: '1' },
  { label: 'Hard',  rating: 1, color: 'from-orange-500 to-orange-600', key: '2' },
  { label: 'Good',  rating: 2, color: 'from-green-500 to-green-600', key: '3' },
  { label: 'Easy',  rating: 3, color: 'from-blue-500 to-blue-600', key: '4' },
];

export default function RatingButtons({ onRate, isLoading }: RatingButtonsProps) {

  /* ⌨️ Keyboard shortcuts */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (isLoading) return;

      const btn = BUTTONS.find(b => b.key === e.key);
      if (btn) {
        onRate(btn.rating);
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onRate, isLoading]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

      {BUTTONS.map((b, i) => (
        <motion.button
          key={b.label}
          disabled={isLoading}
          onClick={() => onRate(b.rating)}

          /* 🎬 Animation */
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}

          className={`
            relative overflow-hidden
            bg-gradient-to-r ${b.color}
            text-white font-semibold py-3 rounded-xl
            shadow-md hover:shadow-xl
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >

          {/* ✨ Hover Glow */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-white/10"></div>

          {/* 🧠 Content */}
          <div className="relative z-10 flex flex-col items-center">
            <span>{b.label}</span>
            <span className="text-xs opacity-70">[{b.key}]</span>
          </div>

        </motion.button>
      ))}

    </div>
  );
}