import { motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";
import { PHONE, whatsappLink } from "@/data/vehicles";

export function MobileBar() {
  return (
    <motion.nav
      aria-label="Hızlı iletişim"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 glass px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 sm:hidden"
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${PHONE}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Hemen Ara
        </a>
        <a
          href={whatsappLink("Merhaba, araçlarınız hakkında bilgi almak istiyorum.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-bold text-whatsapp-foreground"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </motion.nav>
  );
}


