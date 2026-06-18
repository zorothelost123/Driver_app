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
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import { AppShell } from "../components/AppShell";
import { ShiftPlanningToggle } from "../components/ShiftPlanningToggle";
import { WorkspaceZonePanel } from "../components/WorkspaceZonePanel";
import { Switch } from "../components/ui/switch";
import { useDemoAppContext } from "../context/DemoAppContext";
import { usePersistentState } from "../hooks/usePersistentState";
import { getCityDemandProfile, routeOptions } from "../lib/demo-data";
import { formatCurrency, formatDistance } from "../lib/formatters";
import {
  brandGradientClassName,
  metricTileClassName,
  softCardClassName,
  surfaceCardClassName,
} from "../lib/ui";

type SurgInsightTab = "workspace" | "peakHours" | "routing";

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

const surgInsightTabs = [
  {
    id: "workspace" as const,
    label: "Workspace",
    hint: "City, location sync, and work zones",
    icon: MapPin,
  },
  {
    id: "peakHours" as const,
    label: "Peak Hours",
    hint: "Morning and evening demand shifts",
    icon: Clock3,
  },
  {
    id: "routing" as const,
    label: "Ride Mapping",
    hint: "Route mode and traffic-aware guidance",
    icon: Route,
  },
] as const;

export function SurgPage() {
  const navigate = useNavigate();
  const {
    operatingCity,
    currentWorkspaceZone,
    locationPermission,
    shiftPlanningMode,
    setShiftPlanningMode,
    avoidTrafficMode,
    routeOption,
    setAvoidTrafficMode,
    setRouteOption,
  } = useDemoAppContext();
  const [surgInsightTab, setSurgInsightTab] = usePersistentState<SurgInsightTab>(
    "driver-app.surg-insight-tab",
    "workspace",
  );

  const cityProfile = getCityDemandProfile(operatingCity);
  const demandZones = cityProfile.zones;
  const activeShiftPlan =
    cityProfile.shiftPlans.find((plan) => plan.id === shiftPlanningMode) ??
    cityProfile.shiftPlans[0];
  const shiftPeakWindows = cityProfile.peakWindows.filter((window) =>
    window.shiftModes.includes(shiftPlanningMode),
  );
  const displayPeakWindows =
    shiftPeakWindows.length > 0 ? shiftPeakWindows : cityProfile.peakWindows;
  const selectedRoute =
    routeOptions.find((option) => option.id === routeOption) ?? routeOptions[0];
  const bestZone =
    demandZones.find((zone) =>
      activeShiftPlan.focusZoneIds.includes(zone.id),
    ) ?? demandZones[0];
  const primaryPeakWindow = displayPeakWindows[0] ?? cityProfile.peakWindows[0];
  const embeddedPanelClassName =
    "rounded-[24px] border border-slate-200 bg-slate-50/80 p-5";

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
                    Live driver-side demand guidance for {operatingCity},
                    tuned around wait time, commute windows, earnings potential,
                    and traffic.
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
                  Workspace zone
                </p>
                <p className="mt-2 text-base font-semibold">
                  {currentWorkspaceZone.name}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Top zone
                </p>
                <p className="mt-2 text-base font-semibold">
                  {bestZone.name}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Shift mode
                </p>
                <p className="mt-2 text-base font-semibold">
                  {activeShiftPlan.label}
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
        className={`${surfaceCardClassName} overflow-hidden p-3 lg:col-span-8 lg:self-start lg:p-4`}
      >
        <motion.div
          key={`${operatingCity}-${currentWorkspaceZone.id}-${routeOption}-${avoidTrafficMode}-${shiftPlanningMode}`}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[330px] overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#edf4ff_0%,#def7f0_100%)] p-4 lg:h-[500px] lg:p-5"
        >
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

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <motion.path
              key={`${operatingCity}-${shiftPlanningMode}-focus-route`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              d={activeShiftPlan.routePath}
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              key={`${operatingCity}-${shiftPlanningMode}-${selectedRoute.id}-alt`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: avoidTrafficMode ? 1 : 0.55 }}
              transition={{ duration: 1.35, delay: 0.08 }}
              d={activeShiftPlan.alternatePath}
              stroke={avoidTrafficMode ? "#10b981" : "#2563eb"}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={avoidTrafficMode ? "5 8" : "0"}
            />
          </svg>

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
              {locationPermission === "granted" ? "You" : "Location pending"}
            </div>
          </div>

          {avoidTrafficMode ? (
            <div className="absolute right-4 top-4 rounded-full border border-white/80 bg-white/88 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 shadow-sm backdrop-blur lg:right-5">
              Avoid traffic route active
            </div>
          ) : null}

          <div className="absolute left-4 top-4 rounded-[18px] border border-white/80 bg-white/88 px-4 py-3 shadow-sm backdrop-blur lg:max-w-sm lg:px-5 lg:py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Live map
            </p>
            <p className="mt-1 text-base font-semibold text-slate-950">
              {operatingCity} demand heat for the next 20 minutes
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {locationPermission === "granted"
                ? `Focused around ${currentWorkspaceZone.landmark}.`
                : "Allow location to anchor this map to your active workspace zone."}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
              {activeShiftPlan.corridorLabel} | {activeShiftPlan.timeRange}
            </p>
          </div>

          <div className="absolute bottom-4 left-4 rounded-[20px] border border-white/80 bg-white/92 px-4 py-3 shadow-sm backdrop-blur lg:bottom-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Active work zone
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {currentWorkspaceZone.name}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Best window: {currentWorkspaceZone.bestWindow}
            </p>
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-3 lg:bottom-5 lg:right-5">
            <button
              onClick={() => setSurgInsightTab("routing")}
              className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_35px_-24px_rgba(15,23,42,0.48)] transition hover:bg-slate-800"
            >
              Open SURG
            </button>
            <div className="rounded-[20px] border border-white/80 bg-white/92 p-3 shadow-sm backdrop-blur">
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
        </motion.div>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {surgInsightTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === surgInsightTab;

            return (
              <button
                key={tab.id}
                onClick={() => setSurgInsightTab(tab.id)}
                className={`min-h-[96px] rounded-[20px] border p-3 text-left transition sm:min-h-[132px] sm:rounded-[24px] sm:p-4 ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-[0_24px_45px_-32px_rgba(15,23,42,0.72)]"
                    : "border-slate-200 bg-slate-50/80 text-slate-950 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={`hidden text-xs font-semibold uppercase tracking-[0.22em] sm:block ${
                        isActive ? "text-white/65" : "text-slate-500"
                      }`}
                    >
                      SURG Box
                    </p>
                    <h2 className="text-sm font-semibold sm:mt-2 sm:text-base">
                      {tab.label}
                    </h2>
                    <p
                      className={`mt-2 hidden text-sm leading-6 sm:block ${
                        isActive ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {tab.hint}
                    </p>
                  </div>
                  <div
                    className={`rounded-[16px] p-2.5 sm:rounded-[18px] sm:p-3 ${
                      isActive ? "bg-white/12 text-white" : "bg-white text-slate-700"
                    }`}
                  >
                    <Icon className="size-4 sm:size-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={surgInsightTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mt-4"
          >
            {surgInsightTab === "workspace" ? (
              <WorkspaceZonePanel layout="wide" variant="embedded" />
            ) : null}

            {surgInsightTab === "peakHours" ? (
              <section className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className={`${embeddedPanelClassName} space-y-4`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Shift planner
                      </p>
                      <h2 className="mt-2 text-lg font-semibold text-slate-950">
                        Plan around the next driver demand wave
                      </h2>
                    </div>
                    <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      {activeShiftPlan.timeRange}
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-500">
                    {activeShiftPlan.summary}
                  </p>
                  <ShiftPlanningToggle
                    value={shiftPlanningMode}
                    onChange={setShiftPlanningMode}
                  />
                  <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Driver action
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {activeShiftPlan.actionLabel}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {displayPeakWindows.map((window, index) => (
                    <motion.article
                      key={`${operatingCity}-${window.id}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + index * 0.05 }}
                      className={embeddedPanelClassName}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                            {window.label}
                          </p>
                          <h3 className="mt-2 text-base font-semibold text-slate-950">
                            {window.timeRange}
                          </h3>
                        </div>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {window.demandTone}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {window.insight}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {window.hotspots.map((hotspot) => (
                          <span
                            key={hotspot}
                            className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                          >
                            {hotspot}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            ) : null}

            {surgInsightTab === "routing" ? (
              <section className="space-y-4">
                <div className="grid grid-cols-3 gap-2 md:hidden">
                  {routeOptions.map((option) => {
                    const isSelected = option.id === routeOption;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setRouteOption(option.id)}
                        className={`min-h-[92px] rounded-[20px] border p-3 text-left transition ${
                          isSelected
                            ? "border-slate-950 bg-slate-950 text-white shadow-[0_24px_45px_-32px_rgba(15,23,42,0.72)]"
                            : "border-slate-200 bg-slate-50/80 text-slate-950 hover:bg-white"
                        }`}
                      >
                        <div className="flex h-full flex-col justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold leading-5">
                              {option.label}
                            </p>
                            <p
                              className={`mt-2 text-[11px] font-medium uppercase tracking-[0.16em] ${
                                isSelected ? "text-white/70" : "text-slate-500"
                              }`}
                            >
                              {option.etaLabel}
                            </p>
                          </div>
                          <p
                            className={`text-[11px] leading-5 ${
                              isSelected ? "text-white/75" : "text-slate-500"
                            }`}
                          >
                            {option.fuelLabel}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="hidden gap-3 md:grid xl:grid-cols-3">
                  {routeOptions.map((option) => {
                    const isSelected = option.id === routeOption;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setRouteOption(option.id)}
                        className={`rounded-[22px] border p-4 text-left transition ${
                          isSelected
                            ? "border-slate-950 bg-slate-950 text-white shadow-[0_24px_45px_-32px_rgba(15,23,42,0.72)]"
                            : "border-slate-200 bg-slate-50/80 text-slate-950 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold">
                              {option.label}
                            </h3>
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
                                : "bg-white text-slate-600"
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

                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <div
                    className={`p-5 ${
                      avoidTrafficMode
                        ? softCardClassName
                        : "rounded-[24px] border border-slate-200 bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-[18px] p-3 text-white ${
                          avoidTrafficMode ? "bg-emerald-600" : "bg-slate-950"
                        }`}
                      >
                        <Route className="size-5" />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                            avoidTrafficMode ? "text-emerald-700" : "text-slate-500"
                          }`}
                        >
                          {avoidTrafficMode
                            ? "Alternate route active"
                            : "Routing insight"}
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-slate-950">
                          {selectedRoute.label} route ready for {bestZone.name}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {avoidTrafficMode
                            ? "Traffic-heavy corridors are being deprioritized so the driver can keep pickups smoother."
                            : `SURG is still favoring the fastest path from ${currentWorkspaceZone.name}.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`${embeddedPanelClassName} space-y-4`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Route snapshot
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-slate-950">
                          Mapping for the next demand cycle
                        </h2>
                      </div>
                      <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                        {selectedRoute.etaLabel}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className={metricTileClassName}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Zone
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-950">
                          {bestZone.name}
                        </p>
                      </div>
                      <div className={metricTileClassName}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Wait
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-950">
                          {bestZone.waitTimeLabel}
                        </p>
                      </div>
                      <div className={metricTileClassName}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Earn / hr
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-950">
                          {formatCurrency(bestZone.earningsPerHour)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      <div className="grid gap-4 lg:col-span-4 lg:content-start">
        <section className={`${surfaceCardClassName} p-5`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                SURG snapshot
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">
                Move toward {bestZone.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {formatCurrency(bestZone.earningsPerHour)} per hour forecast with{" "}
                {bestZone.waitTimeLabel.toLowerCase()} in the{" "}
                {activeShiftPlan.label.toLowerCase()}.
              </p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {bestZone.hotspotScore} score
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className={metricTileClassName}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                ETA
              </p>
              <p className="mt-2 text-base font-semibold text-slate-950">
                {bestZone.etaMinutes} min
              </p>
            </div>
            <div className={metricTileClassName}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Route
              </p>
              <p className="mt-2 text-base font-semibold text-slate-950">
                {selectedRoute.label}
              </p>
            </div>
            <div className={metricTileClassName}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Window
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-950">
                {primaryPeakWindow.timeRange}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSurgInsightTab("routing")}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Zap className="size-4" />
            Open SURG route
          </button>
        </section>

        <section className={`${surfaceCardClassName} p-5`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Driver focus
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">
                {activeShiftPlan.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {activeShiftPlan.actionLabel}
              </p>
            </div>
            <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              {operatingCity}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {currentWorkspaceZone.name}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {primaryPeakWindow.demandTone}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {locationPermission === "granted"
                ? "Location synced"
                : "Location pending"}
            </span>
          </div>

          <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Next corridor
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-950">
              {activeShiftPlan.corridorLabel}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {primaryPeakWindow.insight}
            </p>
          </div>
        </section>
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
            const isPriorityZone = activeShiftPlan.focusZoneIds.includes(zone.id);

            return (
              <motion.article
                key={`${operatingCity}-${zone.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${surfaceCardClassName} p-5 ${
                  isPriorityZone ? "ring-1 ring-sky-200" : ""
                }`}
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
                      {isPriorityZone ? (
                        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
                          {shiftPlanningMode} priority
                        </span>
                      ) : null}
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
                    Guide me to {zone.name}
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
