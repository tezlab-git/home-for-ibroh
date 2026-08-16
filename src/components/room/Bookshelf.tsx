import { useState, useCallback } from "react";
import { InteractiveShelfItem } from "./InteractiveShelfItem";
import { ShelfPanel } from "./ShelfPanel";
import { SHELF_ITEMS } from "./shelfData";
import type { ShelfItem } from "./shelfTypes";

type Selected = { item: ShelfItem; originRect: DOMRect } | null;

export function Bookshelf() {
  const [selected, setSelected] = useState<Selected>(null);

  const handleSelect = useCallback((item: ShelfItem, originRect: DOMRect) => {
    setSelected((prev) =>
      prev?.item.id === item.id ? null : { item, originRect },
    );
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div className="relative w-full">
      {/* Image + hotspot layer */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "1536 / 1024" }}
      >
        <img
          src="/bookshelf.png"
          alt="Kitob javoni"
          className="w-full h-full object-cover select-none"
          draggable={false}
        />

        {/* All shelf items */}
        {SHELF_ITEMS.map((item) => (
          <InteractiveShelfItem
            key={item.id}
            item={item}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Contextual panel */}
      {selected && (
        <ShelfPanel item={selected.item} onClose={handleClose} />
      )}
    </div>
  );
}
