export type Vehicle = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: "Benzin" | "Dizel" | "Hibrit" | "Elektrik" | "LPG";
  transmission: "Otomatik" | "Manuel" | "Yarı Otomatik";
  price: number;
  image: string;
  sahibindenUrl: string;
  sold: boolean;
  featured: boolean;
  createdAt: string;
};

export const SAHIBINDEN_STORE = "https://ferhatcelik.sahibinden.com/";
export const PHONE = "+905325290249";
export const PHONE_DISPLAY = "0532 529 02 49";
export const WHATSAPP = "905325290249";

export const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(value)} ₺`;

export const formatKm = (value: number) =>
  `${new Intl.NumberFormat("tr-TR").format(value)} km`;

export const highResolutionVehicleImage = (url: string) =>
  url.replace(/\/lthmb_/, "/x5_").replace(/\/thmb_/, "/x5_");

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
