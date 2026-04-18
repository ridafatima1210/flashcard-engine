# 🚀 Flashcard Engine

✨ **Live Demo:** https://flashcard-engine-gules.vercel.app/

---

## 🧠 Overview

Flashcard Engine is an AI-powered learning platform that converts PDFs into smart flashcards using spaced repetition and active recall.

It helps students move from passive reading to active learning — improving long-term retention and understanding.

---

## ✨ Features

### 📄 Smart PDF Upload
- Drag & drop PDF upload
- File validation (PDF only, max 20MB)
- Upload preview with loading animation

### 🧠 Intelligent Flashcards
- Generates structured flashcards:
  - 📘 Definition-based
  - 🧩 Concept-based
  - 🧮 Example-based
- Includes hints for better recall

### 🔁 Spaced Repetition (SM-2)
- Again / Hard / Good / Easy ratings
- Adaptive review scheduling
- Cards you struggle with appear more often

### 📊 Dashboard
- View all decks
- Track mastered cards
- Due cards indicator
- Smooth animations with Framer Motion

### 🔥 Today’s Practice
- Shows cards due for review
- Quick access to practice session
- Encourages consistent learning

### 🎨 Premium UI/UX
- Glassmorphism design
- Gradient UI elements
- Smooth micro-interactions
- Responsive layout

### 🌙 Dark Mode
- Default dark theme
- Theme toggle support
- Fully styled experience

---

## 🛠 Tech Stack

| Technology | Usage |
|----------|------|
| **Next.js** | App framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Next-Themes** | Dark mode |
| **SM-2 Algorithm** | Spaced repetition logic |
| **Vercel** | Deployment |

---

## 🚀 Live Demo

👉 https://flashcard-engine-gules.vercel.app/

---

## ⚙️ Run Locally

Clone the project:

```bash
git clone https://github.com/YOUR_USERNAME/flashcard-engine.git
cd flashcard-engine
```

Install Dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

App runs on:
👉 http://localhost:3000

---

## 📂 Project Structure

```bash
flashcard-engine/
│
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Dashboard
│   ├── upload/         # Upload flow
│   ├── deck/           # Deck & practice pages
│
├── components/         # UI components
│   ├── DeckCard.tsx
│   ├── UploadZone.tsx
│   ├── FlashCard.tsx
│   ├── RatingButtons.tsx
│   ├── StatsPanel.tsx
│   ├── Sidebar.tsx
│   └── ThemeToggle.tsx
│
├── lib/                # Core logic
│   ├── storage.ts      # Local storage handling
│   ├── sm2.ts          # Spaced repetition algorithm
│   ├── types.ts        # Types
│
├── public/             # Static assets
│
├── globals.css         # Global styles
└── README.md
```

---

## 🧠 How It Works

- 📄 Upload a PDF  
- ⚡ Generate flashcards  
- 🧠 Practice with spaced repetition  
- 📈 Track progress over time  

---

## 🔥 Future Improvements

- 📄 Real PDF preview (react-pdf)  
- 🔍 Search & filter decks  
- 📊 Advanced analytics dashboard  
- 🔔 Study reminders  
- 🤖 AI summarization & quiz generation  
- 📱 Improved mobile UX  

---



