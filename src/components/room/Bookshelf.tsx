import { useState, useCallback } from "react";
import { InteractiveShelfItem } from "./InteractiveShelfItem";
import { ShelfPanel } from "./ShelfPanel";
import { BookFlyout } from "./BookFlyout";
import { SHELF_ITEMS } from "./shelfData";
import type { ShelfItem } from "./shelfTypes";

type Selected = { item: ShelfItem; originRect: DOMRect } | null;

export function Bookshelf() {
  const [selected, setSelected] = useState<Selected>(null);

  const handleSelect = useCallback((item: ShelfItem, originRect: DOMRect) => {
    setSelected(prev =>
      prev?.item.id === item.id ? null : { item, originRect }
    );
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  const isBookType = selected &&
    (selected.item.type === "book" || selected.item.type === "topic-book");

  return (
    <div className="relative w-full">
      {/* Image + hotspot layer */}
      <div className="relative w-full" style={{ aspectRatio: "1536 / 1024" }}>
        <img
          src="/bookshelf.png"
          alt="Kitob javoni"
          className="w-full h-full object-cover select-none"
          draggable={false}
        />

        {SHELF_ITEMS.map(item => (
          <InteractiveShelfItem
            key={item.id}
            item={item}
            onSelect={handleSelect}
            isSelected={selected?.item.id === item.id}
          />
        ))}
      </div>

      {/* Book / topic-book: fly-out animation */}
      {selected && isBookType && (
        <BookFlyout
          item={selected.item}
          originRect={selected.originRect}
          onClose={handleClose}
        />
      )}

      {/* Other objects: slide-up panel */}
      {selected && !isBookType && (
        <ShelfPanel
          item={selected.item}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
