import { useEffect, useState, useRef } from "react";
import type { ShelfItem } from "./shelfTypes";

type Phase = "idle" | "flying" | "open" | "returning";

type Props = {
  item: ShelfItem;
  originRect: DOMRect;
  onClose: () => void;
};

export function BookFlyout({ item, originRect, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start fly animation after mount
    const t1 = setTimeout(() => setPhase("flying"), 20);
    const t2 = setTimeout(() => setPhase("open"), 580);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  function handleClose() {
    setPhase("returning");
    setTimeout(() => onClose(), 500);
  }

  // Origin position (relative to viewport)
  const ox = originRect.left + originRect.width / 2;
  const oy = originRect.top + originRect.height / 2;

  // Target: center of viewport
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tx = vw / 2;
  const ty = vh / 2;

  // Flying book styles
  const bookStyle: React.CSSProperties = (() => {
    if (phase === "idle") {
      return {
        position: "fixed",
        left: ox,
        top: oy,
        width: originRect.width,
        height: originRect.height,
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 1,
        transition: "none",
        zIndex: 60,
        borderRadius: 4,
        background: getBookColor(item),
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      };
    }
    if (phase === "flying") {
      return {
        position: "fixed",
        left: tx,
        top: ty,
        width: Math.max(originRect.width * 3, 200),
        height: Math.max(originRect.height * 2.5, 280),
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 1,
        transition: "all 560ms cubic-bezier(0.34,1.2,0.64,1)",
        zIndex: 60,
        borderRadius: 8,
        background: getBookColor(item),
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      };
    }
    if (phase === "returning") {
      return {
        position: "fixed",
        left: ox,
        top: oy,
        width: originRect.width,
        height: originRect.height,
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 0,
        transition: "all 480ms cubic-bezier(0.4,0,0.6,1)",
        zIndex: 60,
        borderRadius: 4,
        background: getBookColor(item),
        boxShadow: "none",
      };
    }
    // open
    return {
      position: "fixed",
      left: tx,
      top: ty,
      width: Math.min(vw * 0.9, 480),
      height: "auto",
      minHeight: 320,
      transform: "translate(-50%, -50%)",
      opacity: 1,
      transition: "all 300ms ease",
      zIndex: 60,
      borderRadius: 12,
      background: "#1a1208",
      boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
    };
  })();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 55,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          opacity: phase === "idle" || phase === "returning" ? 0 : 1,
          transition: "opacity 400ms ease",
        }}
      />

      {/* Flying / open book */}
      <div ref={overlayRef} style={bookStyle}>
        {phase === "open" && (
          <BookContent item={item} onClose={handleClose} />
        )}
      </div>
    </>
  );
}

function getBookColor(item: ShelfItem): string {
  const colors: Record<string, string> = {
    "topic-arabic": "#8B4513",
    "topic-english": "#2F4F8F",
    "topic-ai": "#1a3a2a",
    "topic-design": "#4a1a4a",
    "topic-business": "#3a2a1a",
    "topic-psychology": "#1a2a4a",
    "topic-selfdev": "#2a3a1a",
    "topic-tech": "#1a1a3a",
    "topic-startups": "#3a1a1a",
  };
  return colors[item.id] ?? "#2a1f14";
}

function BookContent({ item, onClose }: { item: ShelfItem; onClose: () => void }) {
  const labelColor = "rgba(210,170,90,0.8)";
  const titleColor = "#f0ebe0";
  const subtitleColor = "rgba(240,235,224,0.5)";
  const bodyColor = "rgba(240,235,224,0.32)";

  const topicDescriptions: Record<string, string> = {
    "topic-arabic": "Arab tili — dunyodagi eng qadimiy va keng tarqalgan tillardan biri. O'rganish jarayonida.",
    "topic-english": "Ingliz tili — global kommunikatsiya tili. Doimiy ravishda takomillashtiraman.",
    "topic-ai": "Sun'iy intellekt — kelajakning texnologiyasi. LLM, ML va AI mahsulotlari.",
    "topic-design": "Dizayn — UI/UX, vizual kommunikatsiya va estetika.",
    "topic-business": "Biznes — startaplar, mahsulot yaratish va tadbirkorlik.",
    "topic-psychology": "Psixologiya — inson xulq-atvori, motivatsiya va qaror qabul qilish.",
    "topic-selfdev": "Shaxsiy rivojlanish — odatlar, produktivlik va o'sish.",
    "topic-tech": "Texnologiya — dasturlash, arxitektura va yangi vositalar.",
    "topic-startups": "Startaplar — g'oyadan mahsulotga, mahsulotdan biznesga.",
  };

  return (
    <div style={{ padding: 28, position: "relative" }}>
      <button
        onClick={onClose}
        aria-label="Yopish"
        style={{
          position: "absolute", right: 16, top: 16,
          background: "none", border: "none",
          color: "rgba(240,235,224,0.3)", cursor: "pointer",
          fontSize: 16, lineHeight: 1, padding: 4,
          transition: "color 150ms",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,235,224,0.8)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,235,224,0.3)")}
      >
        ✕
      </button>

      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: labelColor }}>
        {item.type === "topic-book" ? item.subtitle ?? "Mavzu" : "Kitob"}
      </p>
      <h2 style={{ marginTop: 8, fontSize: 22, fontWeight: 600, color: titleColor, lineHeight: 1.2 }}>
        {item.title}
      </h2>
      {item.author && (
        <p style={{ marginTop: 4, fontSize: 13, color: subtitleColor }}>
          {item.author}
        </p>
      )}
      {item.type === "topic-book" && topicDescriptions[item.id] && (
        <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.7, color: subtitleColor }}>
          {topicDescriptions[item.id]}
        </p>
      )}
      <p style={{ marginTop: 20, fontSize: 12, color: bodyColor }}>
        Tafsilotlar tez orada qo'shiladi.
      </p>
    </div>
  );
}
