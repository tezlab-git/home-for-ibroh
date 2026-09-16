import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Play } from "lucide-react";

interface TerminalProps {
  onCommandRun?: (cmd: string) => void;
}

export function InteractiveTerminal({ onCommandRun }: TerminalProps) {
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: "welcome",
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-semibold">
            ✦ Ibrohimbek Gulomov — Interactive CLI Environment v2.4
          </p>
          <p className="text-muted-foreground">
            Mavjud buyruqlar:{" "}
            <span className="text-cyan-400 font-mono">skills</span>,{" "}
            <span className="text-cyan-400 font-mono">projects</span>,{" "}
            <span className="text-cyan-400 font-mono">matrix</span>,{" "}
            <span className="text-cyan-400 font-mono">joke</span>,{" "}
            <span className="text-cyan-400 font-mono">quote</span>,{" "}
            <span className="text-cyan-400 font-mono">clear</span>
          </p>
        </div>
      ),
    },
  ]);

  const [input, setInput] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, matrixActive]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = 240;

    const chars = "01IBROHIMBEKGULOMOVTEZLABAIREACTTYPESCRIPT0123456789";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const timer = setTimeout(() => {
      setMatrixActive(false);
      cancelAnimationFrame(animationId);
    }, 4500);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationId);
    };
  }, [matrixActive]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    onCommandRun?.(cmd);

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (cmd === "matrix") {
      setMatrixActive(true);
      setHistory((prev) => [
        ...prev,
        {
          cmd,
          output: (
            <p className="text-emerald-400 font-mono animate-pulse">
              [✓] Matrix Stream faollashtirildi...
            </p>
          ),
        },
      ]);
      setInput("");
      return;
    }

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs text-muted-foreground font-mono">
            <p>
              <strong className="text-foreground">skills:</strong> Ishlatiladigan texnologiyalar reytingi
            </p>
            <p>
              <strong className="text-foreground">projects:</strong> Yaratilgan loyihalar roʻyxati
            </p>
            <p>
              <strong className="text-foreground">matrix:</strong> Matrix yashil kod oqimi
            </p>
            <p>
              <strong className="text-foreground">joke:</strong> Dasturchilar haqida hazil
            </p>
            <p>
              <strong className="text-foreground">quote:</strong> Ilhomlantiruvchi aforizm
            </p>
            <p>
              <strong className="text-foreground">clear:</strong> Ekranni tozalash
            </p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1.5 font-mono text-xs">
            <div>
              <span className="text-cyan-400">TypeScript & React:</span>
              <span className="text-emerald-400 ml-2">[██████████████████░░] 92%</span>
            </div>
            <div>
              <span className="text-cyan-400">Next.js & TanStack:</span>
              <span className="text-emerald-400 ml-2">[████████████████░░░░] 88%</span>
            </div>
            <div>
              <span className="text-cyan-400">Node.js & Supabase:</span>
              <span className="text-emerald-400 ml-2">[███████████████░░░░░] 82%</span>
            </div>
            <div>
              <span className="text-cyan-400">AI / LLM & Prompt Eng:</span>
              <span className="text-emerald-400 ml-2">[█████████████████░░░] 85%</span>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1.5 font-mono text-xs">
            <p>
              🚀 <strong className="text-amber-400">Tezlab:</strong> Dasturchilar uchun tezkor vositalar va platforma (tezlab.uz)
            </p>
            <p>
              🧠 <strong className="text-violet-400">Mano:</strong> Fikrlar va bilimlarni boshqarish tizimi
            </p>
            <p>
              🏥 <strong className="text-emerald-400">SalomAT:</strong> AI yordamida sogʻliqni saqlash yechimlari
            </p>
            <p>
              ⚡ <strong className="text-sky-400">Mayoq Labs:</strong> Eksperimental AI tadqiqotlari
            </p>
          </div>
        );
        break;

      case "joke":
        const jokes = [
          "Dasturchi doʻkonga bordi: '1 ta non oling, agar tuxum boʻlsa 10 ta oling'. U 10 ta non bilan qaytib keldi: 'Tuxum bor ekan!'",
          "Dunyoda faqat 10 xil odamlar bor: ikkilik (binary) sanoq tizimini tushunadiganlar va tushunmaydiganlar.",
          "Kodim ishlamayapti — nega ekanini bilmayman. Kodim ishlab ketdi — yana nega ekanini bilmayman!",
        ];
        output = (
          <p className="text-xs text-amber-300 font-mono italic">
            "{jokes[Math.floor(Math.random() * jokes.length)]}"
          </p>
        );
        break;

      case "quote":
        output = (
          <p className="text-xs text-violet-300 font-serif italic">
            "Har bir katta loyiha kichik, mustaqil tajribalardan boshlanadi. Qurish, oʻrganish va ulashish — rivojlanishning eng toʻgʻri yoʻli."
          </p>
        );
        break;

      default:
        output = (
          <p className="text-xs text-rose-400 font-mono">
            Nomaʼlum buyruq: "{cmd}". Yordam uchun <span className="underline font-bold">help</span> deb yozing.
          </p>
        );
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output }]);
    setInput("");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-hairline/90 bg-card/90 p-5 backdrop-blur-xl shadow-2xl shadow-primary/10">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between border-b border-hairline/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-rose-500/80" />
          <span className="size-3 rounded-full bg-amber-500/80" />
          <span className="size-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <TerminalIcon className="size-3.5 text-accent" />
            ibroh-cli (interactive)
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] text-muted-foreground">online</span>
        </div>
      </div>

      {/* Quick Action Suggestion Chips */}
      <div className="my-3 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="font-mono text-[11px] text-muted-foreground mr-1">Tezkor:</span>
        {["projects", "skills", "matrix", "joke", "quote", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="flex items-center gap-1 rounded-md border border-hairline bg-surface/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-all hover:border-accent/40 hover:text-accent hover:bg-surface"
          >
            <Play className="size-2.5 opacity-60" />
            {cmd}
          </button>
        ))}
      </div>

      {/* Matrix Overlay Mode */}
      {matrixActive && (
        <div className="relative my-2 h-60 w-full overflow-hidden rounded-xl border border-emerald-500/30 bg-black">
          <canvas ref={matrixCanvasRef} className="size-full" />
        </div>
      )}

      {/* Output Stream */}
      <div className="max-h-56 overflow-y-auto space-y-3 font-mono text-xs py-2 pr-1">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-emerald-500 font-bold">❯</span>
              <span className="text-foreground">{item.cmd}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Command Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
        }}
        className="mt-3 flex items-center gap-2 border-t border-hairline/80 pt-3"
      >
        <span className="font-mono text-xs font-bold text-emerald-500">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Buyruq yozing (masalan: matrix, skills, joke)..."
          className="w-full bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg border border-hairline bg-surface px-2 py-1 text-muted-foreground hover:text-foreground"
          title="Yuborish"
        >
          <CornerDownLeft className="size-3" />
        </button>
      </form>
    </div>
  );
}
