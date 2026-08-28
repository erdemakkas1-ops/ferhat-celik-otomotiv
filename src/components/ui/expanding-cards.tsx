import { useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type CardItem = {
  id: string;
  title: string;
  image: string;
  eyebrow?: string;
  content?: ReactNode;
};

type ExpandingCardsProps = {
  items: CardItem[];
  className?: string;
  initialActiveId?: string;
  renderContent?: (item: CardItem, active: boolean) => ReactNode;
};

export function ExpandingCards({
  items,
  className,
  initialActiveId,
  renderContent,
}: ExpandingCardsProps) {
  const [activeId, setActiveId] = useState(initialActiveId ?? items[0]?.id ?? "");

  function handleKeyDown(event: KeyboardEvent<HTMLElement>, index: number) {
    if (!items.length || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + direction + items.length) % items.length;
    setActiveId(items[nextIndex]?.id ?? activeId);
  }

  return (
    <div
      className={cn(
        "flex min-h-[650px] flex-col gap-3 lg:h-[650px] lg:min-h-0 lg:flex-row",
        className,
      )}
    >
      {items.map((item, index) => {
        const active = item.id === activeId;
        return (
          <article
            key={item.id}
            tabIndex={0}
            aria-expanded={active}
            onMouseEnter={() => setActiveId(item.id)}
            onFocus={() => setActiveId(item.id)}
            onClick={() => setActiveId(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "group relative isolate min-h-32 cursor-pointer overflow-hidden rounded-[1.5rem] border bg-zinc-950 outline-none transition-[flex-grow,min-height,border-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:ring-2 focus-visible:ring-lime-300",
              active
                ? "min-h-[460px] flex-[5] border-lime-300/40 lg:min-h-0"
                : "flex-1 border-white/10 hover:border-white/25 lg:min-h-0",
            )}
          >
            <img
              src={item.image}
              alt={item.title}
              width={1500}
              height={1000}
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition duration-700",
                active ? "scale-100 grayscale-0" : "scale-105 grayscale",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-black/10 transition group-hover:bg-transparent" />

            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 transition-all duration-500",
                active ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
              )}
            >
              {renderContent ? renderContent(item, active) : item.content}
            </div>

            <div
              aria-hidden={active}
              className={cn(
                "absolute inset-0 z-10 hidden items-center justify-center transition-opacity duration-300 lg:flex",
                active ? "pointer-events-none opacity-0" : "opacity-100",
              )}
            >
              <span className="whitespace-nowrap text-sm font-black uppercase tracking-[0.25em] text-white [writing-mode:vertical-rl] [transform:rotate(180deg)]">
                {item.title}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
