import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type CardItem = {
  id: string;
  title: string;
  image: string;
  eyebrow?: string;
  content: ReactNode;
};

type ExpandingCardsProps = {
  items: CardItem[];
  className?: string;
};

export function ExpandingCards({ items, className }: ExpandingCardsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <div className={cn("flex h-[34rem] flex-col gap-3 md:h-[31rem] md:flex-row", className)}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <motion.article
            key={item.id}
            tabIndex={0}
            role="button"
            aria-expanded={active}
            onMouseEnter={() => setActiveId(item.id)}
            onFocus={() => setActiveId(item.id)}
            onClick={() => setActiveId(item.id)}
            animate={{ flex: active ? 5 : 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              width="1280"
              height="720"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/car-placeholder.svg";
              }}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                active ? "scale-100 grayscale-0" : "scale-105 grayscale",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className={cn("absolute inset-0 transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                {item.eyebrow && <p className="mb-2 text-xs font-black uppercase tracking-[.25em] text-lime-300">{item.eyebrow}</p>}
                <h3 className="text-2xl font-black text-white sm:text-3xl">{item.title}</h3>
                <div className="mt-4">{item.content}</div>
              </div>
            </div>
            <p
              aria-hidden="true"
              className={cn(
                "absolute whitespace-nowrap font-black uppercase tracking-[.16em] text-white/80 transition-opacity duration-300",
                "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:-rotate-90",
                active ? "pointer-events-none opacity-0" : "opacity-100",
              )}
            >
              {item.title}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
