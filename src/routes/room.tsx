import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { Bookshelf } from "@/components/room/Bookshelf";
import { VrOverlay } from "@/components/room/VrOverlay";

export const Route = createFileRoute("/room")({
  head: () => ({
    meta: [
      { title: "3D VR Xona — ibroh.im" },
      { name: "description", content: "Ibrohimning virtual 3D xonasi va VR koʻzoynak tajribasi." },
    ],
  }),
  component: RoomPage,
});

function RoomPage() {
  const [vrEnabled, setVrEnabled] = useState(true);
  const [angles, setAngles] = useState({ yaw: 0, pitch: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking to calculate 3D head rotation
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (!vrEnabled) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Normalized coordinates from -1 to 1
      const nx = (e.clientX - w / 2) / (w / 2);
      const ny = (e.clientY - h / 2) / (h / 2);

      // Max head rotation: yaw +/- 14 degrees, pitch +/- 9 degrees
      const maxYaw = 14;
      const maxPitch = 9;

      setAngles({
        yaw: nx * maxYaw,
        pitch: -ny * maxPitch,
      });
    },
    [vrEnabled]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at center, #1a1208 0%, #0e0a04 60%, #030201 100%)",
      }}
    >
      {/* 3D Depth Background Grid (Parallax shifted opposite to head movement) */}
      {vrEnabled && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-25 transition-transform duration-100 ease-out"
          style={{
            backgroundImage:
              "radial-gradient(rgba(6, 182, 212, 0.25) 1.5px, transparent 1.5px), radial-gradient(rgba(217, 119, 6, 0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px, 20px 20px",
            backgroundPosition: "0 0, 20px 20px",
            transform: `translate3d(${-angles.yaw * 3}px, ${angles.pitch * 3}px, -200px) scale(1.1)`,
          }}
        />
      )}

      {/* Floating 3D Bookshelf stage */}
      <div
        className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="w-full max-w-5xl transition-transform duration-150 ease-out"
          style={{
            transform: vrEnabled
              ? `rotateY(${angles.yaw}deg) rotateX(${angles.pitch}deg) translateZ(25px)`
              : "none",
            transformStyle: "preserve-3d",
          }}
        >
          <Bookshelf />
        </div>
      </div>

      {/* VR Headset HUD, Dual-Lens Vignette & Reticle */}
      <VrOverlay
        yaw={angles.yaw}
        pitch={angles.pitch}
        vrEnabled={vrEnabled}
        onToggleVr={() => setVrEnabled((v) => !v)}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
      />
    </div>
  );
}
