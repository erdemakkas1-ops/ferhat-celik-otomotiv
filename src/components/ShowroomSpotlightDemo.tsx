import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowUpRight, Gauge, ShieldCheck, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  radius?: number;
};

function CardSpotlight({ children, className, radius = 420 }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-radius);
  const mouseY = useMotionValue(-radius);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(-radius);
        mouseY.set(-radius);
      }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "group relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/60 backdrop-blur-xl",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(190, 242, 100, 0.18), transparent 68%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:28px_28px]"
      />
      {children}
    </motion.article>
  );
}

const showcaseCars = [
  {
    name: "Porsche 911 GT3 RS",
    year: 2024,
    power: 525,
    price: "34.900.000 ₺",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=88",
  },
  {
    name: "Mercedes-AMG GT",
    year: 2024,
    power: 585,
    price: "27.750.000 ₺",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=88",
  },
  {
    name: "BMW M8 Gran Coupé",
    year: 2023,
    power: 625,
    price: "22.950.000 ₺",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=88",
  },
] as const;

export function ShowroomSpotlightDemo() {
  return (
    <section
      aria-labelledby="signature-baslik"
      className="relative overflow-hidden border-y border-lime-300/10 bg-[#09090b] px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-lime-300/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-lime-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" /> Signature collection
            </p>
            <h2
              id="signature-baslik"
              className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
            >
              Performansın en saf hali.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-400">
            Ferhat Çelik Otomotiv seçkisi; karakter, teknoloji ve kusursuz işçiliğin aynı
            noktada buluştuğu otomobiller.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {showcaseCars.map((car, index) => (
            <CardSpotlight key={car.name} className="min-h-[520px]">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  width={1600}
                  height={1067}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/5 to-black/10" />
                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl">
                  0{index + 1} / Limited
                </span>
              </div>

              <div className="relative z-20 -mt-3 flex min-h-[250px] flex-col px-6 pb-6">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">
                  <span>{car.year}</span>
                  <span className="h-1 w-1 rounded-full bg-lime-300" />
                  <span className="inline-flex items-center gap-1.5">
                    <Gauge className="h-4 w-4 text-lime-300" aria-hidden="true" /> {car.power} HP
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black tracking-tight text-white">{car.name}</h3>
                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                      Başlangıç fiyatı
                    </p>
                    <p className="mt-1 text-xl font-black text-lime-300">{car.price}</p>
                  </div>
                  <a
                    href="#araclar"
                    aria-label={`${car.name} için araç vitrinini incele`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300 px-5 text-sm font-black text-black transition hover:bg-white"
                  >
                    İncele <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </CardSpotlight>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-zinc-500">
          <ShieldCheck className="h-4 w-4 text-lime-300" aria-hidden="true" />
          Seçili araçlarda ekspertiz ve güvenli alım desteği
        </div>
      </div>
    </section>
  );
}

export { CardSpotlight };
