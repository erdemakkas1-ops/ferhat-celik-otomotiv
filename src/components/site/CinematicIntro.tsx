import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const INTRO_VIDEO = "/media/ferhat-celik-intro-demo.mp4";
const INTRO_POSTER = "/media/ferhat-celik-intro-poster.png";

export function CinematicIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [plateReady, setPlateReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPlateReady(true);
      videoRef.current?.pause();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") enterSite();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function enterSite() {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
      window.requestAnimationFrame(() => {
        document.getElementById("icerik")?.focus({ preventScroll: true });
      });
    }, 650);
  }

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Ferhat Çelik Otomotiv sinematik giriş"
    >
      <button
        type="button"
        onClick={enterSite}
        className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-md transition hover:border-white/40 hover:text-white sm:right-6 sm:top-6"
      >
        Animasyonu geç
      </button>

      <div className="relative aspect-[784/470] w-[min(100vw,calc(100vh*1.668))] overflow-hidden">
        <video
          ref={videoRef}
          src={INTRO_VIDEO}
          poster={INTRO_POSTER}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 8.35) setPlateReady(true);
          }}
          onEnded={() => setPlateReady(true)}
          className="h-full w-full object-contain"
          aria-hidden="true"
        />

        <motion.button
          type="button"
          onClick={enterSite}
          initial={{ opacity: 0 }}
          animate={{ opacity: plateReady ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          className={`absolute left-1/2 top-[71%] h-[12%] w-[31%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/0 bg-transparent shadow-[0_0_0_0_rgba(239,68,68,0)] transition focus:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500 ${plateReady ? "pointer-events-auto hover:border-white/40 hover:shadow-[0_0_35px_rgba(239,68,68,0.28)]" : "pointer-events-none"}`}
          aria-label="Ferhat Çelik Otomotiv ilanlarına gir"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: plateReady ? 1 : 0, y: plateReady ? 0 : 8 }}
          transition={{ duration: 0.45 }}
          className="pointer-events-none absolute left-1/2 top-[80%] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[clamp(0.58rem,0.9vw,0.78rem)] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md"
        >
          İlanlar için plakaya dokunun
        </motion.p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
    </motion.div>
  );
}
