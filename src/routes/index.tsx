import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "me desculpa? 💌" },
      { name: "description", content: "uma desculpa de verdade" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no" },
    ],
  }),
});

type Step = 0 | 1 | 2 | 3 | 4;

function Index() {
  const [step, setStep] = useState<Step>(0);
  const [date, setDate] = useState("");

  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, #FFE6E1 0%, #FFF5F0 45%, #FFEFE8 100%)",
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        color: "#5a1a2a",
      }}
    >
      <FontLoader />
      <FloatingPetals />

      <main className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-5 py-10">
        <AnimatePresence mode="wait">
          {step === 0 && <Intro key="0" onNext={() => setStep(1)} />}
          {step === 1 && <Forgive key="1" onYes={() => setStep(2)} />}
          {step === 2 && <Relief key="2" onNext={() => setStep(3)} />}
          {step === 3 && (
            <PickDate
              key="3"
              date={date}
              setDate={setDate}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && <Final key="4" date={date} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ---------------- Fonts ---------------- */
function FontLoader() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
    </>
  );
}

/* ---------------- Decorative petals ---------------- */
function FloatingPetals() {
  const petals = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((_, i) => {
        const left = (i * 73) % 100;
        const delay = (i % 5) * 0.7;
        const size = 10 + ((i * 7) % 18);
        return (
          <motion.div
            key={i}
            initial={{ y: -40, opacity: 0 }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 0.7, 0.7, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 14 + (i % 6),
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: -40,
              width: size,
              height: size,
            }}
          >
            <Heart />
          </motion.div>
        );
      })}
    </div>
  );
}

function Heart() {
  return (
    <svg viewBox="0 0 24 24" fill="#FFB3BE" width="100%" height="100%">
      <path d="M12 21s-7-4.5-9.5-9.2C.9 8.6 2.6 5 6 5c2 0 3.3 1.1 4 2.2C10.7 6.1 12 5 14 5c3.4 0 5.1 3.6 3.5 6.8C19 16.5 12 21 12 21z" />
    </svg>
  );
}

/* ---------------- Card wrapper ---------------- */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ type: "spring", damping: 20, stiffness: 180 }}
      className="w-full max-w-md rounded-[28px] bg-white/80 px-7 py-10 text-center shadow-[0_20px_60px_-20px_rgba(255,122,138,0.45)] backdrop-blur"
      style={{ border: "1px solid rgba(255,179,190,0.4)" }}
    >
      {children}
    </motion.div>
  );
}

const titleStyle: React.CSSProperties = {
  fontFamily: "'Instrument Serif', Georgia, serif",
  fontStyle: "italic",
  color: "#7A2E3F",
  lineHeight: 1.05,
  letterSpacing: "-0.01em",
};

/* ---------------- Step 0: Intro ---------------- */
function Intro({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <div className="mb-4 text-3xl">🌸</div>
      <h1 className="text-5xl" style={titleStyle}>
        me desculpa?
      </h1>
      <p className="mt-5 text-base text-[#7A2E3F]/70">
        fiz algo errado e quero consertar. me dá só um minuto?
      </p>
      <PrimaryButton onClick={onNext}>continuar →</PrimaryButton>
    </Card>
  );
}

/* ---------------- Step 1: Forgive with dodging button ---------------- */
function Forgive({ onYes }: { onYes: () => void }) {
  return (
    <Card>
      <div className="mb-4 text-3xl">💗</div>
      <h1 className="text-4xl" style={titleStyle}>
        me perdoa?
      </h1>
      <p className="mt-4 text-sm text-[#7A2E3F]/70">
        eu sei que pisei na bola. prometo melhorar.
      </p>

      <div className="relative mt-8 flex items-center justify-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="rounded-full px-6 py-3.5 text-base font-semibold text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #FF7A8A 0%, #FF5A75 100%)",
            boxShadow: "0 10px 30px -10px rgba(255,90,117,0.7)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          sim 💗
        </motion.button>
        <DodgyNoButton />
      </div>
    </Card>
  );
}

function DodgyNoButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [hidden, setHidden] = useState(false);
  const dodgesRef = useRef(0);
  const lastDodgeRef = useRef(0);

  useEffect(() => {
    if (hidden) return;

    const tryDodge = (clientX: number, clientY: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      const trigger = 110;
      if (dist > trigger) return;

      // Throttle: only dodge every 180ms
      const now = Date.now();
      if (now - lastDodgeRef.current < 180) return;
      lastDodgeRef.current = now;

      // Push opposite to finger/cursor
      const norm = dist === 0 ? 1 : dist;
      const ux = -dx / norm;
      const uy = -dy / norm;
      const push = 50 + Math.random() * 30;

      // Keep within viewport
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const margin = 16;
      const w = rect.width;
      const h = rect.height;

      setPos((prev) => {
        let nx = prev.x + ux * push + (Math.random() - 0.5) * 20;
        let ny = prev.y + uy * push + (Math.random() - 0.5) * 20;

        const futureLeft = rect.left + (nx - prev.x);
        const futureTop = rect.top + (ny - prev.y);
        if (futureLeft < margin) nx += margin - futureLeft;
        if (futureLeft + w > vw - margin)
          nx -= futureLeft + w - (vw - margin);
        if (futureTop < margin) ny += margin - futureTop;
        if (futureTop + h > vh - margin)
          ny -= futureTop + h - (vh - margin);

        return { x: nx, y: ny };
      });

      dodgesRef.current += 1;
      setScale((s) => Math.max(0.55, s * 0.94));
      if (dodgesRef.current >= 7) {
        setTimeout(() => setHidden(true), 200);
      }
    };

    const onMove = (e: MouseEvent) => tryDodge(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0] ?? e.changedTouches[0];
      if (t) tryDodge(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={(e) => e.preventDefault()}
      animate={{ x: pos.x, y: pos.y, scale }}
      transition={{ type: "spring", damping: 22, stiffness: 120, mass: 1.2 }}
      className="select-none rounded-full px-6 py-3.5 text-base font-medium"
      style={{
        background: "#FFE4E8",
        color: "#7A2E3F",
        border: "1px solid #FFC8D0",
        touchAction: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      não 🙈
    </motion.button>
  );
}

/* ---------------- Step 2: Relief ---------------- */
function Relief({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <div className="mb-4 text-4xl">🥹</div>
      <h1 className="text-4xl" style={titleStyle}>
        sério??? que aliviooo
      </h1>
      <p className="mt-4 text-sm text-[#7A2E3F]/70">
        tava com o coração na mão. obrigado por não desistir de mim.
      </p>
      <PrimaryButton onClick={onNext}>okay okay →</PrimaryButton>
    </Card>
  );
}

/* ---------------- Step 3: Pick date ---------------- */
function PickDate({
  date,
  setDate,
  onNext,
}: {
  date: string;
  setDate: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <Card>
      <div className="mb-4 text-3xl">📅 🐾</div>
      <h1 className="text-4xl" style={titleStyle}>
        então… quando posso te compensar?
      </h1>
      <p className="mt-4 text-sm text-[#7A2E3F]/70">
        escolhe um dia. eu apareço com tudo que você gosta.
      </p>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mt-6 w-full rounded-2xl bg-white/90 px-4 py-3 text-center text-base outline-none"
        style={{
          border: "1px solid #FFC8D0",
          color: "#7A2E3F",
          fontFamily: "inherit",
        }}
      />

      <PrimaryButton onClick={onNext} disabled={!date}>
        marcar 💌
      </PrimaryButton>
    </Card>
  );
}

/* ---------------- Step 4: Final ---------------- */
function Final({ date }: { date: string }) {
  const pretty = date
    ? new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      })
    : "em breve";
  return (
    <Card>
      <div className="mb-4 text-4xl">💗</div>
      <h1 className="text-3xl" style={titleStyle}>
        marcado pra {pretty}
      </h1>
      <p className="mt-4 text-sm text-[#7A2E3F]/70">
        obrigado por não desistir de mim. te vejo nesse dia. ✨
      </p>
      <div className="mt-6 flex justify-center gap-2 text-2xl">
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          💗
        </motion.span>
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
        >
          💗
        </motion.span>
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
        >
          💗
        </motion.span>
      </div>
    </Card>
  );
}

/* ---------------- Primary button ---------------- */
function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className="mt-8 w-full rounded-full px-6 py-3.5 text-base font-semibold text-white shadow-lg disabled:opacity-50"
      style={{
        background:
          "linear-gradient(135deg, #FF7A8A 0%, #FF5A75 100%)",
        boxShadow: "0 10px 30px -10px rgba(255,90,117,0.7)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {children}
    </motion.button>
  );
}
