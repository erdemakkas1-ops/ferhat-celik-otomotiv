import { motion } from "motion/react";
import { ExternalLink, MessageCircle, Gauge, Fuel, Cog } from "lucide-react";
import {
  formatKm,
  formatPrice,
  highResolutionVehicleImage,
  whatsappLink,
  type Vehicle,
} from "@/data/vehicles";

export function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const sold = !!vehicle.sold;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:glow-ring"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <img
          src={highResolutionVehicleImage(vehicle.image)}
          alt={vehicle.title}
          loading="lazy"
          decoding="async"
          width={1024}
          height={768}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = vehicle.image;
          }}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
            sold ? "grayscale" : ""
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
        {vehicle.year > 0 && (
          <span className="absolute left-3 top-3 rounded-lg bg-background/80 px-2.5 py-1 text-xs font-bold text-primary backdrop-blur">
            {vehicle.year}
          </span>
        )}
        {vehicle.badge && !sold && (
          <span className="pulse-glow absolute right-3 top-3 rounded-lg bg-primary px-2.5 py-1 text-xs font-extrabold text-primary-foreground">
            {vehicle.badge}
          </span>
        )}
        {sold && (
          <div className="absolute inset-0 grid place-items-center bg-background/65 backdrop-blur-[2px]">
            <span className="rotate-[-8deg] rounded-xl border-2 border-primary bg-background/85 px-6 py-2 font-display text-xl font-extrabold tracking-[0.22em] text-primary">
              SATILDI
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <h3 className="font-display text-base font-bold leading-snug">{vehicle.title}</h3>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {vehicle.fuel !== "Belirtilmemiş" && (
            <Tag icon={<Fuel className="h-3.5 w-3.5" />}>{vehicle.fuel}</Tag>
          )}
          {vehicle.transmission !== "Belirtilmemiş" && (
            <Tag icon={<Cog className="h-3.5 w-3.5" />}>{vehicle.transmission}</Tag>
          )}
          {vehicle.km > 0 && (
            <Tag icon={<Gauge className="h-3.5 w-3.5" />}>{formatKm(vehicle.km)}</Tag>
          )}
        </div>

        <p className="mt-auto font-display text-2xl font-extrabold text-primary">
          {formatPrice(vehicle.price)}
        </p>

        {sold ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/60 px-3 py-2.5 text-sm font-bold text-muted-foreground">
              Satıldı
            </span>
            <a
              href={whatsappLink(
                `Merhaba, ${vehicle.title} benzeri bir araç arıyorum. Stokta var mı?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-whatsapp/50 bg-whatsapp/12 px-3 py-2.5 text-sm font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              Benzerini Sor
            </a>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href={vehicle.sahibindenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Sahibinden'de İncele
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={whatsappLink(
                `Merhaba, ${vehicle.title} (${formatPrice(vehicle.price)}) ilanı hakkında bilgi almak istiyorum.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-whatsapp/50 bg-whatsapp/12 px-3 py-2.5 text-sm font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}


function Tag({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2/70 px-2.5 py-1">
      {icon}
      {children}
    </span>
  );
}

