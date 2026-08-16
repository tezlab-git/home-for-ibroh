import { useState, useRef, useCallback } from "react";
import type { ShelfItem } from "./shelfTypes";
import { getHoverTransform } from "./shelfTypes";

type State = "idle" | "hover" | "pressed";

type Props = {
  item: ShelfItem;
  onSelect: (item: ShelfItem, originRect: DOMRect) => void;
  isSelected?: boolean;
};

export function InteractiveShelfItem({ item, onSelect, isSelected }: Props) {
  const [state, setState] = useState<State>("idle");
  const btnRef = useRef<HTMLButtonElement>(null);

  const enter = useCallback(() => setState("hover"), []);
  const leave = useCallback(() => setState(isSelected ? "hover" : "idle"), [isSelected]);
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

  const effectiveState = isSelected ? "hover" : state;
  const isActive = effectiveState !== "idle";
  const transform = getHoverTransform(item.type, effectiveState);

  const shadow =
    effectiveState === "hover"
      ? "0 6px 18px rgba(0,0,0,0.5)"
      : effectiveState === "pressed"
        ? "0 2px 8px rgba(0,0,0,0.4)"
        : "none";

  const brightness =
    effectiveState === "hover" ? 1.14
    : effectiveState === "pressed" ? 1.06
    : 1;

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
      onBlur={() => setState("idle")}
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
        background: "transparent",
        border: "none",
        padding: 0,
        zIndex: isActive ? 10 : 1,
        outline: "none",
        transform,
        filter: `brightness(${brightness})`,
        boxShadow: shadow,
        transition:
          "transform 240ms cubic-bezier(0.34,1.4,0.64,1), filter 180ms ease, box-shadow 200ms ease",
        borderRadius: item.type === "globe" ? "50%" : "2px",
      }}
    >
      {/* Hover label — only show when active */}
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
          background: "rgba(8,5,2,0.9)",
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
          <span style={{ opacity: 0.5, marginLeft: 5, fontSize: "10px" }}>
            {item.subtitle}
          </span>
        )}
      </span>
    </button>
  );
}
