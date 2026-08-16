import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/room")({
  head: () => ({
    meta: [
      { title: "Xona — ibroh.im" },
      { name: "description", content: "Ibrohimning virtual xonasi." },
    ],
  }),
  component: RoomPage,
});

type Panel = "bookshelf" | null;

function RoomPage() {
  const [panel, setPanel] = useState<Panel>(null);

  return (
    <div className="relative min-h-screen bg-[#1a1208] overflow-hidden">
      {/* Xona */}
      <div className="relative mx-auto max-w-4xl px-4 py-12 select-none">

        {/* Bookshelf */}
        <button
          onClick={() => setPanel(panel === "bookshelf" ? null : "bookshelf")}
          className="group relative block w-full cursor-pointer outline-none"
          aria-label="Kitob javoni"
        >
          <img
            src="/bookshelf.png"
            alt="Kitob javoni"
            className="w-full transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_24px_rgba(255,200,100,0.3)]"
            draggable={false}
          />
          {/* Hover label */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
            Kitob javoni
          </span>
        </button>

        {/* Ko'proq narsalar keyinroq qo'shiladi */}
      </div>

      {/* Panel — bookshelf bosilganda */}
      {panel === "bookshelf" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center px-4 pb-4 sm:pb-0">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPanel(null)}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-[#1c1409] border border-white/10 p-6 shadow-2xl">
            <button
              onClick={() => setPanel(null)}
              className="absolute right-4 top-4 text-white/40 hover:text-white/80 text-lg leading-none"
            >
              ✕
            </button>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-400/70">
              Kitob javoni
            </p>
            <h2 className="mt-2 text-xl font-medium text-white">
              O'qigan va o'qiyotgan kitoblar
            </h2>
            <p className="mt-3 text-sm text-white/50">
              Bu bo'lim tez orada to'ldiriladi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
