import Link from 'next/link';
import { Deck } from '@/lib/types';
import { getDeckStats } from '@/lib/storage';
import ProgressBar from './ProgressBar';


interface DeckCardProps {
  deck: Deck;
  stats: ReturnType<typeof getDeckStats>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function DeckCard({ deck, stats }: DeckCardProps) {
  const hasDue = stats.due > 0;

  return (
    <Link
      href={`/deck/${deck.id}`}
      className={`
        group relative block rounded-2xl p-5 
        bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl 
        border border-white/30 dark:border-gray-700
        shadow-md hover:shadow-2xl 
        hover:-translate-y-1 hover:scale-[1.02]
        transition-all duration-300
        ${hasDue ? 'ring-2 ring-indigo-400/50' : ''}
      `}
    >
      {/* 🔥 Glow Overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-r from-indigo-200/20 to-pink-200/20"></div>

      {/* Top Section */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <h2 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight line-clamp-2 group-hover:text-indigo-600 transition">
          {deck.name}
        </h2>

        {hasDue && (
          <span className="ml-2 shrink-0 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">
            {stats.due} due
          </span>
        )}
      </div>

      {/* Date */}
      <p className="text-xs text-gray-400 mb-4 relative z-10">
        Created {formatDate(deck.createdAt)}
      </p>

      {/* Progress */}
      <div className="mb-2 relative z-10">
        <ProgressBar value={stats.mastered} max={stats.total} label="Mastered" />
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500 dark:text-gray-400 relative z-10">
        {stats.mastered}/{stats.total} cards mastered
      </p>
    </Link>
  );
}