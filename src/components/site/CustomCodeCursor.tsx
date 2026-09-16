import { useEffect, useState, useRef } from "react";

interface CodeParticle {
  id: number;
  x: number;
  y: number;
  char: string;
  vx: number;
  vy: number;
  opacity: number;
}

const CODE_CHARS = ["{ }", "</>", ";", "=>", "01", "const", "&&", "git"];

export function CustomCodeCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("<dev />");
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<CodeParticle[]>([]);

  const requestRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  // Only enable on devices with fine pointer (mouse/trackpad, not touchscreens)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-code-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      // Check if target or parent is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, [role='button'], input, textarea, select, .card-hover, [data-interactive]"
        );
        if (interactive) {
          setIsHovering(true);
          const tagName = interactive.tagName.toLowerCase();
          if (tagName === "a") setHoverLabel("<link />");
          else if (tagName === "button") setHoverLabel("<action />");
          else if (tagName === "input" || tagName === "textarea") setHoverLabel("<type />");
          else setHoverLabel("<code />");
        } else {
          setIsHovering(false);
          setHoverLabel("<dev />");
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Spawn 4 code particles
      const newParticles: CodeParticle[] = Array.from({ length: 4 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: e.clientX,
        y: e.clientY,
        char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.7) * 3,
        opacity: 1,
      }));
      setParticles((prev) => [...prev.slice(-12), ...newParticles]);
    };

    const onMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Smooth follower lerp loop
    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.22;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.22;
      setFollowerPos({ x: currentPos.current.x, y: currentPos.current.y });

      // Update particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.035,
          }))
          .filter((p) => p.opacity > 0)
      );

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.documentElement.classList.remove("custom-code-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 select-none">
      {/* 1. Precise Center Dot (The exact click hotspot) */}
      <div
        className="fixed size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.6 : 1})`,
        }}
      />

      {/* 2. Trailing Programming Badge / Reticle Follower */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          left: `${followerPos.x}px`,
          top: `${followerPos.y}px`,
        }}
      >
        {isHovering ? (
          /* Hovering over code / interactive element */
          <div className="flex items-center gap-1 rounded-full border border-cyan-400/60 bg-black/80 px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-md animate-pulse">
            <span className="text-amber-400">&lt;</span>
            <span>{hoverLabel.replace(/[<>]/g, "")}</span>
            <span className="text-amber-400">/&gt;</span>
          </div>
        ) : (
          /* Default wandering cursor */
          <div className="relative flex size-8 items-center justify-center">
            {/* Outer bracket corners */}
            <span className="absolute -top-1 -left-1 font-mono text-[9px] font-bold text-cyan-500/70">
              [
            </span>
            <span className="absolute -bottom-1 -right-1 font-mono text-[9px] font-bold text-cyan-500/70">
              ]
            </span>
            {/* Subtle rotating circle */}
            <div className="size-6 rounded-full border border-cyan-500/30 border-dashed animate-spin [animation-duration:8s]" />
          </div>
        )}
      </div>

      {/* 3. Floating Code Click Particles (;</> 01 =>) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed font-mono text-xs font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) scale(${0.8 + (1 - p.opacity) * 0.4})`,
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
}
