// Web Audio API ambient lofi chord synthesizer for Deep Focus mode

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play peaceful dreamy ambient lofi chord
  private playChord(freqs: number[]) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.06, now + 1.2);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + 4);
    });
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Chords: Fmaj7 (F3, A3, C4, E4), Gsus4 (G3, C4, D4, G4), Am9 (A3, C4, E4, B4)
    const chordProgression = [
      [174.61, 220.0, 261.63, 329.63],
      [196.0, 261.63, 293.66, 392.0],
      [220.0, 261.63, 329.63, 493.88],
    ];

    let chordIndex = 0;
    const loop = () => {
      if (!this.isPlaying) return;
      this.playChord(chordProgression[chordIndex]);
      chordIndex = (chordIndex + 1) % chordProgression.length;
      this.timer = window.setTimeout(loop, 3600);
    };

    loop();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  status(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioEngine();
