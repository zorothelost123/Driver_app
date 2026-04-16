import {
  ArrowLeft,
  Clock3,
  MapPin,
  Navigation,
  Route,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AppShell } from "../components/AppShell";
import { Switch } from "../components/ui/switch";
import { useDemoAppContext } from "../context/DemoAppContext";
import { demandZones, routeOptions } from "../lib/demo-data";
import { formatCurrency, formatDistance } from "../lib/formatters";
import {
  brandGradientClassName,
  metricTileClassName,
  softCardClassName,
  surfaceCardClassName,
} from "../lib/ui";

const demandStyles = {
  high: {
    chip: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    map: "border-emerald-500 bg-emerald-500/18",
  },
  medium: {
    chip: "bg-amber-100 text-amber-700",
    dot: "bg-amber-400",
    map: "border-amber-400 bg-amber-300/18",
  },
  low: {
    chip: "bg-rose-100 text-rose-700",
    dot: "bg-rose-400",
    map: "border-rose-400 bg-rose-300/16",
  },
} as const;

export function SurgPage() {
  const navigate = useNavigate();
  const {
    activeDriver,
    avoidTrafficMode,
    routeOption,
    setAvoidTrafficMode,
    setRouteOption,
  } = useDemoAppContext();

  const selectedRoute =
    routeOptions.find((option) => option.id === routeOption) ?? routeOptions[0];
  const bestZone = demandZones[0];

  return (
    <AppShell
      header={
        <div className={`${surfaceCardClassName} overflow-hidden`}>
          <div
            className={`relative overflow-hidden rounded-[30px] p-6 text-white lg:p-8 ${brandGradientClassName}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_32%)]" />
            <div className="absolute -right-10 bottom-2 size-32 rounded-full bg-white/10 blur-3xl lg:size-44" />

            <div className="relative flex items-start justify-between gap-4 lg:items-center">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => navigate("/")}
                  aria-label="Back to home"
                  className="rounded-full bg-white/12 p-3 text-white transition hover:bg-white/18"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                    Smart earnings
                  </p>
                  <h1 className="mt-2 text-[28px] font-semibold leading-tight lg:max-w-xl lg:text-[38px]">
                    SURG recommendations
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-white/80 lg:max-w-2xl lg:text-base">
                    Live demand guidance for {activeDriver.city}, tuned around
                    wait time, earnings potential, and traffic.
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-white/12 p-3 text-white">
                <Sparkles className="size-5" />
              </div>
            </div>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-3 lg:mt-8">
              <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Top zone
                </p>
                <p className="mt-2 text-base font-semibold">{bestZone.name}</p>
              </div>
              <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Wait
                </p>
                <p className="mt-2 text-base font-semibold">
                  {bestZone.waitTimeLabel}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Forecast
                </p>
                <p className="mt-2 text-base font-semibold">
                  {formatCurrency(bestZone.earningsPerHour)}
                </p>
              </div>
            </div>

            <div className="relative mt-4 rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-md lg:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                    Avoid traffic mode
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Reduce stop-start bottlenecks and keep pickups predictable.
                  </p>
                </div>
                <Switch
                  checked={avoidTrafficMode}
                  onCheckedChange={setAvoidTrafficMode}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      }
      contentClassName="space-y-4 lg:grid lg:grid-cols-12 lg:gap-6 lg:space-y-0"
    >
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${surfaceCardClassName} overflow-hidden p-3 lg:col-span-8 lg:p-4`}
      >
        <div className="relative h-[330px] overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#edf4ff_0%,#def7f0_100%)] p-4 lg:h-[500px] lg:p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(29,78,216,0.16),_transparent_26%),radial-gradient(circle_at_72%_68%,_rgba(16,185,129,0.14),_transparent_28%)]" />
          <div className="absolute inset-x-8 top-[24%] h-px bg-slate-300/70" />
          <div className="absolute inset-x-10 top-[54%] h-px bg-slate-300/55" />
          <div className="absolute left-[28%] top-10 bottom-8 w-px bg-slate-300/55" />
          <div className="absolute right-[22%] top-12 bottom-12 w-px bg-slate-300/45" />

          {demandZones.map((zone, index) => {
            const style = demandStyles[zone.demand];

            return (
              <div
                key={zone.id}
                className="absolute"
                style={{ top: zone.coordinates.top, left: zone.coordinates.left }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  className={`rounded-full border-2 ${style.map}`}
                  style={{
                    width: zone.coordinates.size,
                    height: zone.coordinates.size,
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 p-2 shadow-sm">
                  <MapPin className="size-4 text-slate-700" />
                </div>
              </div>
            );
          })}

          <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute -inset-5 rounded-full bg-sky-500/25"
            />
            <div className="relative rounded-full border-4 border-white bg-slate-950 p-2 text-white shadow-lg">
              <Navigation className="size-4" />
            </div>
            <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
              You
            </div>
          </div>

          {avoidTrafficMode ? (
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full pointer-events-none"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4 }}
                d="M 50 52 C 58 44, 64 34, 69 25"
                stroke="#10b981"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="6 8"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 0.1 }}
                d="M 50 52 C 44 58, 33 66, 17 58"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="5 10"
              />
            </svg>
          ) : null}

          <div className="absolute left-4 top-4 rounded-[18px] border border-white/80 bg-white/88 px-4 py-3 shadow-sm backdrop-blur lg:max-w-sm lg:px-5 lg:py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Live map
            </p>
            <p className="mt-1 text-base font-semibold text-slate-950">
              Demand heat for the next 20 minutes
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Green means stronger demand and faster rider matching.
            </p>
          </div>

          <div className="absolute bottom-4 left-4 rounded-[20px] border border-white/80 bg-white/92 p-3 shadow-sm backdrop-blur lg:bottom-5 lg:left-auto lg:right-5">
            <div className="space-y-2 text-xs font-medium text-slate-600">
              {(["high", "medium", "low"] as const).map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <span
                    className={`size-2.5 rounded-full ${demandStyles[level].dot}`}
                  />
                  <span className="capitalize">{level} demand</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 lg:col-span-4 lg:content-start">
        <section className={`${surfaceCardClassName} p-5`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Route preference
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">
                Choose how SURG should guide you
              </h2>
            </div>
            <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Saved
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {routeOptions.map((option) => {
              const isSelected = option.id === routeOption;

              return (
                <button
                  key={option.id}
                  onClick={() => setRouteOption(option.id)}
                  className={`rounded-[22px] border p-4 text-left transition ${
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-[0_22px_40px_-34px_rgba(15,23,42,0.75)]"
                      : "border-slate-200 bg-slate-50/80 text-slate-950 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">{option.label}</h3>
                      <p
                        className={`mt-2 text-sm leading-6 ${
                          isSelected ? "text-white/80" : "text-slate-500"
                        }`}
                      >
                        {option.summary}
                      </p>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isSelected
                          ? "bg-white/12 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {option.etaLabel}
                    </div>
                  </div>
                  <div
                    className={`mt-3 text-xs font-medium ${
                      isSelected ? "text-white/70" : "text-slate-500"
                    }`}
                  >
                    {option.fuelLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${avoidTrafficMode ? softCardClassName : surfaceCardClassName} p-5`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`rounded-[18px] p-3 text-white ${
                avoidTrafficMode ? "bg-emerald-600" : "bg-slate-950"
              }`}
            >
              {avoidTrafficMode ? (
                <Route className="size-5" />
              ) : (
                <TrendingUp className="size-5" />
              )}
            </div>
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                  avoidTrafficMode ? "text-emerald-700" : "text-slate-500"
                }`}
              >
                {avoidTrafficMode ? "Alternate route active" : "Routing insight"}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">
                {avoidTrafficMode
                  ? `${selectedRoute.label} route ready for ${bestZone.name}`
                  : `Fastest path still favors ${bestZone.name}`}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {avoidTrafficMode
                  ? "Traffic-heavy corridors are being deprioritized. You will be guided through calmer stretches to preserve pickup speed."
                  : "Switch on Avoid Traffic Mode any time you want calmer roads and steadier pickup timing."}
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      <section className="space-y-3 lg:col-span-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Recommendations
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950">
              Best areas to move toward next
            </h2>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            Live forecast
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {demandZones.map((zone, index) => {
            const style = demandStyles[zone.demand];

            return (
              <motion.article
                key={zone.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${surfaceCardClassName} p-5`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`size-2.5 rounded-full ${style.dot}`} />
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.chip}`}
                      >
                        {zone.demand} demand
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-slate-950">
                      {zone.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {zone.note}
                    </p>
                  </div>
                  <div className="rounded-[20px] bg-slate-50 px-3 py-2 text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Score
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-950">
                      {zone.hotspotScore}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className={metricTileClassName}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Distance
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-950">
                      {formatDistance(zone.distanceKm)}
                    </p>
                  </div>
                  <div className={metricTileClassName}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Wait
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-950">
                      {zone.waitTimeLabel}
                    </p>
                  </div>
                  <div className={metricTileClassName}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Earn / hr
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-950">
                      {formatCurrency(zone.earningsPerHour)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Selected route
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">
                        {selectedRoute.label}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {selectedRoute.etaLabel} and {selectedRoute.fuelLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        <Clock3 className="size-3.5" />
                        {zone.etaMinutes} min away
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <TrendingUp className="size-4 text-emerald-600" />
                    Best for the next demand cycle
                  </div>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                    <Zap className="size-4" />
                    Use {selectedRoute.label}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
