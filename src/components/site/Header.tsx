import { motion } from "motion/react";
import { Phone, MessageCircle, ExternalLink, Car } from "lucide-react";
import { PHONE, SAHIBINDEN_STORE, whatsappLink } from "@/data/vehicles";

export function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 glass"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Car className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-extrabold leading-tight sm:text-base">
              Ferhat Çelik
            </span>
            <span className="block truncate text-[11px] uppercase tracking-[0.28em] text-primary">
              Otomotiv
            </span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${PHONE}`}
            aria-label="Telefon ile ara"
            className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2/60 text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={whatsappLink("Merhaba, araçlarınız hakkında bilgi almak istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile yaz"
            className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2/60 text-whatsapp transition-colors hover:border-whatsapp"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={SAHIBINDEN_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Sahibinden Mağaza
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}


