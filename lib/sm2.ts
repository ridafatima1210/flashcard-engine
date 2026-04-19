import { Flashcard, Rating } from './types';

/**
 * Apply SM-2 spaced repetition algorithm
 */
export function applyRating(card: Flashcard, rating: Rating): Flashcard {
  let { easeFactor, interval, repetitions } = card;

  if (rating < 2) {
    // ❌ Again / Hard → reset learning
    repetitions = 0;
    interval = 1;
  } else {
    // ✅ Correct answer

    // Interval logic (SM-2)
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }

    // 🔥 IMPROVED REPETITION LOGIC
    if (rating === 3) {
      // Easy → faster mastery
      repetitions += 2;
    } else {
      // Good
      repetitions += 1;
    }

    // Update ease factor (SM-2 formula)
    easeFactor =
      easeFactor +
      0.1 -
      (3 - rating) * (0.08 + (3 - rating) * 0.02);

    easeFactor = Math.max(1.3, easeFactor);
  }

  // 📅 Next review date
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);

  return {
    ...card,
    easeFactor: parseFloat(easeFactor.toFixed(4)),
    interval,
    repetitions,
    dueDate: dueDate.toISOString(),
    lastReviewed: new Date().toISOString(),
  };
}

/**
 * Build practice queue
 *
 * Rules:
 * 1. Due cards first (sorted by due date)
 * 2. New cards next (limit 20 per session)
 * 3. "Again" cards will be re-added dynamically in session
 */
export function buildQueue(cards: Flashcard[]): string[] {
  const now = new Date();

  // ⏰ Due cards
  const due = cards
    .filter(c => new Date(c.dueDate) <= now && c.repetitions > 0)
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
    );

  // 🆕 New cards
  const newCards = cards
    .filter(c => c.repetitions === 0)
    .slice(0, 20);

  let queue = [...due, ...newCards];

  // 🔥 CRITICAL FIX: fallback if empty
  if (queue.length === 0) {
    queue = cards
      .sort(
        (a, b) =>
          new Date(a.lastReviewed || 0).getTime() -
          new Date(b.lastReviewed || 0).getTime()
      )
      .slice(0, 10);
  }

  return queue.map(c => c.id);
}