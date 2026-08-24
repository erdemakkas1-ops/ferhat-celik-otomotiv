export type Vehicle = {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: "Benzin" | "Dizel" | "Hibrit" | "Elektrik" | "Belirtilmemiş";
  transmission: "Otomatik" | "Manuel" | "Belirtilmemiş";
  price: number;
  image: string;
  badge?: "Fırsat Araç" | "Yeni Gelen";
  sahibindenUrl: string;
  sold?: boolean;
  featured?: boolean;
};

export const SAHIBINDEN_STORE = "https://ferhatcelik.sahibinden.com/";
export const PHONE = "+905321234567";
export const PHONE_DISPLAY = "0532 123 45 67";
export const WHATSAPP = "905321234567";

export const vehicles: Vehicle[] = [
  { id: 1329736465, title: "GRANDLAND 1.2 GS 46 BİN KM HATASIZ HAYALET EKRAN + KOLTUK ISITMA", brand: "Opel", model: "Grandland 1.2 T GS", year: 2023, km: 47000, fuel: "Benzin", transmission: "Otomatik", price: 1699000, image: "https://i0.shbdn.com/photos/73/64/65/lthmb_1329736465ycx.avif", badge: "Yeni Gelen", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-arazi-suv-pickup-opel-grandland-1.2-gs-46-bin-km-hatasiz-hayalet-ekran-pluskoltuk-istma-1329736465/detay" },
  { id: 1330385793, title: "2012 SKODA OCTAVIA | ELEGANCE | 1.6 TDI | OTOMATİK | 275.000 KM", brand: "Skoda", model: "Octavia 1.6 TDI Elegance", year: 2012, km: 275000, fuel: "Dizel", transmission: "Otomatik", price: 775000, image: "https://i0.shbdn.com/photos/38/57/93/lthmb_1330385793cvm.avif", badge: "Yeni Gelen", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-otomobil-skoda-2012-skoda-octavia-elegance-1.6-tdi-otomatik-275.000-km-1330385793/detay" },
  { id: 1334802232, title: "100 BİN PEŞİN KALANI 36 AY VADE & SENET İMKANI İLK SAHİBİNDEN", brand: "Opel", model: "Corsa 1.2 Twinport Essentia", year: 2007, km: 152000, fuel: "Benzin", transmission: "Manuel", price: 420000, image: "https://i0.shbdn.com/photos/80/22/32/lthmb_1334802232z61.jpg", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-otomobil-opel-100-bin-pesin-kalani-36-ay-vade-senet-imkani-ilk-sahibindn-1334802232/detay" },
  { id: 1334729329, title: "HATASIZ / BOYASIZ 2018 MERCEDES C200d 139 BİN KM", brand: "Mercedes-Benz", model: "C200d", year: 2018, km: 139000, fuel: "Dizel", transmission: "Belirtilmemiş", price: 2069000, image: "https://i0.shbdn.com/photos/72/93/29/lthmb_1334729329ai9.jpg", badge: "Yeni Gelen", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-otomobil-mercedes-benz-hatasiz-boyasiz-2018-mercedes-c200d-139bin-km-1334729329/detay" },
  { id: 1328738186, title: "2021 RENAULT MEGANE 1.5 DİZEL OTOMATİK | TRAMERSİZ | EKSTRALI", brand: "Renault", model: "Megane 1.5 Blue DCI Joy", year: 2021, km: 155000, fuel: "Dizel", transmission: "Otomatik", price: 1249000, image: "https://i0.shbdn.com/photos/73/81/86/lthmb_1328738186cvg.jpg", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-otomobil-renault-2021-renault-megane-1.5-dizel-otomatik-tramersiz-ekstrali-1328738186/detay" },
  { id: 1308479627, title: "2024 C4 X 1.2 PURETECH FEEL BOLD + G.GÖRÜŞ + HAYALET + F1 + CARPLAY", brand: "Citroën", model: "C4 X 1.2 PureTech Feel Bold", year: 2024, km: 49000, fuel: "Benzin", transmission: "Otomatik", price: 1385000, image: "https://i0.shbdn.com/photos/47/96/27/lthmb_13084796279ho.jpg", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-otomobil-citroen-2024-c4-x-1.2-puretech-feel-bold-plusg.gorus-plushayalet-plusf1-pluscar-play-1308479627/detay" },
  { id: 1316753206, title: "SKODA SUPERB 1.5 TSI PRESTİGE CAM TAVAN + HAYALET + FULL", brand: "Skoda", model: "Superb 1.5 TSI Prestige", year: 2021, km: 127000, fuel: "Benzin", transmission: "Otomatik", price: 2195000, image: "https://i0.shbdn.com/photos/75/32/06/lthmb_13167532062po.jpg", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-otomobil-skoda-skoda-superb-1.5-tsi-prestige-camtvn-plushayalet-plusful-1316753206/detay" },
  { id: 1334133262, title: "2024 CHERY 1.6 LUXURY PAKET 36 BİN KM HATASIZ DEĞİŞENSİZ", brand: "Chery", model: "Luxury", year: 2024, km: 36000, fuel: "Belirtilmemiş", transmission: "Belirtilmemiş", price: 1665000, image: "https://i0.shbdn.com/photos/13/32/62/lthmb_1334133262a78.jpg", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-arazi-suv-pickup-chery-2024-chery-1.6-luxury-paket-36-bin-km-hatasiz-degisensiz-1334133262/detay" },
  { id: 1333938267, title: "2021 PEUGEOT 508 1.5 BlueHDi ALLURE K.ISITMA HAYALET 100 BİN KM", brand: "Peugeot", model: "508 1.5 BlueHDi Allure", year: 2021, km: 103000, fuel: "Dizel", transmission: "Otomatik", price: 1673000, image: "https://i0.shbdn.com/photos/93/82/67/lthmb_1333938267whb.jpg", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-otomobil-peugeot-2021-model-508-1.5-bluehdi-allure-k.isitma-hayalet-100-bin-km-1333938267/detay" },
  { id: 1318161756, title: "2022 FİAT EGEA 1.3 MULTİJET EASY HATASIZ DEĞİŞENSİZ BAKIMLI", brand: "Fiat", model: "Egea 1.3 Multijet Easy", year: 2022, km: 135000, fuel: "Dizel", transmission: "Manuel", price: 859000, image: "https://i0.shbdn.com/photos/16/17/56/lthmb_1318161756ony.jpg", sahibindenUrl: "https://www.sahibinden.com/ilan/vasita-otomobil-fiat-2022-fiat-egea-1.3-multijet-easy-hatasiz-degisensiz-bakimli-1318161756/detay" },
];

export const formatPrice = (v: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(v) + " ₺";

export const formatKm = (v: number) =>
  new Intl.NumberFormat("tr-TR").format(v) + " km";

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

