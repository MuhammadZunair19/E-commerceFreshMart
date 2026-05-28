import { CheckCircle2, Circle, PackageCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Pending", icon: Circle },
  { label: "Confirmed", icon: CheckCircle2 },
  { label: "Packed", icon: PackageCheck },
  { label: "Out for Delivery", icon: Truck },
  { label: "Delivered", icon: CheckCircle2 }
];

export function OrderTimeline({ active = 2 }: { active?: number }) {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const done = index <= active;
        return (
          <div key={step.label} className={cn("rounded-lg border p-4", done ? "border-forest/15 bg-cream text-forest" : "border-forest/10 bg-white text-muted")}>
            <Icon className="h-5 w-5" />
            <p className="mt-3 text-sm font-black">{step.label}</p>
          </div>
        );
      })}
    </div>
  );
}
