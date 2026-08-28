import { Award, Flame, Gauge, ShieldCheck, Zap } from "lucide-react";

import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";

type FleetCar = CardItem & {
  power: string;
  engine: string;
  icon: typeof Gauge;
};

const fleet: FleetCar[] = [
  {
    id: "porsche-911-gt3-rs",
    title: "Porsche 911 GT3 RS",
    eyebrow: "Track icon",
    power: "525 HP",
    engine: "4.0L Boxer",
    icon: Flame,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "mercedes-amg-gt-black-series",
    title: "Mercedes-AMG GT Black Series",
    eyebrow: "Black series",
    power: "730 HP",
    engine: "4.0L V8 Bi-Turbo",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "bmw-m8-competition",
    title: "BMW M8 Competition Coupe",
    eyebrow: "M performance",
    power: "625 HP",
    engine: "4.4L V8 M TwinPower",
    icon: Gauge,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "ferrari-f8-tributo",
    title: "Ferrari F8 Tributo",
    eyebrow: "Italian excellence",
    power: "720 HP",
    engine: "3.9L V8 Turbo",
    icon: Award,
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "audi-rs6-avant",
    title: "Audi RS6 Avant",
    eyebrow: "Everyday supercar",
    power: "600 HP",
    engine: "4.0L V8 TFSI",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1800&q=90",
  },
];

export function ShowroomFleetDemo() {
  return (
    <section
      aria-labelledby="fleet-heading"
      className="relative overflow-hidden border-y border-white/5 bg-[#09090b] px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-lime-300/[0.08] blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#a3e635]">
            <Award className="h-4 w-4" aria-hidden="true" /> Premium selection
          </p>
          <h2
            id="fleet-heading"
            className="mt-4 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
          >
            Seçkin Araç Koleksiyonu
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Ferhat Çelik Otomotiv güvencesiyle pist ve cadde performansını bir araya
            getiren premium modeller.
          </p>
        </div>

        <ExpandingCards
          items={fleet}
          initialActiveId="porsche-911-gt3-rs"
          renderContent={(item) => {
            const car = item as FleetCar;
            const Icon = car.icon;
            return (
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#a3e635]">
                  <Icon className="h-4 w-4" aria-hidden="true" /> {car.eyebrow}
                </div>
                <h3 className="mt-3 max-w-xl text-2xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                  {car.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">
                    <Zap className="h-4 w-4 text-[#a3e635]" aria-hidden="true" /> {car.power}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">
                    <Gauge className="h-4 w-4 text-[#a3e635]" aria-hidden="true" /> {car.engine}
                  </span>
                </div>
              </div>
            );
          }}
        />

        <div className="mt-7 flex items-center justify-center gap-2 text-xs font-semibold text-zinc-500">
          <ShieldCheck className="h-4 w-4 text-[#a3e635]" aria-hidden="true" />
          Ferhat Çelik Otomotiv kalite ve güven standartları
        </div>
      </div>
    </section>
  );
}
