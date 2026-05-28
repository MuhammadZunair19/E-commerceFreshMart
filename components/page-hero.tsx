import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  action,
  className
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-forest/10 bg-white", className)}>
      <div className="container-x flex flex-col gap-5 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-black text-forest md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-muted">{description}</p>
        </div>
        {action}
      </div>
    </section>
  );
}
