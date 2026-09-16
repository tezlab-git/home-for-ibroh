import { useEffect, useState } from "react";
import {
  Volume2,
  VolumeX,
  Eye,
  RefreshCw,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { vrAudio } from "./vrAudio";

interface VrOverlayProps {
  yaw: number;
  pitch: number;
  vrEnabled: boolean;
  onToggleVr: () => void;
  mouseX: number;
  mouseY: number;
}

export function VrOverlay({
  yaw,
  pitch,
  vrEnabled,
  onToggleVr,
  mouseX,
  mouseY,
}: VrOverlayProps) {
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [muted, setMuted] = useState(vrAudio.isMuted);

  // Boot sequence on mount
  useEffect(() => {
    vrAudio.playBootSound();

    const t1 = setTimeout(() => setBootStep(1), 600);
    const t2 = setTimeout(() => setBootStep(2), 1200);
    const t3 = setTimeout(() => setBootStep(3), 1800);
    const tEnd = setTimeout(() => setBooting(false), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, []);

  const handleToggleMute = () => {
    const isNowMuted = vrAudio.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) vrAudio.playClickSound();
  };

  const handleReboot = () => {
    setBooting(true);
    setBootStep(0);
    vrAudio.playBootSound();
    setTimeout(() => setBootStep(1), 600);
    setTimeout(() => setBootStep(2), 1200);
    setTimeout(() => setBootStep(3), 1800);
    setTimeout(() => setBooting(false), 2400);
  };

  return (
    <>
      {/* 1. VR Headset Boot Sequence ("Putting on headset") */}
      {booting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700">
          {/* Dual Lens Opening Mask Animation */}
          <div className="relative flex items-center justify-center gap-8 w-full max-w-4xl px-6">
            {/* Left Eye Lens Frame */}
            <div className="relative flex size-64 sm:size-80 items-center justify-center rounded-[48%] border-4 border-cyan-500/40 bg-black/90 shadow-[0_0_80px_rgba(6,182,212,0.25)] transition-all duration-700 animate-pulse">
              <div className="absolute inset-2 rounded-[48%] border border-cyan-500/20" />
              <div className="font-mono text-xs text-cyan-400/90 text-center space-y-1.5">
                <p className="text-sm font-bold tracking-widest uppercase text-cyan-300">
                  LEFT EYE
                </p>
                <p>OPTIC SENSOR: ONLINE</p>
                <p className="text-[10px] text-cyan-500/70">120Hz · 4K HDR</p>
              </div>
            </div>

            {/* Right Eye Lens Frame */}
            <div className="relative flex size-64 sm:size-80 items-center justify-center rounded-[48%] border-4 border-cyan-500/40 bg-black/90 shadow-[0_0_80px_rgba(6,182,212,0.25)] transition-all duration-700 animate-pulse">
              <div className="absolute inset-2 rounded-[48%] border border-cyan-500/20" />
              <div className="font-mono text-xs text-cyan-400/90 text-center space-y-1.5">
                <p className="text-sm font-bold tracking-widest uppercase text-cyan-300">
                  RIGHT EYE
                </p>
                <p>SPATIAL TRACKING: SYNC</p>
                <p className="text-[10px] text-cyan-500/70">FOV: 110° · DEPTH: ACTIVE</p>
              </div>
            </div>
          </div>

          {/* Boot telemetry status text */}
          <div className="mt-10 font-mono text-center space-y-2">
            <p className="text-base font-semibold tracking-wider text-cyan-400 flex items-center justify-center gap-2">
              <Zap className="size-4 animate-bounce text-cyan-400" />
              VR KOʻZOYNAK FAOLLASHTIRILMOQDA...
            </p>
            <div className="text-xs text-cyan-300/70 space-y-1">
              <p className={bootStep >= 1 ? "opacity-100 text-cyan-200" : "opacity-30"}>
                [1/3] Fazoviy koordinatalar va 3D giroskop yuklandi
              </p>
              <p className={bootStep >= 2 ? "opacity-100 text-cyan-200" : "opacity-30"}>
                [2/3] Ikki koʻz stereo linzalari sinxronizatsiya qilindi
              </p>
              <p className={bootStep >= 3 ? "opacity-100 text-emerald-400 font-bold" : "opacity-30"}>
                [3/3] Virtual xona fazosi tayyor · Vision Spatial OS Online
              </p>
            </div>
          </div>

          {/* Instant Skip button */}
          <button
            onClick={() => setBooting(false)}
            className="mt-8 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20"
          >
            Darhol kirish [Skip →]
          </button>
        </div>
      )}

      {/* 2. Dual-Lens Curved Vignette (simulates looking through a VR headset) */}
      {vrEnabled && (
        <div
          className="pointer-events-none fixed inset-0 z-30"
          style={{
            background:
              "radial-gradient(circle 800px at 50% 50%, transparent 58%, rgba(0, 0, 0, 0.5) 80%, rgba(5, 5, 12, 0.95) 100%)",
            boxShadow:
              "inset 0 0 120px 40px rgba(0, 0, 0, 0.85), inset 0 0 30px rgba(6, 182, 212, 0.15)",
          }}
        >
          {/* Subtle VR dual eyepiece divider line in the middle */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-black/25 to-transparent pointer-events-none" />

          {/* Outer Lens curvature accents */}
          <div className="absolute top-4 left-4 size-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute top-4 right-4 size-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 size-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-3xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 size-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl pointer-events-none" />
        </div>
      )}

      {/* 3. Spatial Laser Reticle / Gaze Dot following cursor */}
      {vrEnabled && (
        <div
          className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{
            left: `${mouseX}px`,
            top: `${mouseY}px`,
          }}
        >
          <div className="relative flex size-8 items-center justify-center">
            {/* Outer ring */}
            <span className="absolute size-7 rounded-full border border-cyan-400/50 animate-ping opacity-30" />
            <span className="size-6 rounded-full border border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
            {/* Center laser dot */}
            <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
          </div>
        </div>
      )}

      {/* 4. VR HUD Telemetry & Navigation */}
      <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-4 sm:p-6 select-none font-mono">
        {/* Top Header Row */}
        <div className="flex items-center justify-between text-xs">
          {/* Top Left: Device & Tracking Status */}
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-cyan-500/25 bg-black/60 px-4 py-2 text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/20">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wider text-white">SPATIAL VISION OS</span>
            <span className="text-cyan-500/40">|</span>
            <span className="text-[11px] text-cyan-400/80">LATENCY: 2ms</span>
          </div>

          {/* Top Right: Controls (VR Toggle, Sound, Reset) */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className="flex size-9 items-center justify-center rounded-xl border border-cyan-500/25 bg-black/60 text-cyan-300 backdrop-blur-md transition-colors hover:bg-cyan-500/20 hover:text-white"
              title={muted ? "Ovozni yoqish" : "Ovozni oʻchirish"}
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>

            <button
              onClick={handleReboot}
              className="flex size-9 items-center justify-center rounded-xl border border-cyan-500/25 bg-black/60 text-cyan-300 backdrop-blur-md transition-colors hover:bg-cyan-500/20 hover:text-white"
              title="VR Koʻzoynakni qayta kalibratsiyalash"
            >
              <RefreshCw className="size-4" />
            </button>

            <button
              onClick={() => {
                vrAudio.playClickSound();
                onToggleVr();
              }}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold backdrop-blur-md transition-all ${
                vrEnabled
                  ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  : "border-white/20 bg-black/60 text-muted-foreground hover:text-white"
              }`}
            >
              <Eye className="size-4" />
              <span>{vrEnabled ? "🥽 VR REJIMI: ON" : "ODDIY REJIM"}</span>
            </button>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          {/* Bottom Left: Live Gyro Degrees */}
          <div className="pointer-events-auto flex items-center gap-4 rounded-2xl border border-cyan-500/25 bg-black/60 px-4 py-2 text-cyan-300 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <Layers className="size-3.5 text-cyan-400" />
              <span className="text-muted-foreground">YAW:</span>
              <span className="font-bold text-white w-12">{yaw.toFixed(1)}°</span>
            </div>
            <span className="text-cyan-500/40">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">PITCH:</span>
              <span className="font-bold text-white w-12">{pitch.toFixed(1)}°</span>
            </div>
          </div>

          {/* Bottom Center: User Interaction Hint */}
          <div className="rounded-full border border-cyan-500/20 bg-black/50 px-5 py-1.5 text-[11px] text-cyan-300/90 backdrop-blur-md text-center">
            <span className="text-cyan-400 font-semibold">[ SICHQONCHA ]</span> Boshni 3D burish
            · <span className="text-cyan-400 font-semibold">[ BOSISH ]</span> Kitob va buyumlarni ochish
          </div>

          {/* Bottom Right: Optical specs */}
          <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-black/60 px-4 py-2 text-[11px] text-cyan-400/80 backdrop-blur-md">
            <Sparkles className="size-3 text-cyan-400" />
            <span>FOV 110° · STEREO 3D</span>
          </div>
        </div>
      </div>
    </>
  );
}
