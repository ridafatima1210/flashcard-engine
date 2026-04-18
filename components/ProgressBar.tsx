'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
}

export default function ProgressBar({ value, max, label }: ProgressBarProps) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-semibold text-gray-800 dark:text-white">
          {pct}%
        </span>
      </div>

      {/* Bar Background */}
      <div className="w-full bg-gray-200/60 dark:bg-gray-700/60 rounded-full h-2.5 overflow-hidden">

        {/* Animated Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md"
        />

      </div>

    </div>
  );
}