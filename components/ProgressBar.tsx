'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
}

export default function ProgressBar({ value, max, label }: ProgressBarProps) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);

  // 🎨 Dynamic color based on progress
  const gradient =
    pct < 30
      ? 'from-red-400 to-orange-500'
      : pct < 70
      ? 'from-yellow-400 to-green-500'
      : 'from-green-500 to-emerald-500';

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>

        <span className="text-sm font-semibold text-gray-800 dark:text-white">
          {value}/{max} • {pct}%
        </span>
      </div>

      {/* Bar Background */}
      <div className="relative w-full bg-gray-200/60 dark:bg-gray-700/60 rounded-full h-3 overflow-hidden">

        {/* ✨ Glow layer */}
        <div className="absolute inset-0 opacity-30 blur-md bg-gradient-to-r from-indigo-400 to-pink-400"></div>

        {/* Animated Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`}
        />

      </div>

      {/* 🔥 Milestone message */}
      {pct >= 80 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-green-500 mt-1"
        >
          🎉 Almost mastered!
        </motion.p>
      )}

    </div>
  );
}