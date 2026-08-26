import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type BorderBeamProps = {
  className?: string;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
};

export function BorderBeam({
  className,
  duration = 7,
  borderWidth = 1.5,
  colorFrom = "#a3e635",
  colorTo = "#22c55e",
}: BorderBeamProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -inset-[55%] z-20 rounded-[inherit]",
        className,
      )}
      style={{
        padding: borderWidth,
        background: `conic-gradient(from 0deg, transparent 0deg, transparent 250deg, ${colorFrom} 292deg, ${colorTo} 322deg, transparent 352deg)`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        filter: `drop-shadow(0 0 10px ${colorFrom}80)`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    />
  );
}
