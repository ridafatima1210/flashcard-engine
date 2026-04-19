'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EmptyState() {
  return (
    <div className="flex justify-center items-center mt-20">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-xl text-center p-12 rounded-3xl 
        bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl 
        border border-white/30 dark:border-gray-700
        shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
      >

        {/* 🌈 Glow Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-r from-indigo-200/20 to-pink-200/20"></div>

        {/* 📚 Animated Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          📚
        </motion.div>

        {/* 🔥 Heading */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Start Your Learning Journey 
        </h2>

        {/* 🧠 Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
          Upload any PDF and instantly turn it into smart flashcards powered by AI.
        </p>

        {/* 🎯 Steps */}
        <div className="text-xs text-gray-400 mb-8 space-y-1">
          <p>Upload PDF</p>
          <p>AI generates flashcards</p>
          <p>Practice with spaced repetition</p>
        </div>

        {/* 🚀 CTA */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/upload"
            className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            text-white font-semibold px-8 py-3 rounded-xl 
            shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Create your first deck
          </Link>
        </motion.div>

        {/* 💡 Features hint */}
        <div className="flex justify-center gap-6 mt-8 text-xs text-gray-400">
          <span>Smart repetition</span>
          <span>Instant cards</span>
          <span>Track progress</span>
        </div>

      </motion.div>
    </div>
  );
}