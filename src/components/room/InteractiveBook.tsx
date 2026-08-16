import { useState, useRef, useCallback } from "react";

export type BookData = {
  id: string;
  title: string;
  author: string;
  // % coordinates relative to image container (0–100)
  x: number;
  y: number;
  width: number;
  height: number;
  coverColor?: string;
};

type BookState = "idle" | "hover" | "pressed";

type Props = {
  book: BookData;
  onSelect: (book: BookData, originRect: DOMRect) => void;
};

export function InteractiveBook({ book, onSelect }: Props) {
  const [state, setState] = useState<BookState>("idle");
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = useCallback(() => setState("hover"), []);
  const handleMouseLeave = useCallback(() => setState("idle"), []);
  const handleMouseDown = useCallback(() => setState("pressed"), []);
  const handleMouseUp = useCallback(() => setState("hover"), []);
  const handleFocus = useCallback(() => setState("hover"), []);
  const handleBlur = useCallback(() => setState("idle"), []);

  const handleClick = useCallback(() => {
    if (!btnRef.current) return;
    onSelect(book, btnRef.current.getBoundingClientRect());
  }, [book, onSelect]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!btnRef.current) return;
        onSelect(book, btnRef.current.getBoundingClientRect());
      }
    },
    [book, onSelect],
  );

  const isActive = state !== "idle";

  const transform =
    state === "hover"
      ? "translateY(-4px) scale(1.03)"
      : state === "pressed"
        ? "translateY(-1px) scale(1.01)"
        : "translateY(0px) scale(1)";

  return (
    <button
      ref={btnRef}
      aria-label={`${book.title} — ${book.author}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-book-id={book.id}
      style={{
        position: "absolute",
        left: `${book.x}%`,
        top: `${book.y}%`,
        width: `${book.width}%`,
        height: `${book.height}%`,
        cursor: "pointer",
        background: "transparent",
        border: "none",
        padding: 0,
        zIndex: isActive ? 10 : 1,
        outline: "none",
        transform,
        filter: `brightness(${state === "hover" ? 1.15 : state === "pressed" ? 1.07 : 1})`,
        boxShadow: state === "hover"
          ? "0 8px 20px rgba(0,0,0,0.5)"
          : state === "pressed"
            ? "0 3px 10px rgba(0,0,0,0.4)"
            : "none",
        transition:
          "transform 240ms cubic-bezier(0.34,1.4,0.64,1), filter 180ms ease, box-shadow 200ms ease",
        borderRadius: "2px",
      }}
    >
      {/* Hover label */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "calc(100% + 6px)",
          left: "50%",
          transform: `translateX(-50%) scale(${isActive ? 1 : 0.88})`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 160ms ease, transform 160ms ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          background: "rgba(8,6,3,0.85)",
          backdropFilter: "blur(8px)",
          color: "#f0ebe0",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.025em",
          padding: "4px 9px",
          borderRadius: "6px",
          lineHeight: 1.4,
          zIndex: 20,
          maxWidth: "150px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {book.title}
      </span>
    </button>
  );
}
