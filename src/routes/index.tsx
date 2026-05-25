import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "me desculpa? 💌" },
      { name: "description", content: "uma desculpa de verdade" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no",
      },
    ],
  }),
});

type Step = 0 | 1 | 2 | 3 | 4;

function Index() {
  const [step, setStep] = useState<Step>(0);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top, #FFE6E1 0%, #FFF5F0 45%, #FFEFE8 100%)",
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        color: "#5a1a2a",
      }}
    >
      <FontLoader />
      <FloatingPetals />
      <FloatingMemes />

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
              message={message}
              setMessage={setMessage}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && <Final key="4" date={date} message={message} />}
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
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
    </>
  );
}

/* ---------------- Decorative petals ---------------- */
type FloatKind = "heart" | "flag" | "chibi";

function FloatingPetals() {
  const heartCount = 36;
  const flagCount = 26;
  const chibiCount = 22;
  const items = Array.from({ length: heartCount + flagCount + chibiCount }, (_, i) => {
    let kind: FloatKind = "heart";
    if (i >= heartCount && i < heartCount + flagCount) kind = "flag";
    else if (i >= heartCount + flagCount) kind = "chibi";
    return { kind, i };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(({ kind, i }) => {
        const left = (i * 73) % 100;
        const delay = (i % 5) * 0.7;
        const baseSize = 10 + ((i * 7) % 18);
        // Chibi roughly 2× larger than hearts/flags, as requested.
        const size = kind === "chibi" ? baseSize * 2.2 : baseSize;
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
            {kind === "heart" && <Heart />}
            {kind === "flag" && (
              <img
                src="/cuba.svg"
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 1,
                }}
              />
            )}
            {kind === "chibi" && (
              <img
                src="/chibi.png"
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            )}
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

/* ---------------- Floating meme stickers ---------------- */
const memeFiles = [
  "/memes/tiramisu.jpg",
  "/memes/moleque.jpg",
  "/memes/sim-fogo.jpg",
  "/memes/sim-pc.jpg",
  "/memes/triceramisu.jpg",
  "/memes/carbonara.jpg",
];

// Each of the 4 originals appears once; the remaining slots use triceramisu
// (replacing the duplicates as requested).
const memeStickers: Array<{
  src: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  delay: number;
}> = [
  { src: memeFiles[0], top: "6%", left: "4%", size: 140, rotate: -12, delay: 0 },
  { src: memeFiles[2], top: "8%", left: "82%", size: 130, rotate: 9, delay: 0.6 },
  { src: memeFiles[3], top: "70%", left: "3%", size: 150, rotate: 6, delay: 1.2 },
  { src: memeFiles[1], top: "72%", left: "84%", size: 120, rotate: -8, delay: 0.3 },
  { src: memeFiles[4], top: "40%", left: "1%", size: 110, rotate: 14, delay: 1.5 },
  { src: memeFiles[4], top: "40%", left: "88%", size: 110, rotate: -14, delay: 0.9 },
  { src: memeFiles[4], top: "85%", left: "45%", size: 105, rotate: -4, delay: 0.4 },
  { src: memeFiles[4], top: "2%", left: "45%", size: 95, rotate: 7, delay: 1.0 },
  { src: memeFiles[5], top: "25%", left: "72%", size: 125, rotate: 11, delay: 1.4 },
  { src: memeFiles[5], top: "60%", left: "10%", size: 115, rotate: -9, delay: 0.7 },
];

function FloatingMemes() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {memeStickers.map((m, i) => (
        <motion.img
          key={i}
          src={m.src}
          alt=""
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: [0, 0.85, 0.85, 0.85],
            scale: 1,
            rotate: [m.rotate - 3, m.rotate + 3, m.rotate - 3],
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: m.delay },
            scale: { duration: 0.6, delay: m.delay },
            rotate: { duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute",
            top: m.top,
            left: m.left,
            width: m.size,
            height: "auto",
            borderRadius: 12,
            boxShadow: "0 10px 30px -10px rgba(122,46,63,0.35)",
            border: "3px solid #FFE4E8",
            transform: `rotate(${m.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Card wrapper ---------------- */
function Card({
  children,
  bgImage,
  bgPosition = "center",
}: {
  children: React.ReactNode;
  bgImage?: string;
  bgPosition?: string;
}) {
  const bgStyle: React.CSSProperties = bgImage
    ? {
        backgroundImage: `linear-gradient(rgba(255,255,255,0.45), rgba(255,255,255,0.45)), url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: bgPosition,
      }
    : {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ type: "spring", damping: 20, stiffness: 180 }}
      className={`w-full max-w-md rounded-[28px] px-7 py-10 text-center shadow-[0_20px_60px_-20px_rgba(255,122,138,0.45)] backdrop-blur ${bgImage ? "" : "bg-white/80"}`}
      style={{ border: "1px solid rgba(255,179,190,0.4)", ...bgStyle }}
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
      <div className="mb-6 pt-2">
        <span className="relative inline-block">
          <span className="shiny-bandiva" style={{ fontSize: "3.5rem", lineHeight: 1 }}>
            Alexa
          </span>
          <motion.span
            aria-hidden
            style={{ position: "absolute", top: -8, right: -10, fontSize: 18 }}
            animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
          <motion.span
            aria-hidden
            style={{ position: "absolute", bottom: -6, left: -10, fontSize: 16 }}
            animate={{ scale: [0, 1, 0], rotate: [0, -180] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            ✨
          </motion.span>
          <motion.span
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              right: "100%",
              marginRight: 12,
              fontSize: 14,
            }}
            animate={{ scale: [0, 1, 0], rotate: [0, 360] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            ✨
          </motion.span>
        </span>
      </div>
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
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  // Distance from origin → progress 0..1. 180px ≈ no is leaving the card half.
  const dist = Math.hypot(noPos.x, noPos.y);
  const progress = Math.min(dist / 180, 1);
  const isFullyOut = dist > 220;

  // Sim width grows from "half minus gap" to "100%". Gap shrinks proportionally.
  const simWidth = isFullyOut ? "100%" : `calc(${50 + progress * 50}% - ${8 * (1 - progress)}px)`;
  const simFontSize = isFullyOut ? "1.125rem" : "1rem";

  return (
    <Card>
      <div className="mb-4 text-3xl">💗</div>
      <h1 className="text-4xl" style={titleStyle}>
        me perdoa?
      </h1>
      <p className="mt-4 text-sm text-[#7A2E3F]/70">eu sei que pisei na bola. prometo melhorar.</p>

      <div className="relative mt-8 w-full" style={{ height: 56 }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          animate={{ width: simWidth, fontSize: simFontSize }}
          transition={{ type: "spring", damping: 22, stiffness: 200 }}
          className="absolute left-0 top-0 flex h-full items-center justify-center rounded-full font-semibold text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #FF7A8A 0%, #FF5A75 100%)",
            boxShadow: "0 10px 30px -10px rgba(255,90,117,0.7)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          sim 💗
        </motion.button>
        <DodgyNoButton onPosChange={setNoPos} />
      </div>
    </Card>
  );
}

function DodgyNoButton({ onPosChange }: { onPosChange?: (pos: { x: number; y: number }) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [clickable, setClickable] = useState(false);
  const dodgesRef = useRef(0);
  const lastDodgeRef = useRef(0);

  useEffect(() => {
    onPosChange?.(pos);
  }, [pos.x, pos.y, onPosChange]);

  useEffect(() => {
    if (clickable) return;

    const tryDodge = (clientX: number, clientY: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      const trigger = phase === 3 ? 160 : 110;
      if (dist > trigger) return;

      const now = Date.now();
      const throttle = phase === 3 ? 60 : 180;
      if (now - lastDodgeRef.current < throttle) return;
      lastDodgeRef.current = now;

      const norm = dist === 0 ? 1 : dist;
      const ux = -dx / norm;
      const uy = -dy / norm;
      const push = phase === 3 ? 110 + Math.random() * 40 : 50 + Math.random() * 30;

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
        if (futureLeft + w > vw - margin) nx -= futureLeft + w - (vw - margin);
        if (futureTop < margin) ny += margin - futureTop;
        if (futureTop + h > vh - margin) ny -= futureTop + h - (vh - margin);

        return { x: nx, y: ny };
      });

      dodgesRef.current += 1;
      if (phase !== 3 && dodgesRef.current >= 3) {
        setClickable(true);
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
  }, [clickable, phase]);

  const handleClick = () => {
    if (!clickable) return;
    if (phase === 1) {
      setPhase(2);
      dodgesRef.current = 0;
      setClickable(false);
    } else if (phase === 2) {
      setPhase(3);
      dodgesRef.current = 0;
      setClickable(false);
    }
  };

  const label =
    phase === 1
      ? "não 🙈"
      : phase === 2
        ? "então você me odeia é isso?"
        : "jaé então po quero ver acertar o botão";

  const spring =
    phase === 3
      ? { type: "spring" as const, damping: 14, stiffness: 320, mass: 0.65 }
      : { type: "spring" as const, damping: 22, stiffness: 120, mass: 1.2 };

  // Phase 1 occupies the right half of the box. Phases 2/3 size to content
  // so the longer texts fit naturally — the dodge transform places them wherever.
  const dodgyWidth = phase === 1 ? "calc(50% - 8px)" : "auto";

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      animate={{ x: pos.x, y: pos.y, width: dodgyWidth }}
      transition={spring}
      className="absolute right-0 top-0 flex h-full select-none items-center justify-center whitespace-nowrap rounded-full px-6 text-base font-medium"
      style={{
        background: "#FFE4E8",
        color: "#7A2E3F",
        border: "1px solid #FFC8D0",
        touchAction: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        cursor: clickable ? "pointer" : "default",
      }}
    >
      {label}
    </motion.button>
  );
}

/* ---------------- Step 2: Relief ---------------- */
function Relief({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <h1 className="text-4xl" style={titleStyle}>
        Sério??? Obrigado{" "}
        <span className="relative inline-block">
          <span className="shiny-bandiva">bandiva</span>
          <motion.span
            aria-hidden
            style={{ position: "absolute", top: -10, right: -6, fontSize: 16 }}
            animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
          <motion.span
            aria-hidden
            style={{ position: "absolute", bottom: -8, left: -8, fontSize: 14 }}
            animate={{ scale: [0, 1, 0], rotate: [0, -180] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            ✨
          </motion.span>
          <motion.span
            aria-hidden
            style={{ position: "absolute", top: -4, left: "45%", fontSize: 12 }}
            animate={{ scale: [0, 1, 0], rotate: [0, 360] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            ✨
          </motion.span>
        </span>
      </h1>
      <p className="mt-4 text-sm text-[#7A2E3F]/70">
        tava com o coração na mão, obrigado pela paciência. prometo que não vai se arrepender.
      </p>
      <PrimaryButton onClick={onNext}>okay okay →</PrimaryButton>
    </Card>
  );
}

/* ---------------- Step 3: Pick date ---------------- */
function PickDate({
  date,
  setDate,
  message,
  setMessage,
  onNext,
}: {
  date: string;
  setDate: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <Card bgImage="/nami.jpg" bgPosition="right center">
      <h1
        className="text-4xl"
        style={{
          ...titleStyle,
          textShadow:
            "0 0 6px rgba(255,255,255,0.95), 0 0 14px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.15)",
        }}
      >
        então, como e quando posso te recompensar?
      </h1>
      <p
        className="mt-4 text-sm font-medium text-[#7A2E3F]"
        style={{
          textShadow: "0 0 4px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.7)",
        }}
      >
        escolhe um dia. eu apareço com tudo que você quer.
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

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="me conta o que você quer..."
        rows={3}
        className="mt-3 w-full resize-none rounded-2xl bg-white/90 px-4 py-3 text-base outline-none"
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
function Final({ date, message }: { date: string; message: string }) {
  const pretty = date
    ? new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      })
    : "em breve";

  const whatsappText = message.trim()
    ? `ei, marquei pra ${pretty}\n\n${message.trim()}`
    : `ei, marquei pra ${pretty}`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=5524999845149&text=${encodeURIComponent(whatsappText)}`;

  return (
    <Card>
      <div className="mb-4 text-4xl">💗</div>
      <h1 className="text-3xl" style={titleStyle}>
        marcado pra {pretty}
      </h1>
      <p className="mt-4 text-sm text-[#7A2E3F]/70">
        Obrigado por ser compreensiva, linda. Te vejo nesse dia.
      </p>
      <div className="mt-6 flex justify-center gap-2 text-2xl">
        <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
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

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.95 }}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white shadow-lg"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: "0 10px 30px -10px rgba(37,211,102,0.7)",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414z" />
        </svg>
        confirmar no whatsapp
      </motion.a>
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
        background: "linear-gradient(135deg, #FF7A8A 0%, #FF5A75 100%)",
        boxShadow: "0 10px 30px -10px rgba(255,90,117,0.7)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {children}
    </motion.button>
  );
}
