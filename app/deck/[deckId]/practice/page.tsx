'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDeckById, getDeckStats, updateCard } from '@/lib/storage';
import { applyRating, buildQueue } from '@/lib/sm2';
import { Deck, Flashcard, Rating } from '@/lib/types';
import FlashCard from '@/components/FlashCard';
import RatingButtons from '@/components/RatingButtons';

function SessionComplete({
  reviewed,
  deck,
  onBack,
  onPracticeAgain,
}: {
  reviewed: number;
  deck: Deck;
  onBack: () => void;
  onPracticeAgain: () => void;
}) {
  const stats = getDeckStats(deck);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      <div className="text-6xl">🎉</div>
      <h2 className="text-2xl font-bold">Session complete!</h2>
      <p className="text-gray-500">
        You reviewed {reviewed} card{reviewed !== 1 ? 's' : ''}
      </p>

      <div className="flex gap-6 text-sm mt-2">
        <span className="text-green-600 font-medium">
          {stats.mastered} mastered
        </span>
        <span className="text-orange-500 font-medium">
          {stats.learning} learning
        </span>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          Back to Deck
        </button>
        <button
          onClick={onPracticeAgain}
          className="border border-indigo-300 text-indigo-600 px-6 py-3 rounded-xl"
        >
          Practice Again
        </button>
      </div>
    </div>
  );
}

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const deckId = params.deckId as string;

  const [deck, setDeck] = useState<Deck | null | undefined>(undefined);
  const [queue, setQueue] = useState<string[]>([]);
  const [originalLength, setOriginalLength] = useState(0);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [done, setDone] = useState(false);
  const [isRating, setIsRating] = useState(false);

  const deckRef = useRef<Deck | null>(null);

  // 🔄 Load deck
  function loadDeck() {
    const d = getDeckById(deckId);
    setDeck(d);
    deckRef.current = d;

    if (d) {
      const q = buildQueue(d.cards);
      setQueue(q);
      setOriginalLength(q.length);
      setIndex(0);
      setIsFlipped(false);
      setReviewed(0);
      setDone(false);
    }
  }

  useEffect(() => {
    loadDeck();
  }, [deckId]);

  // 🔥 Flip
  function handleFlip() {
    setIsFlipped(true);
  }

  // 🧠 Rating logic
  function handleRating(rating: Rating) {
    if (!deck || isRating) return;

    const currentCardId = queue[index];
    const card = deck.cards.find(c => c.id === currentCardId);
    if (!card) return;

    setIsRating(true);

    const updated = applyRating(card, rating);
    updateCard(deckId, updated);

    // update local state
    if (deckRef.current) {
      const idx = deckRef.current.cards.findIndex(c => c.id === updated.id);
      if (idx !== -1) {
        deckRef.current.cards[idx] = updated;
      }
    }

    // 🔥 Again → repeat card
    if (rating === 0) {
      setQueue(q => [...q, card.id]);
    }

    const nextIndex = index + 1;
    setReviewed(r => r + 1);

    if (nextIndex >= queue.length + (rating === 0 ? 1 : 0)) {
      setDone(true);
    } else {
      setIndex(nextIndex);
      setIsFlipped(false);
    }

    setIsRating(false);
  }

  if (deck === undefined) return null;

  if (!deck) {
    return <div className="p-10 text-center">Deck not found</div>;
  }

  if (done) {
    return (
      <SessionComplete
        reviewed={reviewed}
        deck={deckRef.current!}
        onBack={() => router.push(`/deck/${deckId}`)}
        onPracticeAgain={loadDeck}
      />
    );
  }

  const currentCard = deck.cards.find(c => c.id === queue[index]);

  const displayIndex = Math.min(index + 1, originalLength);
  const progress = (index / Math.max(queue.length, 1)) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <Link href={`/deck/${deckId}`} className="text-gray-400">
          ← Back
        </Link>
        <span className="text-sm text-gray-500">
          Card {displayIndex} / {originalLength}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 h-1.5 rounded mb-6">
        <div
          className="bg-indigo-500 h-1.5 rounded transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      {currentCard && (
        <>
          <FlashCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />

          {/* Controls */}
          <div className="mt-6">
            {!isFlipped ? (
              <button
                onClick={handleFlip}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl"
              >
                Show Answer
              </button>
            ) : (
              <RatingButtons
                onRate={handleRating}
                isLoading={isRating}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}