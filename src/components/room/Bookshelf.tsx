import { useState, useRef, useCallback } from "react";
import { InteractiveBook, type BookData } from "./InteractiveBook";

// ── Book data ─────────────────────────────────────────────────────────────────
// Coordinates are % of the image container (width × height = 1536×1024 aspect)
// Adjust x/y/width/height after visual inspection in browser.
// Image aspect ratio: 1536/1024 = 1.5 (3:2)
//
// Row layout (approximate, based on typical bookshelf image):
// Shelf 1 (top):    y≈8%,  h≈28%
// Shelf 2 (middle): y≈42%, h≈28%
// Shelf 3 (bottom): y≈72%, h≈22%

const BOOKS: BookData[] = [
  // ── Top shelf ──────────────────────────────────────────────────────────────
  {
    id: "b1",
    title: "Atomic Habits",
    author: "James Clear",
    x: 3.5, y: 6, width: 4.2, height: 30,
  },
  {
    id: "b2",
    title: "Deep Work",
    author: "Cal Newport",
    x: 7.8, y: 6, width: 3.8, height: 30,
  },
  {
    id: "b3",
    title: "The Lean Startup",
    author: "Eric Ries",
    x: 11.8, y: 6, width: 4.5, height: 30,
  },
  {
    id: "b4",
    title: "Zero to One",
    author: "Peter Thiel",
    x: 16.5, y: 6, width: 3.8, height: 30,
  },
  {
    id: "b5",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    x: 20.5, y: 6, width: 4.8, height: 30,
  },
  {
    id: "b6",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    x: 25.5, y: 6, width: 4.2, height: 30,
  },
  {
    id: "b7",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    x: 30.0, y: 6, width: 4.5, height: 30,
  },
  {
    id: "b8",
    title: "The Almanack of Naval",
    author: "Naval Ravikant",
    x: 34.8, y: 6, width: 4.0, height: 30,
  },
  {
    id: "b9",
    title: "Show Your Work",
    author: "Austin Kleon",
    x: 39.0, y: 6, width: 3.5, height: 30,
  },
  {
    id: "b10",
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    x: 42.8, y: 6, width: 5.0, height: 30,
  },

  // ── Middle shelf ───────────────────────────────────────────────────────────
  {
    id: "b11",
    title: "Rework",
    author: "Jason Fried",
    x: 3.5, y: 40, width: 3.8, height: 28,
  },
  {
    id: "b12",
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    x: 7.5, y: 40, width: 4.0, height: 28,
  },
  {
    id: "b13",
    title: "Hooked",
    author: "Nir Eyal",
    x: 11.7, y: 40, width: 3.8, height: 28,
  },
  {
    id: "b14",
    title: "Sprint",
    author: "Jake Knapp",
    x: 15.7, y: 40, width: 3.5, height: 28,
  },
  {
    id: "b15",
    title: "Good to Great",
    author: "Jim Collins",
    x: 19.4, y: 40, width: 4.2, height: 28,
  },
  {
    id: "b16",
    title: "The 4-Hour Workweek",
    author: "Tim Ferriss",
    x: 23.8, y: 40, width: 4.5, height: 28,
  },
  {
    id: "b17",
    title: "Essentialism",
    author: "Greg McKeown",
    x: 28.5, y: 40, width: 4.0, height: 28,
  },
  {
    id: "b18",
    title: "Start with Why",
    author: "Simon Sinek",
    x: 32.7, y: 40, width: 4.2, height: 28,
  },
  {
    id: "b19",
    title: "Meditations",
    author: "Marcus Aurelius",
    x: 37.1, y: 40, width: 3.8, height: 28,
  },
  {
    id: "b20",
    title: "The War of Art",
    author: "Steven Pressfield",
    x: 41.1, y: 40, width: 4.0, height: 28,
  },

  // ── Bottom shelf ───────────────────────────────────────────────────────────
  {
    id: "b21",
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    x: 3.5, y: 72, width: 4.0, height: 22,
  },
  {
    id: "b22",
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    x: 7.7, y: 72, width: 4.5, height: 22,
  },
  {
    id: "b23",
    title: "Influence",
    author: "Robert Cialdini",
    x: 12.4, y: 72, width: 3.8, height: 22,
  },
  {
    id: "b24",
    title: "Never Split the Difference",
    author: "Chris Voss",
    x: 16.4, y: 72, width: 4.5, height: 22,
  },
  {
    id: "b25",
    title: "The E-Myth Revisited",
    author: "Michael Gerber",
    x: 21.1, y: 72, width: 4.2, height: 22,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

type SelectedBook = { book: BookData; originRect: DOMRect } | null;

export function Bookshelf() {
  const [selected, setSelected] = useState<SelectedBook>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((book: BookData, originRect: DOMRect) => {
    setSelected((prev) =>
      prev?.book.id === book.id ? null : { book, originRect },
    );
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Image + hotspot layer */}
      <div className="relative w-full" style={{ aspectRatio: "1536/1024" }}>
        <img
          src="/bookshelf.png"
          alt="Kitob javoni"
          className="w-full h-full object-cover select-none"
          draggable={false}
        />

        {/* Book hotspots */}
        {BOOKS.map((book) => (
          <InteractiveBook
            key={book.id}
            book={book}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Selection panel */}
      {selected && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
            <div
              className="w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl"
              style={{ background: "rgba(18,12,5,0.95)", backdropFilter: "blur(16px)" }}
            >
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-white/30 hover:text-white/70 text-base leading-none transition-colors"
                aria-label="Yopish"
              >
                ✕
              </button>

              <p className="text-xs font-medium uppercase tracking-widest"
                style={{ color: "rgba(210,170,90,0.75)" }}>
                Kitob
              </p>
              <h2 className="mt-2 text-xl font-medium" style={{ color: "#f0ebe0" }}>
                {selected.book.title}
              </h2>
              <p className="mt-1 text-sm" style={{ color: "rgba(240,235,224,0.5)" }}>
                {selected.book.author}
              </p>
              <p className="mt-4 text-sm" style={{ color: "rgba(240,235,224,0.35)" }}>
                Tafsilotlar tez orada qo'shiladi.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
