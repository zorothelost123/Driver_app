import { Sunrise, Sunset } from "lucide-react";
import { ShiftPlanningMode } from "../lib/demo-data";
import { cn } from "./ui/utils";

interface ShiftPlanningToggleProps {
  value: ShiftPlanningMode;
  onChange: (value: ShiftPlanningMode) => void;
  className?: string;
}

const shiftOptions: Array<{
  id: ShiftPlanningMode;
  label: string;
  icon: typeof Sunrise;
}> = [
  {
    id: "morning",
    label: "Morning peak",
    icon: Sunrise,
  },
  {
    id: "evening",
    label: "Evening peak",
    icon: Sunset,
  },
];

export function ShiftPlanningToggle({
  value,
  onChange,
  className,
}: ShiftPlanningToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm",
        className,
      )}
    >
      {shiftOptions.map((option) => {
        const Icon = option.icon;
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon className="size-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
