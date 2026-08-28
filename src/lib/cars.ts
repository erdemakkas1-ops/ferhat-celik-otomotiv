import { supabase } from "@/lib/supabase";
import type { Vehicle } from "@/data/vehicles";
import type { Database } from "@/types/database";

export type CarRow = Database["public"]["Tables"]["cars"]["Row"];
export type NewCar = Database["public"]["Tables"]["cars"]["Insert"];

export function rowToVehicle(row: CarRow): Vehicle {
  const [brand = "Diğer", ...modelParts] = row.title.trim().split(/\s+/);
  return {
    id: row.id, title: row.title, brand, model: modelParts.join(" "), year: row.year,
    km: row.km, fuel: row.fuel as Vehicle["fuel"],
    transmission: row.transmission as Vehicle["transmission"], price: Number(row.price),
    image: row.image_url, sahibindenUrl: row.sahibinden_url, featured: row.is_featured,
    sold: row.is_sold, createdAt: row.created_at,
  };
}

export async function getCars(): Promise<Vehicle[]> {
  const { data, error } = await supabase.from("cars").select("*")
    .order("is_sold", { ascending: true }).order("created_at", { ascending: false });
  if (error) throw new Error(`Araçlar alınamadı: ${error.message}`);
  return (data ?? []).map(rowToVehicle);
}
