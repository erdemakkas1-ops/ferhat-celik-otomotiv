import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Car, LoaderCircle, LockKeyhole, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

import { formatKm, formatPrice } from "@/data/vehicles";
import { rowToVehicle, type CarRow, type NewCar } from "@/lib/cars";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Vitrin Yönetimi | Ferhat Çelik Otomotiv" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  const verifyAdmin = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession);
    if (!nextSession) {
      setAuthorized(false);
      setChecking(false);
      return;
    }
    const { data } = await supabase.from("admin_users").select("user_id").eq("user_id", nextSession.user.id).maybeSingle();
    setAuthorized(!!data);
    setChecking(false);
  }, []);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => verifyAdmin(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void verifyAdmin(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, [verifyAdmin]);

  if (checking) return <LoadingScreen />;
  if (!session || !authorized) return <LoginScreen unauthorized={!!session && !authorized} />;
  return <AdminDashboard />;
}

function LoadingScreen() {
  return (
    <main className="grid min-h-screen place-items-center bg-background">
      <LoaderCircle className="h-8 w-8 animate-spin text-primary" aria-label="Yükleniyor" />
    </main>
  );
}

function LoginScreen({ unauthorized }: { unauthorized: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(unauthorized ? "Bu hesap vitrin yöneticisi olarak yetkilendirilmemiş." : "");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [notice, setNotice] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("E-posta veya şifre hatalı.");
    setLoading(false);
  }

  async function resetPassword() {
    const normalizedEmail = email.trim();
    setError("");
    setNotice("");
    if (!normalizedEmail) {
      setError("Önce e-posta adresinizi yazın.");
      return;
    }
    setResetLoading(true);
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, { redirectTo });
    setResetLoading(false);
    if (resetError) {
      setError("Şifre sıfırlama e-postası gönderilemedi.");
      return;
    }
    setNotice("Eğer bu e-posta sistemde kayıtlıysa, Şifre yenileme bağlantısı e-posta adresinize gönderildi.");
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <form onSubmit={submit} className="glass relative w-full max-w-md rounded-3xl p-7 shadow-2xl sm:p-9">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground"><LockKeyhole /></span>
        <h1 className="mt-5 text-center text-2xl font-extrabold">Galerici Girişi</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Araç vitrinini yalnızca yetkili hesap yönetebilir.</p>
        <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-muted-foreground">E-posta
          <input required type="email" placeholder="E-posta adresiniz" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" className={inputClass} />
        </label>
        <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Şifre
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className={inputClass} />
        </label>
        {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
        {notice && <p role="status" className="mt-3 text-sm text-emerald-300">{notice}</p>}
        <button disabled={loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-extrabold text-primary-foreground disabled:opacity-50">
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />} Giriş Yap
        </button>
        <button type="button" disabled={resetLoading} onClick={() => void resetPassword()} className="mt-3 w-full text-center text-sm font-semibold text-primary hover:underline disabled:opacity-50">
          {resetLoading ? "Gönderiliyor..." : "Şifremi unuttum"}
        </button>
        <Link to="/" className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Vitrine dön</Link>
      </form>
    </main>
  );
}

