import { Deck, Flashcard } from './types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'fc_decks';

// 📦 Get all decks
export function getAllDecks(): Deck[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Deck[];
  } catch {
    return [];
  }
}

// 📦 Get one deck
export function getDeckById(deckId: string): Deck | null {
  return getAllDecks().find(d => d.id === deckId) ?? null;
}

// 💾 Save new deck
export function saveDeck(deck: Deck): Deck {
  const decks = getAllDecks();
  const updated = [deck, ...decks];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return deck;
}

// 🆕 Create deck from AI cards
export function createDeck(
  name: string,
  rawCards: Array<{ front: string; back: string; hint?: string }>
): Deck {
  const now = new Date().toISOString();

  const cards: Flashcard[] = rawCards.map(c => ({
    id: uuidv4(),
    front: c.front.slice(0, 300),
    back: c.back.slice(0, 600),
    hint: c.hint?.slice(0, 150),

    // 🧠 SM-2 defaults
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,

    // ⏰ Show immediately
    dueDate: now,
    lastReviewed: null,
  }));

  return {
    id: uuidv4(),
    name: name.replace(/\.pdf$/i, '').slice(0, 60),
    createdAt: now,
    cards,
  };
}

// 🔄 Update card after review
export function updateCard(deckId: string, updatedCard: Flashcard): void {
  const decks = getAllDecks();

  const deckIndex = decks.findIndex(d => d.id === deckId);
  if (deckIndex === -1) return;

  const cardIndex = decks[deckIndex].cards.findIndex(
    c => c.id === updatedCard.id
  );
  if (cardIndex === -1) return;

  decks[deckIndex].cards[cardIndex] = updatedCard;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

// ❌ Delete deck
export function deleteDeck(deckId: string): void {
  const decks = getAllDecks().filter(d => d.id !== deckId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

// 📅 Get due cards
export function getDueCards(deck: Deck): Flashcard[] {
  const now = new Date();
  return deck.cards.filter(c => new Date(c.dueDate) <= now);
}

// 🧠 MASTERED LOGIC (🔥 FIXED)
export function getMasteredCards(deck: Deck): Flashcard[] {
  return deck.cards.filter(c => c.repetitions >= 3);
}

// 📊 Deck stats (🔥 IMPROVED)
export function getDeckStats(deck: Deck) {
  const mastered = getMasteredCards(deck).length;

  const learning = deck.cards.filter(
    c => c.repetitions > 0 && c.repetitions < 3
  ).length;

  const newCount = deck.cards.filter(
    c => c.repetitions === 0
  ).length;

  const due = getDueCards(deck).length;

  return {
    total: deck.cards.length,
    due,
    mastered,
    learning,
    new: newCount,
  };
}