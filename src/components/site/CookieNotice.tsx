import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fco.cookie-notice.v1";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(STORAGE_KEY) !== "seen");
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Çerez bildirimi"
      className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-[70] mx-auto max-w-3xl rounded-2xl border border-border bg-surface/95 p-4 shadow-2xl backdrop-blur sm:bottom-5 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted-foreground">
          Bu site analiz veya reklam çerezi kullanmaz. Yalnızca bu bildirimi gördüğünüzü
          hatırlamak için cihazınızda zorunlu bir tercih kaydı tutulur. Ayrıntılar için{" "}
          <Link to="/cerez-politikasi" className="font-bold text-primary hover:underline">
            Çerez Politikası
          </Link>
          'nı inceleyebilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, "seen");
            setVisible(false);
          }}
          className="min-h-11 shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Anladım
        </button>
      </div>
    </aside>
  );
}

