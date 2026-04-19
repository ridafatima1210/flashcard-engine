import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// ✅ Safe JSON parser
function safeParseJSON(text: string) {
  try {
    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/[\u0000-\u001F]/g, '')
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

// ✅ Split large text
function splitText(text: string, chunkSize = 12000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

// ✅ Remove duplicate cards
function dedupeCards(cards: any[]) {
  const seen = new Set();
  return cards.filter(c => {
    const key = c.front.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY not configured' },
      { status: 500 }
    );
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const { text, filename } = await req.json();

    if (!text || text.length < 100) {
      return NextResponse.json(
        { error: 'Text too short' },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an expert educator.

Generate HIGH QUALITY flashcards.

Types of cards:
1. Definition cards
2. Concept understanding
3. Example-based questions
4. Cause-effect relationships

Rules:
- One concept per card
- Clear question (front)
- Concise answer (back)
- Avoid duplicates
- Cover full topic

STRICT:
Return ONLY valid JSON

FORMAT:
{
  "cards": [
    { "front": "...", "back": "...", "hint": "..." }
  ]
}
`;

    const chunks = splitText(text);

    // 🔥 Parallel processing (FAST)
    const responses = await Promise.all(
      chunks.map(async chunk => {
        try {
          const res = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              {
                role: 'user',
                content: `Create flashcards from:\n\n${chunk}`,
              },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.3,
            max_tokens: 2000,
          });

          return safeParseJSON(res.choices[0]?.message?.content || '');
        } catch {
          return null;
        }
      })
    );

    // 🔄 Combine
    let allCards = responses
      .filter(r => r?.cards)
      .flatMap(r => r.cards);

    // 🧹 Clean
    allCards = dedupeCards(allCards);

    const cards = allCards
      .filter(c => c.front && c.back)
      .map(c => ({
        front: String(c.front).slice(0, 300),
        back: String(c.back).slice(0, 600),
        ...(c.hint ? { hint: String(c.hint).slice(0, 150) } : {}),
      }))
      .slice(0, 50);

    if (cards.length === 0) {
      return NextResponse.json(
        { error: 'No valid cards generated' },
        { status: 502 }
      );
    }

    return NextResponse.json({ cards });

  } catch (err: any) {
    console.error(err);

    if (err?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit hit. Try again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}