function AdminDashboard() {
  const [cars, setCars] = useState<CarRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<CarRow | null>(null);
  const [message, setMessage] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    setMessage(error ? error.message : "");
    setCars(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  async function toggleSold(car: CarRow) {
    const { error } = await supabase.from("cars").update({ is_sold: !car.is_sold }).eq("id", car.id);
    if (error) setMessage(error.message); else void refresh();
  }

  async function removeCar(car: CarRow) {
    if (!window.confirm(`${car.title} tamamen silinsin mi?`)) return;
    const { error } = await supabase.from("cars").delete().eq("id", car.id);
    if (error) { setMessage(error.message); return; }
    const marker = "/storage/v1/object/public/car-images/";
    if (car.image_url.includes(marker)) {
      const path = decodeURIComponent(car.image_url.split(marker)[1] ?? "");
      if (path) await supabase.storage.from("car-images").remove([path]);
    }
    void refresh();
  }

  return (
    <main className="min-h-screen bg-background pb-16">
      <header className="border-b border-border bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground"><Car className="h-5 w-5" /></span><div><h1 className="font-extrabold">Vitrin Yönetimi</h1><p className="text-xs text-muted-foreground">Supabase CMS</p></div></div>
          <div className="flex gap-2"><Link to="/" className="rounded-xl border border-border px-3 py-2 text-sm hover:border-primary">Vitrini Gör</Link><button onClick={() => supabase.auth.signOut()} aria-label="Çıkış yap" className="grid h-10 w-10 place-items-center rounded-xl border border-border hover:border-red-500 hover:text-red-400"><LogOut className="h-4 w-4" /></button></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Güvenli yönetim alanı</p><h2 className="mt-2 text-3xl font-extrabold">Araçlar</h2><p className="mt-1 text-sm text-muted-foreground">{cars.length} kayıt · {cars.filter((car) => car.is_sold).length} satıldı</p></div><button onClick={() => { setEditingCar(null); setShowForm((v) => !v); }} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground"><Plus className="h-4 w-4" /> Yeni Araç</button></div>
        {message && <p role="alert" className="mt-4 rounded-xl border border-red-900/50 bg-red-950/40 p-3 text-sm text-red-300">{message}</p>}
        {(showForm || editingCar) && <CarForm car={editingCar} onCancel={() => { setShowForm(false); setEditingCar(null); }} onSaved={() => { setShowForm(false); setEditingCar(null); void refresh(); }} onError={setMessage} />}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
          {loading ? <p className="p-10 text-center text-muted-foreground">Yükleniyor...</p> : cars.map((car) => { const vehicle = rowToVehicle(car); return <div key={car.id} className="grid gap-4 border-b border-border p-4 last:border-0 md:grid-cols-[1fr_140px_120px_104px] md:items-center"><div className="flex min-w-0 items-center gap-4"><img src={car.image_url} alt="" className="h-20 w-28 shrink-0 rounded-xl object-cover" /><div className="min-w-0"><p className="truncate font-bold">{car.title}</p><p className="mt-1 text-xs text-muted-foreground">{car.year} · {formatKm(car.km)} · {car.fuel} · {car.transmission}</p></div></div><p className="font-bold text-primary">{formatPrice(vehicle.price)}</p><button onClick={() => toggleSold(car)} className={`rounded-full px-3 py-2 text-xs font-black ${car.is_sold ? "bg-red-950 text-red-300" : "bg-emerald-950 text-emerald-300"}`}>{car.is_sold ? "SATILDI" : "SATIŞTA"}</button><div className="flex gap-2"><button onClick={() => { setShowForm(false); setEditingCar(car); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center justify-center rounded-xl border border-border p-2.5 text-primary hover:border-primary hover:bg-primary/10" aria-label={`${car.title} aracını düzenle`} title="Düzenle"><Pencil className="h-4 w-4" /></button><button onClick={() => removeCar(car)} className="inline-flex items-center justify-center rounded-xl border border-red-900/60 p-2.5 text-red-400 hover:bg-red-950" aria-label={`${car.title} aracını sil`} title="Sil"><Trash2 className="h-4 w-4" /></button></div></div>; })}
        </div>
      </div>
    </main>
  );
}

const inputClass = "mt-1.5 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";

function CarForm({ car, onSaved, onCancel, onError }: { car: CarRow | null; onSaved: () => void; onCancel: () => void; onError: (message: string) => void }) {
  const editing = !!car;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: car?.title ?? "",
    year: String(car?.year ?? new Date().getFullYear()),
    km: car ? String(car.km) : "",
    fuel: car?.fuel ?? "Benzin",
    transmission: car?.transmission ?? "Otomatik",
    price: car ? String(car.price) : "",
    sahibindenUrl: car?.sahibinden_url ?? "",
    featured: car?.is_featured ?? false,
  });
  const [file, setFile] = useState<File | null>(null);
  const set = (key: string, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  async function uploadImage(selectedFile: File) {
    const extension = selectedFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;
    const upload = await supabase.storage.from("car-images").upload(path, selectedFile, { cacheControl: "3600", upsert: false });
    if (upload.error) throw upload.error;
    const { data } = supabase.storage.from("car-images").getPublicUrl(path);
    return { path, publicUrl: data.publicUrl };
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!editing && !file) { onError("Lütfen bir vitrin görseli seçin."); return; }
    setSaving(true); onError("");

    let uploadedPath = "";
    let imageUrl = car?.image_url ?? "";
    try {
      if (file) {
        const uploaded = await uploadImage(file);
        uploadedPath = uploaded.path;
        imageUrl = uploaded.publicUrl;
      }

      const payload = {
        title: form.title.trim(), year: Number(form.year), km: Number(form.km), fuel: form.fuel,
        transmission: form.transmission, price: Number(form.price.replace(/[^\d]/g, "")),
        image_url: imageUrl, sahibinden_url: form.sahibindenUrl.trim(), is_featured: form.featured,
      };

      const result = editing
        ? await supabase.from("cars").update(payload).eq("id", car.id)
        : await supabase.from("cars").insert({ ...payload, is_sold: false } as NewCar);

      if (result.error) throw result.error;

      if (editing && file && car.image_url !== imageUrl) {
        const marker = "/storage/v1/object/public/car-images/";
        if (car.image_url.includes(marker)) {
          const oldPath = decodeURIComponent(car.image_url.split(marker)[1] ?? "");
          if (oldPath) await supabase.storage.from("car-images").remove([oldPath]);
        }
      }
      setSaving(false); onSaved();
    } catch (error) {
      if (uploadedPath) await supabase.storage.from("car-images").remove([uploadedPath]);
      onError(error instanceof Error ? error.message : "İşlem tamamlanamadı.");
      setSaving(false);
    }
  }

  return <form onSubmit={submit} className="mt-7 rounded-2xl border border-primary/30 bg-surface p-5 sm:p-6">
    <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">{editing ? "Mevcut ilan" : "Yeni kayıt"}</p><h3 className="mt-1 text-xl font-extrabold">{editing ? "Aracı Düzenle" : "Yeni Araç"}</h3></div><button type="button" onClick={onCancel} className="grid h-10 w-10 place-items-center rounded-xl border border-border hover:border-primary" aria-label="Formu kapat"><X className="h-4 w-4" /></button></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="Araç Başlığı"><input required value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} /></Field><Field label="Yıl"><input required type="number" min="1950" max="2100" value={form.year} onChange={(e) => set("year", e.target.value)} className={inputClass} /></Field><Field label="KM"><input required type="number" min="0" value={form.km} onChange={(e) => set("km", e.target.value)} className={inputClass} /></Field><Field label="Fiyat"><input required inputMode="numeric" value={form.price} onChange={(e) => set("price", e.target.value)} className={inputClass} /></Field><Field label="Yakıt"><select value={form.fuel} onChange={(e) => set("fuel", e.target.value)} className={inputClass}>{["Benzin","Dizel","Hibrit","Elektrik","LPG"].map((x) => <option key={x}>{x}</option>)}</select></Field><Field label="Vites"><select value={form.transmission} onChange={(e) => set("transmission", e.target.value)} className={inputClass}>{["Otomatik","Manuel","Yarı Otomatik"].map((x) => <option key={x}>{x}</option>)}</select></Field><Field label={editing ? "Vitrin Görseli (isteğe bağlı)" : "Vitrin Görseli"}><input required={!editing} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className={inputClass} /></Field><Field label="Sahibinden İlan URL"><input required type="url" value={form.sahibindenUrl} onChange={(e) => set("sahibindenUrl", e.target.value)} className={inputClass} /></Field></div>
    {editing && <p className="mt-3 text-xs text-muted-foreground">Görseli değiştirmek istemiyorsanız dosya seçmeyin; mevcut görsel korunur.</p>}
    <label className="mt-5 flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-primary" /> Vitrinde Öne Çıkar</label>
    <div className="mt-6 flex flex-wrap gap-3"><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground disabled:opacity-50">{saving && <LoaderCircle className="h-4 w-4 animate-spin" />} {editing ? "Değişiklikleri Kaydet" : "Aracı Kaydet"}</button>{editing && <button type="button" onClick={onCancel} className="rounded-xl border border-border px-5 py-3 text-sm font-bold hover:border-primary">Vazgeç</button>}</div>
  </form>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}{children}</label>;
}
