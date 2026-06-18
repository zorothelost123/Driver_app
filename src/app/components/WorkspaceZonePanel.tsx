import { Crosshair, MapPinned, MapPlus, Navigation, Radar } from "lucide-react";
import { motion } from "motion/react";
import { useDemoAppContext } from "../context/DemoAppContext";
import { availableOperatingCities, getCityDemandProfile } from "../lib/demo-data";
import { surfaceCardClassName } from "../lib/ui";
import { cn } from "./ui/utils";

interface WorkspaceZonePanelProps {
  className?: string;
  layout?: "sidebar" | "wide";
  variant?: "card" | "embedded";
}

export function WorkspaceZonePanel({
  className,
  layout = "sidebar",
  variant = "card",
}: WorkspaceZonePanelProps) {
  const {
    operatingCity,
    currentWorkspaceZone,
    locationPermission,
    canSwitchOperatingCity,
    setOperatingCity,
    grantLocationAccess,
    selectWorkspaceZone,
  } = useDemoAppContext();

  const cityProfile = getCityDemandProfile(operatingCity);
  const isWide = layout === "wide";

  return (
    <section
      className={cn(
        variant === "card"
          ? `${surfaceCardClassName} p-5`
          : "rounded-[26px] border border-slate-200 bg-slate-50/70 p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Workspace zone
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">
            Driver location and city intelligence
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Choose the operating city, sync location access, and set the zone
            where you want to receive nearby customer bookings.
          </p>
        </div>
        <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
          Driver-side only
        </div>
      </div>

      <div
        className={cn(
          "mt-5 grid gap-4",
          isWide && "xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.95fr)]",
        )}
      >
        <div className="space-y-4">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-[18px] bg-white p-3 text-sky-700 shadow-sm">
                <Navigation className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Live workspace
                </p>
                <h3 className="mt-1 text-base font-semibold text-slate-950">
                  {currentWorkspaceZone.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {currentWorkspaceZone.landmark}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {currentWorkspaceZone.demandSummary}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {currentWorkspaceZone.coverageAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <MapPinned className="size-4 text-sky-700" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Work zones in {operatingCity}
              </p>
            </div>
            <div
              className={cn(
                "mt-3 grid gap-3",
                isWide
                  ? "md:grid-cols-2 xl:grid-cols-3"
                  : "sm:grid-cols-2 xl:grid-cols-2",
              )}
            >
              {cityProfile.workspaceZones.map((zone, index) => {
                const isActive = zone.id === currentWorkspaceZone.id;

                return (
                  <motion.button
                    key={zone.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => selectWorkspaceZone(zone.id)}
                    className={`rounded-[22px] border p-4 text-left transition ${
                      isActive
                        ? "border-sky-400 bg-sky-50 shadow-[0_20px_40px_-34px_rgba(14,165,233,0.85)]"
                        : "border-slate-200 bg-slate-50/80 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-950">
                          {zone.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {zone.landmark}
                        </p>
                      </div>
                      {isActive ? (
                        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-sky-700">
                          Active
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {zone.demandSummary}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                      <Radar className="size-3.5 text-emerald-600" />
                      Best window: {zone.bestWindow}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <Crosshair className="size-4 text-emerald-600" />
                {locationPermission === "granted"
                  ? "Location permission granted and synced"
                  : "Location permission needed before booking signals can reach the driver"}
              </div>
              <button
                onClick={grantLocationAccess}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <MapPlus className="size-4" />
                {locationPermission === "granted"
                  ? "Resync my location"
                  : "Allow location access"}
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Operating city
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {availableOperatingCities.map((city) => {
                const isActive = city === operatingCity;

                return (
                  <button
                    key={city}
                    onClick={() => setOperatingCity(city)}
                    disabled={!canSwitchOperatingCity}
                    className={`rounded-[20px] border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-950 hover:bg-slate-50"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <p className="text-sm font-semibold">{city}</p>
                    <p
                      className={`mt-1 text-xs ${
                        isActive ? "text-white/70" : "text-slate-500"
                      }`}
                    >
                      {getCityDemandProfile(city).peakWindows[0].timeRange}
                    </p>
                  </button>
                );
              })}
            </div>
            {!canSwitchOperatingCity ? (
              <p className="mt-2 text-xs font-medium text-amber-700">
                Finish the current booking flow before switching operating city.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
