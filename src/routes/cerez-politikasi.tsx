import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cerez-politikasi")({
  head: () => ({
    meta: [
      { title: "Çerez Politikası | Ferhat Çelik Otomotiv" },
      { name: "description", content: "Ferhat Çelik Otomotiv internet sitesi çerez politikası." },
    ],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <LegalPage title="Çerez Politikası" updatedAt="24 Ağustos 2026">
      <section>
        <h2 className="text-xl font-extrabold text-foreground">Çerez kullanımı</h2>
        <p className="mt-2">
          Bu internet sitesi reklam, kişiselleştirme veya ziyaretçi analizi amacıyla
          çerez kullanmaz. Site, çerez bildiriminin tekrar gösterilmemesi için
          tarayıcınızın yerel depolama alanında aşağıdaki zorunlu tercih kaydını tutar.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-extrabold text-foreground">Kullanılan kayıt</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-surface-2 text-foreground"><tr><th className="p-4">Ad</th><th className="p-4">Tür</th><th className="p-4">Amaç</th><th className="p-4">Süre</th></tr></thead>
            <tbody><tr className="border-t border-border"><td className="p-4 font-mono text-xs">fco.cookie-notice.v1</td><td className="p-4">Birinci taraf localStorage</td><td className="p-4">Çerez bildiriminin görüldüğünü hatırlamak</td><td className="p-4">Silinene kadar</td></tr></tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-extrabold text-foreground">Üçüncü taraf hizmetleri</h2>
        <p className="mt-2">
          Araç ilanı görselleri Sahibinden altyapısından, yazı tipleri Google Fonts
          hizmetinden yüklenebilir. Sahibinden mağazası, WhatsApp veya
          sosyal medya bağlantılarına tıkladığınızda ilgili hizmetlerin kendi çerez ve
          gizlilik politikaları geçerli olur.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-extrabold text-foreground">Kaydı silme</h2>
        <p className="mt-2">
          Tarayıcı ayarlarınızdan site verilerini temizleyerek zorunlu tercih kaydını
          silebilirsiniz. Kayıt silindiğinde bildirim sonraki ziyaretinizde yeniden görünür.
        </p>
      </section>
    </LegalPage>
  );
}

