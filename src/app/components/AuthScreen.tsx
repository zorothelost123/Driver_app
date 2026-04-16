import { ArrowRight, ShieldCheck, Smartphone, Star } from "lucide-react";
import { motion } from "motion/react";
import { useDemoAppContext } from "../context/DemoAppContext";
import { demoDrivers } from "../lib/demo-data";
import { formatCurrency } from "../lib/formatters";
import {
  brandGradientClassName,
  softCardClassName,
  surfaceCardClassName,
} from "../lib/ui";

export function AuthScreen() {
  const { activeDriverId, signInAsDriver } = useDemoAppContext();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] px-4 py-8 text-white lg:px-8 lg:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_38%),linear-gradient(180deg,#0f172a_0%,#111827_42%,#172554_100%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-between lg:max-w-6xl">
        <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[30px] p-6 shadow-[0_28px_80px_-40px_rgba(14,165,233,0.6)] lg:p-8 ${brandGradientClassName}`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                Demo mode
              </div>
              <div className="rounded-full bg-white/12 p-2">
                <ShieldCheck className="size-5 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-white lg:max-w-[14ch] lg:text-[44px]">
              Drive smarter with SURG guidance built in.
            </h1>
            <p className="mt-3 max-w-[26ch] text-sm leading-6 text-white/80 lg:max-w-[34ch] lg:text-base">
              Choose a demo driver profile and continue into the mobile driver
              assistant experience.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-10">
              <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Wallet
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {formatCurrency(1245)}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Ready
                </p>
                <p className="mt-2 text-lg font-semibold">Frontend only</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`mt-5 p-5 lg:mt-0 lg:self-start lg:p-6 ${surfaceCardClassName}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Continue as
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950">
                  Driver account
                </h2>
              </div>
              <div className="rounded-full bg-slate-950 p-2 text-white">
                <Smartphone className="size-4" />
              </div>
            </div>

            <div className="space-y-3">
              {demoDrivers.map((driver, index) => {
                const isActive = driver.id === activeDriverId;

                return (
                  <motion.button
                    key={driver.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.08 }}
                    onClick={() => signInAsDriver(driver.id)}
                    className={`w-full rounded-[24px] border p-4 text-left transition hover:-translate-y-0.5 ${
                      isActive
                        ? "border-sky-400 bg-sky-50 shadow-[0_22px_50px_-40px_rgba(14,165,233,0.9)]"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex size-12 items-center justify-center rounded-2xl text-sm font-semibold ${
                            isActive
                              ? "bg-sky-500 text-white"
                              : "bg-slate-950 text-white"
                          }`}
                        >
                          {driver.name
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-950">
                            {driver.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {driver.city} | {driver.vehicle}
                          </p>
                          <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                              <Star className="size-3.5 fill-amber-400 text-amber-400" />
                              {driver.rating}
                            </span>
                            <span>
                              {driver.trips.toLocaleString("en-IN")} trips
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="mt-1 size-5 text-slate-400" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className={`mt-6 p-5 lg:mt-8 lg:max-w-xl ${softCardClassName}`}>
          <p className="text-sm font-medium text-slate-900">
            Demo state is saved in localStorage.
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Your selected account, online status, inbox read state, and SURG
            preferences will still be here after refresh.
          </p>
        </div>
      </div>
    </div>
  );
}
