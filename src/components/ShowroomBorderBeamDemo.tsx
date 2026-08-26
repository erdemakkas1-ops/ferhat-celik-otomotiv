import { ArrowUpRight, Flame, Gauge, Zap } from "lucide-react";

import { BorderBeam } from "@/components/ui/border-beam";

const PORSCHE_IMAGE =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90";

export function ShowroomBorderBeamDemo() {
  return (
    <section className="relative overflow-hidden bg-[#09090b] px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/[0.07] blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/75 shadow-[0_40px_100px_-35px_rgba(163,230,53,0.3)] backdrop-blur-xl">
          <BorderBeam duration={7} borderWidth={2} colorFrom="#a3e635" colorTo="#f7fee7" />

          <div className="relative z-30 grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
              <img
                src={PORSCHE_IMAGE}
                alt="Porsche 911 GT3 RS"
                width={1800}
                height={1200}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#09090b]" />
              <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-black/45 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-lime-300 backdrop-blur-xl">
                <Flame className="h-4 w-4" aria-hidden="true" /> Ayın Öne Çıkanı
              </span>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-lime-300">
                Ferhat Çelik Signature
              </p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.05em] text-white sm:text-5xl">
                Porsche 911
                <span className="mt-2 block text-zinc-500">GT3 RS</span>
              </h2>
              <p className="mt-6 text-sm leading-7 text-zinc-400">
                Pist teknolojisinin yola aktarılmış en saf yorumu. Atmosferik karakter,
                kusursuz aerodinami ve zamansız 911 silüeti.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
                  <Zap className="h-5 w-5 text-lime-300" aria-hidden="true" />
                  <p className="mt-4 text-2xl font-black text-white">525 HP</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Motor gücü
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
                  <Gauge className="h-5 w-5 text-lime-300" aria-hidden="true" />
                  <p className="mt-4 text-2xl font-black text-white">3.2s</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    0–100 km/s
                  </p>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap items-end justify-between gap-5 border-t border-white/10 pt-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Liste fiyatı
                  </p>
                  <p className="mt-1 text-2xl font-black text-lime-300">34.900.000 ₺</p>
                </div>
                <a
                  href="#araclar"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-lime-300 px-6 text-sm font-black text-black transition hover:bg-white"
                >
                  Aracı İncele <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
