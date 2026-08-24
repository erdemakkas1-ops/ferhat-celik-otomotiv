import { createServerFn } from "@tanstack/react-start";
import { vehicles as fallbackVehicles, type Vehicle } from "@/data/vehicles";

const SEARCH_URL =
  "https://www.sahibinden.com/vasita?query_text_mf=ferhat+%C3%A7elik&query_text=ferhat+%C3%A7elik";
const STORE_URL = "https://ferhatcelik.sahibinden.com/";
const CACHE_MS = 10 * 60 * 1000;

export type InventorySyncResult = {
  vehicles: Vehicle[];
  source: "live" | "fallback";
  syncedAt: string;
  message: string;
};

let cached: InventorySyncResult | undefined;
let cachedAt = 0;

function decodeHtml(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value: string) {
  return decodeHtml(value.replace(/<[^>]*>/g, " "));
}

function metadataFromTitle(title: string) {
  const upper = title.toLocaleUpperCase("tr-TR");
  const yearMatch = upper.match(/\b(19\d{2}|20\d{2})\b/);
  const kmMatch = upper.match(/\b(\d{1,3})\s*(?:BİN|BIN)\s*KM\b/) ??
    upper.match(/\b(\d{2,6})\s*KM\b/);
  const km = kmMatch
    ? upper.includes("BİN KM", kmMatch.index)
      ? Number(kmMatch[1]) * 1000
      : Number(kmMatch[1])
    : 0;
  const fuel: Vehicle["fuel"] = /DİZEL|DIZEL|BLUEHDI|MULTIJET|C200D/.test(upper)
    ? "Dizel"
    : /BENZİN|BENZIN/.test(upper)
      ? "Benzin"
      : /HİBRİT|HIBRIT/.test(upper)
        ? "Hibrit"
        : /ELEKTRİK|ELEKTRIK/.test(upper)
          ? "Elektrik"
          : "Belirtilmemiş";
  const transmission: Vehicle["transmission"] = /OTOMATİK|OTOMATIK/.test(upper)
    ? "Otomatik"
    : /MANUEL/.test(upper)
      ? "Manuel"
      : "Belirtilmemiş";
  return { year: yearMatch ? Number(yearMatch[1]) : 0, km, fuel, transmission };
}

function brandFromUrl(url: string) {
  const known = [
    ["mercedes-benz", "Mercedes-Benz"],
    ["renault", "Renault"],
    ["citroen", "Citroën"],
    ["skoda", "Skoda"],
    ["chery", "Chery"],
    ["peugeot", "Peugeot"],
    ["fiat", "Fiat"],
    ["opel", "Opel"],
  ] as const;
  return known.find(([slug]) => url.includes(`-${slug}-`))?.[1] ?? "Diğer";
}

function parseListings(html: string): Vehicle[] {
  const linkPattern =
    /href=["']([^"']*\/ilan\/vasita-[^"']+?-(\d+)\/detay)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const seen = new Set<number>();
  const vehicles: Vehicle[] = [];
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(html))) {
    const id = Number(match[2]);
    if (seen.has(id)) continue;

    const href = new URL(decodeHtml(match[1]), "https://www.sahibinden.com").href;
    const rowStart = html.lastIndexOf("<tr", match.index);
    const rowEnd = html.indexOf("</tr>", match.index);
    if (rowStart < 0 || rowEnd < 0) continue;
    const row = html.slice(rowStart, rowEnd + 5);

    if (!/ferhatcelik\.sahibinden\.com|FERHAT\s*ÇELİK/i.test(row)) continue;

    const titleAttr = row.match(/<a[^>]+href=["'][^"']*\/(?:ilan\/)?vasita-[^"']+?-(?:\d+)\/detay["'][^>]+title=["']([^"']+)["']/i);
    const anchorText = stripTags(match[3]);
    const title = decodeHtml(titleAttr?.[1] ?? anchorText);
    if (!title) continue;

    const priceText = stripTags(row).match(/([\d.]+)\s*TL/i)?.[1];
    const price = priceText ? Number(priceText.replace(/\./g, "")) : 0;
    const imageMatch = row.match(/(?:data-src|src)=["'](https?:\/\/i\d+\.shbdn\.com\/photos\/[^"']+)["']/i);
    const image = imageMatch?.[1] ?? "";
    if (!price || !image) continue;

    const meta = metadataFromTitle(title);
    seen.add(id);
    vehicles.push({
      id,
      title,
      brand: brandFromUrl(href),
      model: title.slice(0, 80),
      ...meta,
      price,
      image,
      sahibindenUrl: href,
    });
  }

  return vehicles;
}

export const getSahibindenInventory = createServerFn({ method: "GET" }).handler(
  async (): Promise<InventorySyncResult> => {
    const now = Date.now();
    if (cached && now - cachedAt < CACHE_MS) return cached;

    try {
      const response = await fetch(SEARCH_URL, {
        headers: {
          "accept-language": "tr-TR,tr;q=0.9,en;q=0.7",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/136 Safari/537.36",
        },
      });
      if (!response.ok) throw new Error(`Sahibinden HTTP ${response.status}`);
      const html = await response.text();
      const vehicles = parseListings(html);
      if (!vehicles.length) throw new Error("İlan listesi okunamadı");

      cached = {
        vehicles,
        source: "live",
        syncedAt: new Date().toISOString(),
        message: `${vehicles.length} ilan Sahibinden mağazasından otomatik alındı.`,
      };
    } catch (error) {
      cached = {
        vehicles: fallbackVehicles,
        source: "fallback",
        syncedAt: new Date().toISOString(),
        message:
          error instanceof Error
            ? `Canlı senkronizasyon geçici olarak kullanılamıyor: ${error.message}`
            : "Canlı senkronizasyon geçici olarak kullanılamıyor.",
      };
    }

    cachedAt = now;
    return cached;
  },
);

export { SEARCH_URL, STORE_URL };


