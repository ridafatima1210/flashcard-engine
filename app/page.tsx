'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllDecks, getDeckStats } from '@/lib/storage';
import { Deck } from '@/lib/types';
import DeckCard from '@/components/DeckCard';
import EmptyState from '@/components/EmptyState';

export default function HomePage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      setDecks(getAllDecks());
    } catch {
      setStorageError(true);
    }
  }, []);

  /* 🎬 Animation Variants */
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      {/* Header */}
<motion.header
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="flex items-center justify-between mb-16"
>
  <div>

    {/* ✨ Gradient Animated Title */}
    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-5xl font-extrabold tracking-tight 
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
      bg-clip-text text-transparent"
    >
      Flashcard Engine
    </motion.h1>

    {/* 💬 Main Tagline */}
    <motion.p
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-gray-600 dark:text-gray-300 mt-3 text-lg"
    >
      Turn your PDFs into{' '}
      <span className="font-semibold text-indigo-500">
        AI-powered flashcards
      </span>{' '}
      in seconds 
    </motion.p>

    {/* 🔥 Sub Tagline */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-sm text-gray-400 mt-1"
    >
      Smarter learning. Faster revision. Zero effort.
    </motion.p>

  </div>

  {/* 🎬 Animated Button */}
  <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
    <Link
      href="/upload"
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
      text-white px-6 py-2.5 rounded-xl font-medium 
      shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      + New Deck
    </Link>
  </motion.div>
</motion.header>

      {/* Error */}
      {storageError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 border border-yellow-200 text-yellow-800 
          rounded-xl px-4 py-3 mb-6 text-sm"
        >
          Storage unavailable — try disabling private browsing.
        </motion.div>
      )}

      {/* Content */}
      {decks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EmptyState />
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {decks.map(deck => (
            <motion.div
              key={deck.id}
              variants={item}
              transition={{ duration: 0.3 }}
            >
              <DeckCard
                deck={deck}
                stats={getDeckStats(deck)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}