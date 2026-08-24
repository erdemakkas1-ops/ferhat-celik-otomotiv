import { Link } from "@tanstack/react-router";
import { ArrowLeft, Car } from "lucide-react";
import type { ReactNode } from "react";

export function LegalPage({ title, updatedAt, children }: { title: string; updatedAt: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 font-display font-extrabold">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Car className="h-5 w-5" aria-hidden="true" />
            </span>
            Ferhat Çelik Otomotiv
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ana sayfa
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Yasal Bilgilendirme</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Son güncelleme: {updatedAt}</p>
        <article className="legal-content mt-10 space-y-8 text-sm leading-7 text-muted-foreground sm:text-base">
          {children}
        </article>
      </main>
    </div>
  );
}

