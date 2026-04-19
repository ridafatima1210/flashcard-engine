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

  // 🔥 Aggregate stats
  const totalDecks = decks.length;
  const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0);
  const totalDue = decks.reduce(
    (acc, d) => acc + getDeckStats(d).due,
    0
  );

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

      {/* 🔥 HEADER */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between mb-12"
      >
        <div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-extrabold tracking-tight 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            bg-clip-text text-transparent"
          >
            Flashcard Engine
          </motion.h1>

          <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
            Turn PDFs into{' '}
            <span className="font-semibold text-indigo-500">
              AI flashcards
            </span>{' '}
            instantly
          </p>

        </div>

        <motion.div whileHover={{ scale: 1.08 }}>
          <Link
            href="/upload"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            text-white px-6 py-2.5 rounded-xl font-medium shadow-lg"
          >
            + New Deck
          </Link>
        </motion.div>
      </motion.header>

      {/* 🔥 TODAY PRACTICE (KEY FEATURE) */}
      {totalDue > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl 
          bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-1">
            🔥 Today’s Practice
          </h2>
          <p className="text-sm opacity-90 mb-4">
            You have {totalDue} cards due today
          </p>

          <Link
            href={`/deck/${decks[0]?.id}/practice`}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm"
          >
            Start Practicing →
          </Link>
        </motion.div>
      )}

      {/* 📊 QUICK STATS */}
      {decks.length > 0 && (
        <div className="flex gap-6 text-sm text-gray-500 mb-6">
          <span>📚 {totalDecks} decks</span>
          <span>🧠 {totalCards} cards</span>
          <span className="text-indigo-500 font-medium">
            ⏰ {totalDue} due
          </span>
        </div>
      )}

      {/* Error */}
      {storageError && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 
        rounded-xl px-4 py-3 mb-6 text-sm">
          Storage unavailable — try disabling private browsing.
        </div>
      )}

      {/* CONTENT */}
      {decks.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {decks.map(deck => (
            <motion.div key={deck.id} variants={item}>
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