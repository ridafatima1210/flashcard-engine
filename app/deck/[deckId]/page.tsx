'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getDeckById, getDeckStats, deleteDeck } from '@/lib/storage';
import { Deck, Flashcard } from '@/lib/types';
import StatsPanel from '@/components/StatsPanel';
import ProgressBar from '@/components/ProgressBar';

function dueDateLabel(dueDate: string): string {
  const due = new Date(dueDate);
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Due now';
  if (diffDays === 1) return 'Due today';
  return `Due in ${diffDays} days`;
}

function CardRow({ card }: { card: Flashcard }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/30 dark:border-gray-700 overflow-hidden shadow-sm"
    >
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/40 dark:hover:bg-gray-800 transition"
        onClick={() => setExpanded(v => !v)}
      >
        <span className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">
          {card.front}
        </span>
        <span className="text-xs text-gray-400 ml-4 shrink-0">
          {dueDateLabel(card.dueDate)}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {card.back}
          </p>

          {card.hint && (
            <p className="text-xs text-indigo-400 mt-1 italic">
              Hint: {card.hint}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function DeckDetailPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = params.deckId as string;

  const [deck, setDeck] = useState<Deck | null | undefined>(undefined);

  useEffect(() => {
    setDeck(getDeckById(deckId));
  }, [deckId]);

  if (deck === undefined) return null;

  if (!deck) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Deck not found.</p>
        <Link href="/" className="text-indigo-600 hover:underline font-medium">
          Back to Home
        </Link>
      </div>
    );
  }

  const stats = getDeckStats(deck);

  function handleDelete() {
    if (!confirm('Delete this deck? This cannot be undone.')) return;
    deleteDeck(deckId);
    router.push('/');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* 🔙 Breadcrumb */}
      <Link href="/" className="text-gray-400 hover:text-gray-600 mb-6 inline-block">
        ← Back
      </Link>

      {/* 🔥 Header */}
      <div className="flex justify-between items-start mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {deck.name}
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            {deck.cards.length} cards
          </p>
        </div>

        <button
          onClick={handleDelete}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>

      {/* 📊 Stats */}
      <StatsPanel stats={stats} />

      {/* 📈 Progress */}
      <div className="mt-6">
        <ProgressBar
          value={stats.mastered}
          max={stats.total}
          label="Mastery"
        />
      </div>

      {/* 🎯 CTA */}
      <motion.div
        whileHover={{ scale: stats.due > 0 ? 1.03 : 1 }}
        className="mt-6"
      >
        <Link
          href={stats.due > 0 ? `/deck/${deck.id}/practice` : '#'}
          className={`
            block text-center font-semibold py-3 rounded-xl
            ${
              stats.due > 0
                ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
            }
          `}
        >
          {stats.due > 0
            ? `🔥 Practice (${stats.due} due)`
            : 'No cards due'}
        </Link>
      </motion.div>

      {/* 📄 Cards */}
      {deck.cards.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Cards ({deck.cards.length})
          </h2>

          <div className="flex flex-col gap-3">
            {deck.cards.map(card => (
              <CardRow key={card.id} card={card} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}