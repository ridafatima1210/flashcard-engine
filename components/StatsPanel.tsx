'use client';

import { motion } from 'framer-motion';

interface StatsPanelProps {
  stats: {
    total: number;
    due: number;
    mastered: number;
    learning: number;
    new: number;
  };
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const boxes = [
    {
      label: 'New',
      value: stats.new,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'from-sky-100/40 to-transparent',
      icon: '🆕',
    },
    {
      label: 'Learning',
      value: stats.learning,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'from-orange-100/40 to-transparent',
      icon: '📖',
    },
    {
      label: 'Due',
      value: stats.due,
      color: 'text-red-600 dark:text-red-400',
      bg: 'from-red-100/40 to-transparent',
      icon: '⏰',
    },
    {
      label: 'Mastered',
      value: stats.mastered,
      color: 'text-green-600 dark:text-green-400',
      bg: 'from-green-100/40 to-transparent',
      icon: '✅',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {boxes.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`
            relative rounded-xl p-4 text-center
            bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl
            border border-white/30 dark:border-gray-700
            shadow-sm hover:shadow-md
            transition-all duration-300 hover:-translate-y-1
          `}
        >

          {/* Background Gradient Glow */}
          <div className={`absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition bg-gradient-to-br ${b.bg}`}></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Icon */}
            <div className="text-xl mb-1">{b.icon}</div>

            {/* Value */}
            <div className={`text-2xl font-bold ${b.color}`}>
              {b.value}
            </div>

            {/* Label */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {b.label}
            </div>

          </div>

        </motion.div>
      ))}

    </div>
  );
}