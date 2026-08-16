// ── Item Types ────────────────────────────────────────────────────────────────

export type ItemType =
  | "book"
  | "topic-book"
  | "globe"
  | "camera"
  | "notebook"
  | "photo"
  | "plant"
  | "box"
  | "achievement"
  | "decorative";

export type InteractionType =
  | "open-book"
  | "open-topic"
  | "open-map"
  | "open-content"
  | "open-notes"
  | "open-gallery"
  | "open-achievement"
  | "easter-egg"
  | "none";

export type ShelfItem = {
  id: string;
  type: ItemType;
  title: string;
  subtitle?: string;
  interaction: InteractionType;
  // % coordinates relative to image container
  x: number;
  y: number;
  width: number;
  height: number;
  // book-specific
  author?: string;
  // topic-specific
  topicColor?: string;
  // future: content payload
  content?: Record<string, unknown>;
};

// ── Hover transform per type ──────────────────────────────────────────────────

export function getHoverTransform(type: ItemType, state: "idle" | "hover" | "pressed"): string {
  if (state === "idle") return "translateY(0px) scale(1) rotate(0deg)";
  if (state === "pressed") {
    return "translateY(-1px) scale(1.01) rotate(0deg)";
  }
  switch (type) {
    case "globe":
      return "translateY(-5px) scale(1.04) rotate(3deg)";
    case "photo":
      return "translateY(-4px) scale(1.03) rotate(-1.5deg)";
    case "plant":
      return "translateY(-3px) scale(1.03) rotate(2deg)";
    case "camera":
      return "translateY(-4px) scale(1.03) rotate(0deg)";
    default:
      // books, notebooks, boxes
      return "translateY(-4px) scale(1.03) rotate(0deg)";
  }
}

// ── Panel content per type ────────────────────────────────────────────────────

export function getPanelLabel(item: ShelfItem): string {
  switch (item.type) {
    case "globe": return "Dunyoni kashf etish";
    case "camera": return "Kontent va suratlar";
    case "notebook": return "Fikrlar va g'oyalar";
    case "photo": return "Xotiralar";
    case "plant": return "🌱";
    case "achievement": return "Yutuqlar";
    case "topic-book": return item.subtitle ?? item.title;
    default: return item.title;
  }
}
