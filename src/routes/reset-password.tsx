import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, LoaderCircle, LockKeyhole } from "lucide-react";

import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Şifre Yenile | Ferhat Çelik Otomotiv" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setReady(!!data.session);
      if (!data.session) setError("Şifre yenileme bağlantısı geçersiz veya süresi dolmuş olabilir.");
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY" || session) {
        setReady(!!session);
        if (session) setError("");
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Yeni şifre en az 8 karakter olmalı.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Şifreler birbiriyle eşleşmiyor.");
      return;
    }

    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (updateError) {
      setError(updateError.message || "Şifre güncellenemedi.");
      return;
    }

    setSuccess(true);
    window.setTimeout(() => {
      void navigate({ to: "/admin" });
    }, 1200);
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="glass relative w-full max-w-md rounded-3xl p-7 shadow-2xl sm:p-9">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
          {success ? <CheckCircle2 /> : <LockKeyhole />}
        </span>
        <h1 className="mt-5 text-center text-2xl font-extrabold">Yeni Şifre Belirle</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Galerici hesabınız için yeni bir şifre oluşturun.</p>

        {success ? (
          <p className="mt-6 rounded-xl border border-emerald-900/50 bg-emerald-950/40 p-4 text-center text-sm text-emerald-300">
            Şifreniz güncellendi. Yönetim paneline yönlendiriliyorsunuz...
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Yeni Şifre
              <input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" className={inputClass} />
            </label>
            <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Yeni Şifre Tekrar
              <input required minLength={8} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" className={inputClass} />
            </label>
            {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
            <button disabled={!ready || saving} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-extrabold text-primary-foreground disabled:opacity-50">
              {saving && <LoaderCircle className="h-4 w-4 animate-spin" />} Şifreyi Güncelle
            </button>
          </form>
        )}

        <Link to="/admin" className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Galerici girişine dön
        </Link>
      </div>
    </main>
  );
}

const inputClass = "mt-1.5 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";
