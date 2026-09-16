import { useState, useEffect } from "react";
import { Trophy, CheckCircle2, Circle, Sparkles, X } from "lucide-react";

export type QuestKey = "terminal" | "room" | "category" | "copy";

interface QuestTrackerProps {
  completedQuests: Set<QuestKey>;
}

const QUEST_LIST: Array<{ id: QuestKey; label: string; desc: string }> = [
  {
    id: "terminal",
    label: "CLI Master",
    desc: "Terminalda biror buyruq (matrix, skills, joke) ishlatildi",
  },
  {
    id: "room",
    label: "Fazoviy Sayohatchi",
    desc: "3D VR Xonaga (/room) tashrif buyurildi",
  },
  {
    id: "category",
    label: "Loyiha Tadqiqotchisi",
    desc: "Loyihalar toifasi boʻyicha filtrlandi",
  },
  {
    id: "copy",
    label: "Tezkor Dasturchi",
    desc: "Kod yoki email manzili nusxalandi",
  },
];

export function QuestTracker({ completedQuests }: QuestTrackerProps) {
  const [open, setOpen] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const completedCount = completedQuests.size;
  const isAllDone = completedCount === QUEST_LIST.length;

  useEffect(() => {
    if (isAllDone && !celebrated) {
      setCelebrated(true);
      setOpen(true);
    }
  }, [isAllDone, celebrated]);

  return (
    <>
      {/* Floating quest pill button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setOpen((o) => !o)}
          className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-xl shadow-xl transition-all duration-300 ${
            isAllDone
              ? "border-amber-500/50 bg-amber-500/20 text-amber-300 shadow-amber-500/20 animate-pulse"
              : "border-hairline/90 bg-card/85 text-foreground hover:border-accent/40 hover:bg-card"
          }`}
        >
          <Trophy
            className={`size-3.5 transition-transform duration-300 group-hover:scale-110 ${
              isAllDone ? "text-amber-400" : "text-accent"
            }`}
          />
          <span>Kashfiyotchi:</span>
          <span className="font-mono font-bold text-accent">
            {completedCount}/{QUEST_LIST.length}
          </span>
          {isAllDone && <Sparkles className="size-3 text-amber-400" />}
        </button>

        {/* Quest popover modal */}
        {open && (
          <div className="absolute bottom-12 right-0 w-80 rounded-3xl border border-hairline/90 bg-card/95 p-5 backdrop-blur-2xl shadow-2xl shadow-primary/10 transition-all">
            <div className="flex items-center justify-between border-b border-hairline/70 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Trophy className="size-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Sayt Kashfiyoti</h4>
                  <p className="text-[10px] text-muted-foreground">
                    Barcha 4 ta sirni oching!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div className="mt-3.5 space-y-2.5">
              {QUEST_LIST.map((q) => {
                const done = completedQuests.has(q.id);
                return (
                  <div
                    key={q.id}
                    className={`flex items-start gap-2.5 rounded-xl border p-2.5 transition-colors ${
                      done
                        ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-300"
                        : "border-hairline/60 bg-surface/40 text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                    ) : (
                      <Circle className="size-4 shrink-0 text-muted-foreground/40 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground">{q.label}</p>
                      <p className="text-[11px] leading-tight text-muted-foreground">
                        {q.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {isAllDone && (
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-center">
                <p className="text-xs font-bold text-amber-500 flex items-center justify-center gap-1">
                  <Sparkles className="size-3.5" />
                  TABRIKLAYMIZ! MASTER KASHFIYOTCHI!
                </p>
                <p className="mt-1 text-[11px] text-amber-600/90 dark:text-amber-300/80">
                  Saytning barcha interaktiv imkoniyatlarini muvaffaqiyatli kashf etdingiz.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
