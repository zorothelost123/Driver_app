import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronRight,
  LocateFixed,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import { AppShell } from "../components/AppShell";
import { LoadingScreen } from "../components/LoadingScreen";
import { QuickSettings } from "../components/QuickSettings";
import { Switch } from "../components/ui/switch";
import { useDemoAppContext } from "../context/DemoAppContext";
import {
  demandZones,
  homeOpportunities,
  homeRequiredActions,
} from "../lib/demo-data";
import { formatCurrency, getFirstName, getGreeting } from "../lib/formatters";
import {
  brandGradientClassName,
  metricTileClassName,
  surfaceCardClassName,
} from "../lib/ui";

const opportunityAccentMap = {
  green: {
    panel: "border-emerald-200 bg-emerald-50",
    icon: "bg-emerald-600 text-white",
    eyebrow: "text-emerald-700",
  },
  blue: {
    panel: "border-sky-200 bg-sky-50",
    icon: "bg-sky-600 text-white",
    eyebrow: "text-sky-700",
  },
  amber: {
    panel: "border-amber-200 bg-amber-50",
    icon: "bg-amber-500 text-white",
    eyebrow: "text-amber-700",
  },
} as const;

export function HomePage() {
  const navigate = useNavigate();
  const { activeDriver, isOnline, setIsOnline, unreadCount, avoidTrafficMode } =
    useDemoAppContext();
  const [showLoading, setShowLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const greeting = getGreeting();
  const firstName = getFirstName(activeDriver.name);
  const topZone = demandZones[0];
  const todaySummary = isOnline
    ? {
        earnings: 640,
        trips: 4,
        onlineTime: "1h 42m",
        insight: "Strong momentum this hour",
      }
    : {
        earnings: 0,
        trips: 0,
        onlineTime: "0h 00m",
        insight: "Go online to start tracking shift progress",
      };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleToggle(nextValue: boolean) {
    if (nextValue) {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      setShowLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setShowLoading(false);
        setIsOnline(true);
      }, 1800);
      return;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setShowLoading(false);
    setIsOnline(false);
  }

  return (
    <>
      <AppShell
        header={
          <div className={`${surfaceCardClassName} overflow-hidden`}>
            <div
              className={`relative overflow-hidden rounded-[30px] p-6 text-white lg:p-8 ${brandGradientClassName}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.24),_transparent_36%)]" />
              <div className="absolute -bottom-12 right-0 size-32 rounded-full bg-white/12 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4 lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                    Driver assistant
                  </p>
                  <h1 className="mt-3 text-[30px] font-semibold leading-tight lg:max-w-xl lg:text-[38px]">
                    {greeting}, {firstName}
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-white/80 lg:max-w-2xl lg:text-base">
                    {activeDriver.city} shift guide with SURG-backed hotspot
                    recommendations.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/inbox")}
                    aria-label="Open inbox"
                    className="relative rounded-full bg-white/12 p-3 text-white transition hover:bg-white/18"
                  >
                    <Bell className="size-5" />
                    {unreadCount > 0 ? (
                      <span className="absolute -right-1 -top-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-900">
                        {unreadCount}
                      </span>
                    ) : null}
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    aria-label="Open quick settings"
                    className="rounded-full bg-white/12 p-3 text-white transition hover:bg-white/18"
                  >
                    <Menu className="size-5" />
                  </button>
                </div>
              </div>

              <div className="relative mt-6 rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-md lg:mt-8 lg:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                      Driver status
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`size-2.5 rounded-full ${
                          isOnline ? "bg-emerald-300" : "bg-white/40"
                        }`}
                      />
                      <p className="text-sm font-medium text-white">
                        {isOnline
                          ? "Online and ready for requests"
                          : "Offline. Start your shift when you are ready."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-full bg-white/8 px-3 py-2">
                    <span className="text-sm font-semibold text-white">
                      {isOnline ? "Online" : "Offline"}
                    </span>
                    <Switch
                      checked={isOnline}
                      onCheckedChange={handleToggle}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
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
          <div className="relative h-[300px] overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#eef5ff_0%,#dff4f0_100%)] p-4 lg:h-[430px] lg:p-5 xl:h-[470px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,_rgba(59,130,246,0.12),_transparent_24%),radial-gradient(circle_at_78%_72%,_rgba(16,185,129,0.14),_transparent_26%)]" />
            <div className="absolute inset-x-8 top-[28%] h-px bg-slate-300/80" />
            <div className="absolute inset-x-12 top-[58%] h-px bg-slate-300/65" />
            <div className="absolute left-[34%] top-6 bottom-6 w-px bg-slate-300/60" />
            <div className="absolute right-[24%] top-8 bottom-10 w-px bg-slate-300/45" />

            {demandZones.slice(0, 4).map((zone, index) => (
              <div
                key={zone.id}
                className="absolute"
                style={{ top: zone.coordinates.top, left: zone.coordinates.left }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.2, 0.45] }}
                  transition={{
                    duration: 2 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`rounded-full border ${
                    zone.demand === "high"
                      ? "border-emerald-500 bg-emerald-500/20"
                      : zone.demand === "medium"
                        ? "border-amber-400 bg-amber-300/20"
                        : "border-rose-400 bg-rose-300/18"
                  }`}
                  style={{
                    width: zone.coordinates.size,
                    height: zone.coordinates.size,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            ))}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="absolute -inset-5 rounded-full bg-sky-500/25"
              />
              <div className="relative rounded-full border-4 border-white bg-slate-950 p-2 text-white shadow-lg">
                <MapPin className="size-4" />
              </div>
            </div>

            <div className="relative flex items-start justify-between gap-3">
              <div className="rounded-[18px] border border-white/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur lg:max-w-sm lg:px-5 lg:py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Live location
                </p>
                <p className="mt-1 text-base font-semibold text-slate-950">
                  Near Brodipet Circle
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {topZone.distanceKm} km from the strongest SURG zone
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  {
                    icon: LocateFixed,
                    label: "Center",
                    onClick: () => undefined,
                  },
                  {
                    icon: ShieldCheck,
                    label: "Safety",
                    onClick: () => navigate("/profile"),
                  },
                  {
                    icon: Sparkles,
                    label: "Settings",
                    onClick: () => setShowSettings(true),
                  },
                ].map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      aria-label={action.label}
                      className="rounded-full border border-white/80 bg-white/85 p-3 text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5"
                    >
                      <Icon className="size-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-slate-200/70 bg-white/90 p-4 shadow-[0_16px_35px_-28px_rgba(15,23,42,0.35)] backdrop-blur lg:left-5 lg:right-auto lg:w-[min(28rem,calc(100%-2.5rem))] lg:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Suggested hotspot
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-950">
                    {topZone.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatCurrency(topZone.earningsPerHour)} per hour and{" "}
                    {topZone.waitTimeLabel}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/surg")}
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open SURG
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-4 lg:col-span-4 lg:content-start">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`${surfaceCardClassName} p-5`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-500">
                  Required actions
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-950">
                  {homeRequiredActions[0].title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {homeRequiredActions[0].description}
                </p>
              </div>
              <div className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                1 pending
              </div>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">
              {homeRequiredActions[0].cta}
              <ChevronRight className="size-4" />
            </button>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${surfaceCardClassName} p-5`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Today's summary
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-950">
                  {todaySummary.insight}
                </h2>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Goal {formatCurrency(activeDriver.shiftGoal)}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className={metricTileClassName}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Earnings
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  {formatCurrency(todaySummary.earnings)}
                </p>
              </div>
              <div className={metricTileClassName}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Trips
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  {todaySummary.trips}
                </p>
              </div>
              <div className={metricTileClassName}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Online
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  {todaySummary.onlineTime}
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.button
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate("/surg")}
          className={`block w-full overflow-hidden rounded-[30px] p-6 text-left text-white shadow-[0_30px_60px_-34px_rgba(37,99,235,0.65)] lg:col-span-5 lg:h-full lg:p-7 xl:col-span-4 ${brandGradientClassName}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                <Zap className="size-3.5 text-amber-300" />
                Smart earnings
              </div>
              <h2 className="mt-4 text-2xl font-semibold">
                SURG wants you in {topZone.name}
              </h2>
              <p className="mt-2 max-w-[28ch] text-sm leading-6 text-white/80 lg:max-w-sm">
                {formatCurrency(topZone.earningsPerHour)} per hour forecast,{" "}
                {topZone.waitTimeLabel}, and{" "}
                {avoidTrafficMode ? "traffic-aware" : "fastest"} routing.
              </p>
            </div>
            <div className="rounded-[22px] border border-white/15 bg-white/10 p-3">
              <TrendingUp className="size-6" />
            </div>
          </div>
        </motion.button>

        <section className="space-y-3 lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Opportunities
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-950">
                High-value boosts for this shift
              </h2>
            </div>
            <button
              onClick={() => navigate("/earnings")}
              className="text-sm font-semibold text-sky-700"
            >
              View earnings
            </button>
          </div>

          <div className="grid gap-3 xl:grid-cols-3">
            {homeOpportunities.map((opportunity, index) => {
              const accent = opportunityAccentMap[opportunity.accent];

              return (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.06 }}
                  className={`flex items-start gap-4 rounded-[26px] border p-5 shadow-[0_18px_40px_-36px_rgba(15,23,42,0.28)] ${accent.panel} xl:h-full`}
                >
                  <div className={`rounded-[18px] p-3 ${accent.icon}`}>
                    {opportunity.accent === "amber" ? (
                      <Sparkles className="size-5" />
                    ) : opportunity.accent === "blue" ? (
                      <Zap className="size-5" />
                    ) : (
                      <TrendingUp className="size-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.22em] ${accent.eyebrow}`}
                    >
                      {opportunity.stat}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-slate-950">
                      {opportunity.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {opportunity.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </AppShell>

      <AnimatePresence>
        {showLoading ? <LoadingScreen overlay /> : null}
      </AnimatePresence>

      <QuickSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
