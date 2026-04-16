import { Car, Radio, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { surfaceCardClassName } from "../lib/ui";

interface LoadingScreenProps {
  overlay?: boolean;
  title?: string;
  subtitle?: string;
}

export function LoadingScreen({
  overlay = false,
  title = "Going online...",
  subtitle = "Finding nearby rides and syncing your live availability.",
}: LoadingScreenProps) {
  return (
    <div
      aria-live="polite"
      className={
        overlay
          ? "fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/35 px-6 backdrop-blur-xl"
          : "flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6"
      }
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`w-full max-w-sm p-6 ${surfaceCardClassName}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-[22px] bg-slate-950 p-4 text-white shadow-[0_22px_45px_-28px_rgba(15,23,42,0.8)]">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-sky-300/30 border-t-sky-400"
              />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Car className="size-7" />
              </motion.div>
            </div>
          </div>
          <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Live request scan
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
        </div>

        <div className="mt-6 space-y-3">
          {[
            { icon: Radio, label: "Checking nearby rider demand" },
            { icon: Sparkles, label: "Optimizing your SURG suggestions" },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50/80 px-4 py-3"
              >
                <div className="rounded-full bg-white p-2 text-sky-700 shadow-sm">
                  <Icon className="size-4" />
                </div>
                <p className="text-sm font-medium text-slate-700">{item.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              animate={{ x: ["-35%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/3 rounded-full bg-[linear-gradient(90deg,#0f172a_0%,#2563eb_55%,#38bdf8_100%)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
