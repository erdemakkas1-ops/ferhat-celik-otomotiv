import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import {
  PHONE,
  PHONE_DISPLAY,
  SAHIBINDEN_STORE,
  whatsappLink,
} from "@/data/vehicles";
import { getCars } from "@/lib/cars";
import { Header } from "@/components/site/Header";
import { MobileBar } from "@/components/site/MobileBar";
import { VehicleCard } from "@/components/site/VehicleCard";
import { ShowroomFleetDemo } from "@/components/ShowroomFleetDemo";
import { CinematicIntro } from "@/components/site/CinematicIntro";


const SITE_URL =
  import.meta.env["VITE_SITE_URL"] ?? "https://ferhat-celik-otomotiv.vercel.app";

export const Route = createFileRoute("/")({
  loader: () => getCars(),
  head: () => ({
    meta: [
      { title: "Ferhat Çelik Otomotiv | Premium İkinci El Araç Galerisi" },
      {
        name: "description",
        content:
          "Ferhat Çelik Otomotiv güncel ikinci el araç vitrini, Sahibinden kurumsal mağaza ilanları ve doğrudan iletişim bilgileri.",
      },
      { name: "theme-color", content: "#0B0F17" },
      { property: "og:title", content: "Ferhat Çelik Otomotiv | Premium Araç Galerisi" },
      {
        property: "og:description",
        content:
          "Güncel ikinci el araçları inceleyin ve Ferhat Çelik Otomotiv ile doğrudan iletişime geçin.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ferhat Çelik Otomotiv | Premium Araç Galerisi" },
      {
        name: "twitter:description",
        content:
          "Güncel ikinci el araçları inceleyin ve Ferhat Çelik Otomotiv ile doğrudan iletişime geçin.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          name: "Ferhat Çelik Otomotiv",
          url: SITE_URL,
          description: "Güncel ikinci el araç vitrini ve doğrudan iletişim kanalları.",
          priceRange: "₺₺₺",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const vehicleList = Route.useLoaderData();
  const featuredVehicles = vehicleList.filter((vehicle) => vehicle.featured && !vehicle.sold);
  const collectionVehicles = featuredVehicles.length > 0 ? featuredVehicles : vehicleList.filter((vehicle) => !vehicle.sold).slice(0, 5);
  const collectionIds = new Set(collectionVehicles.map((vehicle) => vehicle.id));
  const remainingVehicles = vehicleList.filter((vehicle) => !collectionIds.has(vehicle.id));

  return (
    <div id="top" className="min-h-screen bg-background">
      <CinematicIntro />
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        İçeriğe geç
      </a>
      <Header />
      <MobileBar />

      <main id="icerik" tabIndex={-1}>
      {/* HERO */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Ferhat Çelik Otomotiv showroom"
            width={1920}
            height={1088}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 mesh-bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            Güncel Araçlar · Doğrudan İletişim
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-6xl"
          >
            Hayalinizdeki aracı{" "}
            <span className="text-gradient-gold">Ferhat Çelik Otomotiv</span> ile alın.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Galerimizi tanıyın, güncel araçlarımızı inceleyin ve bize doğrudan ulaşın.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-7"
          >
            <a
              href={SAHIBINDEN_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Sahibinden.com Kurumsal Mağaza
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

        </div>
      </section>

      <ShowroomFleetDemo vehicles={collectionVehicles} />

      {/* GRID */}
      <section
        id="araclar"
        aria-labelledby="araclar-baslik"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 id="araclar-baslik" className="text-2xl font-extrabold sm:text-4xl">
              Diğer Galeri Araçları
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Güncel vitrin araçları Ferhat Çelik Otomotiv tarafından yönetilir.
            </p>
            <a
              href={SAHIBINDEN_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              Tüm ilanları Sahibinden'de gör
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <span className="shrink-0 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-bold text-primary">
            {remainingVehicles.length} araç
          </span>
        </div>

        {remainingVehicles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center sm:p-14">
            <h3 className="text-lg font-bold">Tüm araçlar seçkin koleksiyonda</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Öne çıkan araçlarımızı yukarıdaki koleksiyondan inceleyebilirsiniz.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {remainingVehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        )}
      </section>

      <section id="hakkimizda" className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Hakkımızda</p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-4xl">Ferhat Çelik Otomotiv</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Galerimizi bu sayfadan tanıyabilir, Sahibinden'de yayınlanan güncel
            araçlarımızı inceleyebilir ve iletişim kanallarımızdan bize ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="iletisim" className="border-t border-border bg-surface/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="absolute inset-0 mesh-bg opacity-70" />
            <div className="relative flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <MapPin className="h-10 w-10 text-primary" />
              <p className="font-display text-lg font-bold">Ferhat Çelik Otomotiv</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Açık adres ve yol tarifi bilgisi teslim öncesinde galeri sahibi tarafından doğrulanacaktır.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold sm:text-3xl">İletişim</h2>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <a href={`tel:${PHONE}`} className="font-bold hover:text-primary">
                    {PHONE_DISPLAY}
                  </a>
                  <br />
                  <span className="text-muted-foreground">Telefon &amp; WhatsApp</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  Pazartesi - Cumartesi: 09:00 - 20:00
                  <br />
                  Pazar: 11:00 - 18:00
                </span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={whatsappLink("Merhaba, araç almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-bold text-whatsapp-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 pb-[calc(env(safe-area-inset-bottom)+7rem)] text-center text-xs text-muted-foreground sm:px-6 sm:pb-8">
          <p>© {new Date().getFullYear()} Ferhat Çelik Otomotiv · Tüm hakları saklıdır.</p>
          <nav aria-label="Yasal bağlantılar" className="mt-3 flex justify-center gap-4">
            <Link to="/kvkk" className="hover:text-primary hover:underline">KVKK Aydınlatma Metni</Link>
            <Link to="/cerez-politikasi" className="hover:text-primary hover:underline">Çerez Politikası</Link>
          </nav>
        </div>

      </footer>
    </div>
  );
}

