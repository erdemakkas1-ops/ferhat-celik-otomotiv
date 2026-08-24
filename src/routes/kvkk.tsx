import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/kvkk")({
  head: () => ({
    meta: [
      { title: "KVKK Aydınlatma Metni | Ferhat Çelik Otomotiv" },
      { name: "description", content: "Ferhat Çelik Otomotiv kişisel verilerin korunması aydınlatma metni." },
    ],
  }),
  component: KvkkPage,
});

function KvkkPage() {
  return (
    <LegalPage title="KVKK Aydınlatma Metni" updatedAt="24 Ağustos 2026">
      <Section title="1. Veri sorumlusu">
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri
          sorumlusu Ferhat Çelik Otomotiv’dir. Başvurularınızı internet sitesinin
          iletişim bölümünde yer alan telefon ve WhatsApp kanalları üzerinden
          iletebilirsiniz.
        </p>
      </Section>
      <Section title="2. İşlenen kişisel veriler">
        <p>
          Siteyi yalnızca ziyaret ettiğinizde sunucu erişim kayıtlarında IP adresi,
          istek zamanı, tarayıcı ve cihaz bilgisi gibi teknik veriler işlenebilir.
          Telefon veya WhatsApp üzerinden bizimle iletişime geçtiğinizde ad, telefon
          numarası, mesaj içeriği ve paylaşmayı tercih ettiğiniz araç talebi bilgileri
          işlenebilir. Site üzerinde üyelik veya iletişim formu bulunmamaktadır.
        </p>
      </Section>
      <Section title="3. İşleme amaçları ve hukuki sebepler">
        <p>
          Teknik kayıtlar sitenin güvenli ve kesintisiz işletilmesi, hataların tespiti
          ve kötüye kullanımın önlenmesi amacıyla; KVKK’nın 5/2-f maddesindeki meşru
          menfaat hukuki sebebine dayanılarak işlenebilir. İletişim verileri taleplerin
          yanıtlanması, araçlar hakkında bilgi verilmesi ve talep hâlinde sözleşme
          öncesi süreçlerin yürütülmesi amacıyla KVKK’nın 5/2-c ve 5/2-f maddelerine
          dayanılarak işlenebilir.
        </p>
      </Section>
      <Section title="4. Aktarım ve hizmet sağlayıcılar">
        <p>
          Teknik veriler, internet sitesinin barındırılması ve güvenliğinin sağlanması
          için altyapı sağlayıcısı Vercel tarafından işlenebilir. Sahibinden ilan
          görselleri, Google yazı tipi hizmeti ve harita/iletişim bağlantıları açıldığında
          ilgili üçüncü taraflar kendi politikaları kapsamında teknik veri işleyebilir.
          İletişim için WhatsApp kullanmanız hâlinde verileriniz WhatsApp hizmetine de
          aktarılır. Kanunen yetkili kamu kurumlarıyla yalnız hukuki yükümlülük doğduğunda
          paylaşım yapılabilir.
        </p>
      </Section>
      <Section title="5. Toplama yöntemi ve saklama">
        <p>
          Veriler otomatik yollarla sunucu kayıtları ve cihazınızdaki zorunlu tercih
          kaydı üzerinden; iletişim kurmanız hâlinde ise telefon veya WhatsApp üzerinden
          toplanır. Veriler, işleme amacı ve ilgili mevzuatın gerektirdiği süre boyunca
          saklanır; amaç ortadan kalktığında silinir, yok edilir veya anonim hâle getirilir.
        </p>
      </Section>
      <Section title="6. KVKK kapsamındaki haklarınız">
        <p>
          KVKK’nın 11. maddesi kapsamında kişisel verilerinizin işlenip işlenmediğini
          öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını
          öğrenme, aktarılan üçüncü kişileri bilme, eksik veya yanlış verilerin
          düzeltilmesini ya da şartları oluşmuşsa silinmesini isteme, otomatik analiz
          sonucuna itiraz etme ve hukuka aykırı işleme nedeniyle zararın giderilmesini
          talep etme haklarına sahipsiniz. Başvurularınızı kimliğinizi doğrulamaya
          elverişli bilgilerle iletişim kanallarımız üzerinden iletebilirsiniz.
        </p>
      </Section>
    </LegalPage>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="text-xl font-extrabold text-foreground">{title}</h2><div className="mt-2">{children}</div></section>;
}

