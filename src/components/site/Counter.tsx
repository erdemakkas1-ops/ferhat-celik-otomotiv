import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const nf = new Intl.NumberFormat("tr-TR");

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  value: number;
  suffix?: string | undefined;
  prefix?: string | undefined;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Start at the real value so SSR/first paint shows 15+, 1000+, %100 — never 0.
  const [display, setDisplay] = useState(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    // Only rewind to 0 when the element is still off-screen, so nothing that is
    // already visible flickers backwards.
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    setDisplay(0);
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate || !inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, inView, value, duration]);

  const finalText = `${prefix}${nf.format(value)}${suffix}`;

  return (
    <span ref={ref}>
      <span className="sr-only">{finalText}</span>
      <span aria-hidden="true">
        {prefix}
        {nf.format(display)}
        {suffix}
      </span>
    </span>
  );
}


