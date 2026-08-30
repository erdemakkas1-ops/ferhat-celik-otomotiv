import { ArrowUpRight, Award, Flame, Gauge, ShieldCheck, Zap, type LucideIcon } from "lucide-react";

import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";
import { formatKm, formatPrice, highResolutionVehicleImage, type Vehicle } from "@/data/vehicles";

const icons: LucideIcon[] = [Gauge, Zap, Flame, ShieldCheck, Award];

export function ShowroomFleetDemo({ vehicles }: { vehicles: Vehicle[] }) {
  const selected = vehicles.filter((vehicle) => !vehicle.sold).slice(0, 5);
  if (!selected.length) return null;

  const items: CardItem[] = selected.map((vehicle, index) => {
    const Icon = icons[index % icons.length] ?? Gauge;
    return {
      id: vehicle.id,
      title: vehicle.title,
      image: highResolutionVehicleImage(vehicle.image),
      eyebrow: `${vehicle.year} model · Ferhat Çelik Otomotiv`,
      content: (
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-200">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-xl"><Icon className="h-4 w-4 text-lime-300" /> {formatKm(vehicle.km)}</span>
          <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-xl">{vehicle.fuel}</span>
          <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-xl">{vehicle.transmission}</span>
          <strong className="ml-auto text-lg text-lime-300">{formatPrice(vehicle.price)}</strong>
          <a
            href={vehicle.sahibindenUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 text-zinc-950 transition-transform hover:scale-105"
            aria-label={`${vehicle.title} ilanını incele`}
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      ),
    };
  });

  return (
    <section className="relative overflow-hidden bg-[#09090b] px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="koleksiyon-baslik">
      <div className="pointer-events-none absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-[#a3e635]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[.28em] text-[#a3e635]">Gerçek galeri envanteri</p>
        <h2 id="koleksiyon-baslik" className="mt-3 text-3xl font-black text-white sm:text-5xl">Seçkin Araç Koleksiyonu</h2>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-400">Ferhat Çelik Otomotiv güvencesiyle pist ve cadde performansını bir araya getiren premium modeller.</p>
        <ExpandingCards items={items} className="mt-10" />
      </div>
    </section>
  );
}
