import { useState, useRef, useCallback } from "react";
import type { ShelfItem } from "./shelfTypes";
import { getHoverTransform } from "./shelfTypes";
import { DEBUG_HOTSPOTS } from "./shelfData";

type State = "idle" | "hover" | "pressed";

type Props = {
  item: ShelfItem;
  onSelect: (item: ShelfItem, originRect: DOMRect) => void;
};

export function InteractiveShelfItem({ item, onSelect }: Props) {
  const [state, setState] = useState<State>("idle");
  const btnRef = useRef<HTMLButtonElement>(null);

  const enter = useCallback(() => setState("hover"), []);
  const leave = useCallback(() => setState("idle"), []);
  const down = useCallback(() => setState("pressed"), []);
  const up = useCallback(() => setState("hover"), []);

  const handleClick = useCallback(() => {
    if (!btnRef.current) return;
    onSelect(item, btnRef.current.getBoundingClientRect());
  }, [item, onSelect]);

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!btnRef.current) return;
        onSelect(item, btnRef.current.getBoundingClientRect());
      }
    },
    [item, onSelect],
  );

  const isActive = state !== "idle";
  const transform = getHoverTransform(item.type, state);

  const shadow =
    state === "hover"
      ? "0 8px 22px rgba(0,0,0,0.55)"
      : state === "pressed"
        ? "0 3px 10px rgba(0,0,0,0.4)"
        : "none";

  const brightness =
    state === "hover" ? 1.14 : state === "pressed" ? 1.06 : 1;

  // Debug: show red overlay
  const debugBg = DEBUG_HOTSPOTS
    ? item.type === "globe"
      ? "rgba(0,100,255,0.35)"
      : item.type === "topic-book"
        ? "rgba(255,150,0,0.3)"
        : item.type === "notebook"
          ? "rgba(0,200,100,0.3)"
          : item.type === "camera"
            ? "rgba(200,0,200,0.3)"
            : item.type === "plant"
              ? "rgba(0,200,0,0.3)"
              : "rgba(255,0,0,0.25)"
    : "transparent";

  return (
    <button
      ref={btnRef}
      aria-label={item.subtitle ? `${item.title} — ${item.subtitle}` : item.title}
      onClick={handleClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onMouseDown={down}
      onMouseUp={up}
      onFocus={enter}
      onBlur={leave}
      onKeyDown={handleKey}
      data-item-id={item.id}
      data-item-type={item.type}
      style={{
        position: "absolute",
        left: `${item.x}%`,
        top: `${item.y}%`,
        width: `${item.width}%`,
        height: `${item.height}%`,
        cursor: "pointer",
        background: debugBg,
        border: DEBUG_HOTSPOTS ? "1px solid rgba(255,255,255,0.4)" : "none",
        padding: 0,
        zIndex: isActive ? 10 : 1,
        outline: "none",
        transform,
        filter: `brightness(${brightness})`,
        boxShadow: shadow,
        transition:
          "transform 240ms cubic-bezier(0.34,1.4,0.64,1), filter 180ms ease, box-shadow 200ms ease",
        borderRadius: item.type === "globe" ? "50%" : "2px",
        // Focus ring
        ...(state === "hover" && !DEBUG_HOTSPOTS
          ? { outline: "none" }
          : {}),
      }}
    >
      {/* Hover label */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "calc(100% + 7px)",
          left: "50%",
          transform: `translateX(-50%) scale(${isActive ? 1 : 0.88})`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 160ms ease, transform 160ms ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          background: "rgba(8,5,2,0.88)",
          backdropFilter: "blur(10px)",
          color: "#f0ebe0",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.025em",
          padding: "4px 9px",
          borderRadius: "6px",
          lineHeight: 1.4,
          zIndex: 20,
          maxWidth: "160px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        {item.title}
        {item.subtitle && (
          <span style={{ opacity: 0.55, marginLeft: 4, fontSize: "10px" }}>
            {item.subtitle}
          </span>
        )}
      </span>

      {/* Debug label */}
      {DEBUG_HOTSPOTS && (
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: "2px",
            fontSize: "8px",
            color: "white",
            background: "rgba(0,0,0,0.6)",
            padding: "1px 3px",
            borderRadius: "3px",
            pointerEvents: "none",
            lineHeight: 1.2,
            maxWidth: "90%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {item.id}
        </span>
      )}
    </button>
  );
}
