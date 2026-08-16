import type { ShelfItem } from "./shelfTypes";

export const DEBUG_HOTSPOTS = false;

// Image: 1536x1024 (3:2 ratio)
// Coordinates: % of rendered container
//
// SHELF STRUCTURE (from pixel brightness analysis):
//   Top shelf books:    y = 4% – 41%
//   Shelf board 1:      y = 41% – 44%
//   Middle shelf books: y = 44% – 64%
//   Shelf board 2:      y = 64% – 68%
//   Bottom shelf books: y = 68% – 82%
//   Floor/base:         y = 82%+
//
// LEFT WALL: x = 0–7% (bright wall, no books)
// RIGHT SIDE: x = 55%+ (globe, decorative objects)

export const SHELF_ITEMS: ShelfItem[] = [

  // ══════════════════════════════════════════════
  // TOP SHELF  (y: 4 → 41)
  // ══════════════════════════════════════════════
  // From brightness analysis at y=20%:
  // x=7-11: dark book (brown spine)
  // x=11-17: medium book group
  // x=17-19: gap
  // x=19-25: wide bright book
  // x=25-29: book
  // x=29-34: book
  // x=34-38: book
  // x=38-43: book
  // x=43-48: book
  // x=48-55: book group

  {
    id: "topic-arabic",
    type: "topic-book",
    title: "Arabic",
    subtitle: "Til o'rganish",
    interaction: "open-topic",
    x: 7.0, y: 4, width: 4.0, height: 37,
  },
  {
    id: "topic-english",
    type: "topic-book",
    title: "English",
    subtitle: "Til o'rganish",
    interaction: "open-topic",
    x: 11.0, y: 4, width: 3.0, height: 37,
  },
  {
    id: "topic-ai",
    type: "topic-book",
    title: "AI",
    subtitle: "Sun'iy intellekt",
    interaction: "open-topic",
    x: 14.0, y: 4, width: 3.0, height: 37,
  },
  {
    id: "topic-design",
    type: "topic-book",
    title: "Design",
    subtitle: "Dizayn",
    interaction: "open-topic",
    x: 19.0, y: 4, width: 3.5, height: 37,
  },
  {
    id: "topic-business",
    type: "topic-book",
    title: "Business",
    subtitle: "Biznes",
    interaction: "open-topic",
    x: 22.5, y: 4, width: 3.5, height: 37,
  },
  {
    id: "topic-psychology",
    type: "topic-book",
    title: "Psychology",
    subtitle: "Psixologiya",
    interaction: "open-topic",
    x: 26.0, y: 4, width: 3.5, height: 37,
  },
  {
    id: "topic-selfdev",
    type: "topic-book",
    title: "Self Dev",
    subtitle: "Shaxsiy rivojlanish",
    interaction: "open-topic",
    x: 29.5, y: 4, width: 4.0, height: 37,
  },
  {
    id: "topic-tech",
    type: "topic-book",
    title: "Technology",
    subtitle: "Texnologiya",
    interaction: "open-topic",
    x: 33.5, y: 4, width: 4.0, height: 37,
  },
  {
    id: "topic-startups",
    type: "topic-book",
    title: "Startups",
    subtitle: "Startaplar",
    interaction: "open-topic",
    x: 37.5, y: 4, width: 4.0, height: 37,
  },
  {
    id: "book-atomic",
    type: "book",
    title: "Atomic Habits",
    author: "James Clear",
    interaction: "open-book",
    x: 41.5, y: 4, width: 3.5, height: 37,
  },
  {
    id: "book-deepwork",
    type: "book",
    title: "Deep Work",
    author: "Cal Newport",
    interaction: "open-book",
    x: 45.0, y: 4, width: 3.5, height: 37,
  },
  {
    id: "book-zerotone",
    type: "book",
    title: "Zero to One",
    author: "Peter Thiel",
    interaction: "open-book",
    x: 48.5, y: 4, width: 4.0, height: 37,
  },

  // ══════════════════════════════════════════════
  // MIDDLE SHELF  (y: 44 → 64)
  // ══════════════════════════════════════════════
  // From brightness analysis at y=55%:
  // x=1-8: book (bright)
  // x=8-11: gap
  // x=11-18: book
  // x=18-27: book group
  // x=27-37: dark area
  // x=40-47: book group
  // x=55+: right side

  {
    id: "book-sapiens",
    type: "book",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    interaction: "open-book",
    x: 1.0, y: 44, width: 4.5, height: 20,
  },
  {
    id: "book-leanstartup",
    type: "book",
    title: "The Lean Startup",
    author: "Eric Ries",
    interaction: "open-book",
    x: 5.5, y: 44, width: 3.5, height: 20,
  },
  {
    id: "book-rework",
    type: "book",
    title: "Rework",
    author: "Jason Fried",
    interaction: "open-book",
    x: 9.0, y: 44, width: 3.5, height: 20,
  },
  {
    id: "book-momtest",
    type: "book",
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    interaction: "open-book",
    x: 12.5, y: 44, width: 3.5, height: 20,
  },
  {
    id: "book-hooked",
    type: "book",
    title: "Hooked",
    author: "Nir Eyal",
    interaction: "open-book",
    x: 16.0, y: 44, width: 3.0, height: 20,
  },
  {
    id: "book-essentialism",
    type: "book",
    title: "Essentialism",
    author: "Greg McKeown",
    interaction: "open-book",
    x: 19.0, y: 44, width: 3.5, height: 20,
  },
  {
    id: "book-meditations",
    type: "book",
    title: "Meditations",
    author: "Marcus Aurelius",
    interaction: "open-book",
    x: 22.5, y: 44, width: 3.5, height: 20,
  },
  {
    id: "book-warart",
    type: "book",
    title: "The War of Art",
    author: "Steven Pressfield",
    interaction: "open-book",
    x: 26.0, y: 44, width: 3.5, height: 20,
  },
  {
    id: "notebook",
    type: "notebook",
    title: "Qaydlar",
    subtitle: "Fikrlar va g'oyalar",
    interaction: "open-notes",
    x: 40.0, y: 44, width: 5.0, height: 20,
  },
  {
    id: "book-influence",
    type: "book",
    title: "Influence",
    author: "Robert Cialdini",
    interaction: "open-book",
    x: 45.0, y: 44, width: 3.5, height: 20,
  },

  // ══════════════════════════════════════════════
  // BOTTOM SHELF  (y: 68 → 82)
  // ══════════════════════════════════════════════
  // From brightness analysis at y=75%:
  // x=2-8: bright (wall/frame)
  // x=14-22: book group
  // x=40-51: bright book group

  {
    id: "book-4hww",
    type: "book",
    title: "The 4-Hour Workweek",
    author: "Tim Ferriss",
    interaction: "open-book",
    x: 2.0, y: 68, width: 5.0, height: 14,
  },
  {
    id: "book-goodgreat",
    type: "book",
    title: "Good to Great",
    author: "Jim Collins",
    interaction: "open-book",
    x: 7.0, y: 68, width: 4.0, height: 14,
  },
  {
    id: "book-startwhy",
    type: "book",
    title: "Start with Why",
    author: "Simon Sinek",
    interaction: "open-book",
    x: 11.0, y: 68, width: 4.0, height: 14,
  },
  {
    id: "book-almanack",
    type: "book",
    title: "Almanack of Naval",
    author: "Naval Ravikant",
    interaction: "open-book",
    x: 15.0, y: 68, width: 4.0, height: 14,
  },
  {
    id: "book-sprint",
    type: "book",
    title: "Sprint",
    author: "Jake Knapp",
    interaction: "open-book",
    x: 40.0, y: 68, width: 4.0, height: 14,
  },
  {
    id: "book-steal",
    type: "book",
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    interaction: "open-book",
    x: 44.0, y: 68, width: 4.5, height: 14,
  },
  {
    id: "book-showwork",
    type: "book",
    title: "Show Your Work",
    author: "Austin Kleon",
    interaction: "open-book",
    x: 48.5, y: 68, width: 4.0, height: 14,
  },

  // ══════════════════════════════════════════════
  // RIGHT SIDE OBJECTS  (x: 55%+)
  // ══════════════════════════════════════════════
  // From right side analysis: objects at x=55-90%
  // y=10-30%: some object (globe likely)
  // y=50-65%: another object (camera?)
  // y=68-82%: bottom right objects

  {
    id: "globe",
    type: "globe",
    title: "Dunyo",
    subtitle: "Sayohat va madaniyatlar",
    interaction: "open-map",
    x: 57.0, y: 6, width: 10.0, height: 22,
  },
  {
    id: "camera",
    type: "camera",
    title: "Kontent",
    subtitle: "Suratlar va videolar",
    interaction: "open-content",
    x: 57.0, y: 44, width: 10.0, height: 20,
  },
  {
    id: "plant",
    type: "plant",
    title: "O'simlik",
    interaction: "easter-egg",
    x: 70.0, y: 44, width: 8.0, height: 20,
  },
];
