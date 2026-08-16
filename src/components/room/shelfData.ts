import type { ShelfItem } from "./shelfTypes";

// ── DEBUG ─────────────────────────────────────────────────────────────────────
// Set to true to see red hotspot overlays for alignment
export const DEBUG_HOTSPOTS = true;

// ── Image dimensions: 1536 × 1024 (ratio 3:2) ────────────────────────────────
//
// Coordinate system: % of rendered container width/height
// x = left edge %, y = top edge %, width = %, height = %
//
// SHELF ROWS (approximate — adjust after visual check):
//   Top shelf:    y ≈ 5–35%
//   Middle shelf: y ≈ 40–68%
//   Bottom shelf: y ≈ 70–92%
//
// NOTE: These are PLACEHOLDER coordinates.
// After deploy, enable DEBUG_HOTSPOTS=true, open /room,
// screenshot the red boxes, and adjust x/y/width/height to match real objects.

export const SHELF_ITEMS: ShelfItem[] = [

  // ── TOP SHELF — left to right ─────────────────────────────────────────────

  {
    id: "topic-arabic",
    type: "topic-book",
    title: "Arabic",
    subtitle: "Til o'rganish",
    interaction: "open-topic",
    x: 2.5, y: 5, width: 4.0, height: 30,
  },
  {
    id: "topic-english",
    type: "topic-book",
    title: "English",
    subtitle: "Til o'rganish",
    interaction: "open-topic",
    x: 6.8, y: 5, width: 3.8, height: 30,
  },
  {
    id: "topic-ai",
    type: "topic-book",
    title: "AI",
    subtitle: "Sun'iy intellekt",
    interaction: "open-topic",
    x: 10.8, y: 5, width: 3.5, height: 30,
  },
  {
    id: "topic-design",
    type: "topic-book",
    title: "Design",
    subtitle: "Dizayn",
    interaction: "open-topic",
    x: 14.5, y: 5, width: 4.0, height: 30,
  },
  {
    id: "topic-business",
    type: "topic-book",
    title: "Business",
    subtitle: "Biznes",
    interaction: "open-topic",
    x: 18.7, y: 5, width: 4.2, height: 30,
  },
  {
    id: "topic-psychology",
    type: "topic-book",
    title: "Psychology",
    subtitle: "Psixologiya",
    interaction: "open-topic",
    x: 23.1, y: 5, width: 4.5, height: 30,
  },
  {
    id: "topic-selfdev",
    type: "topic-book",
    title: "Self Dev",
    subtitle: "Shaxsiy rivojlanish",
    interaction: "open-topic",
    x: 27.8, y: 5, width: 4.0, height: 30,
  },
  {
    id: "topic-tech",
    type: "topic-book",
    title: "Technology",
    subtitle: "Texnologiya",
    interaction: "open-topic",
    x: 32.0, y: 5, width: 4.2, height: 30,
  },
  {
    id: "topic-startups",
    type: "topic-book",
    title: "Startups",
    subtitle: "Startaplar",
    interaction: "open-topic",
    x: 36.4, y: 5, width: 4.0, height: 30,
  },
  {
    id: "book-atomic",
    type: "book",
    title: "Atomic Habits",
    author: "James Clear",
    interaction: "open-book",
    x: 40.6, y: 5, width: 4.2, height: 30,
  },
  {
    id: "book-deepwork",
    type: "book",
    title: "Deep Work",
    author: "Cal Newport",
    interaction: "open-book",
    x: 45.0, y: 5, width: 3.8, height: 30,
  },
  {
    id: "book-zerotone",
    type: "book",
    title: "Zero to One",
    author: "Peter Thiel",
    interaction: "open-book",
    x: 49.0, y: 5, width: 4.0, height: 30,
  },

  // ── GLOBE ─────────────────────────────────────────────────────────────────
  // Adjust these coordinates after visual check!
  {
    id: "globe",
    type: "globe",
    title: "Dunyo",
    subtitle: "Sayohat va madaniyatlar",
    interaction: "open-map",
    x: 55.0, y: 8, width: 8.0, height: 28,
  },

  // ── MIDDLE SHELF ──────────────────────────────────────────────────────────

  {
    id: "book-sapiens",
    type: "book",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    interaction: "open-book",
    x: 2.5, y: 40, width: 4.2, height: 26,
  },
  {
    id: "book-leanstartup",
    type: "book",
    title: "The Lean Startup",
    author: "Eric Ries",
    interaction: "open-book",
    x: 6.9, y: 40, width: 4.5, height: 26,
  },
  {
    id: "book-rework",
    type: "book",
    title: "Rework",
    author: "Jason Fried",
    interaction: "open-book",
    x: 11.6, y: 40, width: 3.8, height: 26,
  },
  {
    id: "book-momtest",
    type: "book",
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    interaction: "open-book",
    x: 15.6, y: 40, width: 4.0, height: 26,
  },
  {
    id: "book-hooked",
    type: "book",
    title: "Hooked",
    author: "Nir Eyal",
    interaction: "open-book",
    x: 19.8, y: 40, width: 3.8, height: 26,
  },
  {
    id: "book-essentialism",
    type: "book",
    title: "Essentialism",
    author: "Greg McKeown",
    interaction: "open-book",
    x: 23.8, y: 40, width: 4.2, height: 26,
  },
  {
    id: "book-meditations",
    type: "book",
    title: "Meditations",
    author: "Marcus Aurelius",
    interaction: "open-book",
    x: 28.2, y: 40, width: 3.8, height: 26,
  },
  {
    id: "book-warart",
    type: "book",
    title: "The War of Art",
    author: "Steven Pressfield",
    interaction: "open-book",
    x: 32.2, y: 40, width: 4.0, height: 26,
  },

  // ── NOTEBOOK (middle shelf) ───────────────────────────────────────────────
  {
    id: "notebook",
    type: "notebook",
    title: "Qaydlar",
    subtitle: "Fikrlar va g'oyalar",
    interaction: "open-notes",
    x: 38.0, y: 40, width: 5.5, height: 26,
  },

  // ── BOTTOM SHELF ──────────────────────────────────────────────────────────

  {
    id: "book-influence",
    type: "book",
    title: "Influence",
    author: "Robert Cialdini",
    interaction: "open-book",
    x: 2.5, y: 72, width: 3.8, height: 22,
  },
  {
    id: "book-4hww",
    type: "book",
    title: "The 4-Hour Workweek",
    author: "Tim Ferriss",
    interaction: "open-book",
    x: 6.5, y: 72, width: 4.5, height: 22,
  },
  {
    id: "book-goodgreat",
    type: "book",
    title: "Good to Great",
    author: "Jim Collins",
    interaction: "open-book",
    x: 11.2, y: 72, width: 4.2, height: 22,
  },
  {
    id: "book-startwhy",
    type: "book",
    title: "Start with Why",
    author: "Simon Sinek",
    interaction: "open-book",
    x: 15.6, y: 72, width: 4.2, height: 22,
  },
  {
    id: "book-almanack",
    type: "book",
    title: "Almanack of Naval",
    author: "Naval Ravikant",
    interaction: "open-book",
    x: 20.0, y: 72, width: 4.0, height: 22,
  },

  // ── CAMERA (bottom shelf or side) ─────────────────────────────────────────
  {
    id: "camera",
    type: "camera",
    title: "Kontent",
    subtitle: "Suratlar va videolar",
    interaction: "open-content",
    x: 70.0, y: 65, width: 9.0, height: 20,
  },

  // ── PLANT ─────────────────────────────────────────────────────────────────
  {
    id: "plant",
    type: "plant",
    title: "🌱",
    interaction: "easter-egg",
    x: 82.0, y: 55, width: 7.0, height: 25,
  },
];
