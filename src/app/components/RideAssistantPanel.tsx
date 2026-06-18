import {
  CarFront,
  Clock3,
  MapPinned,
  Navigation,
  Route,
  Sparkles,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useDemoAppContext } from "../context/DemoAppContext";
import { formatCurrency } from "../lib/formatters";
import { surfaceCardClassName } from "../lib/ui";
import { cn } from "./ui/utils";

interface RideAssistantPanelProps {
  className?: string;
}

function DetailPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-slate-50/80 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

export function RideAssistantPanel({ className }: RideAssistantPanelProps) {
  const {
    isOnline,
    operatingCity,
    currentWorkspaceZone,
    locationPermission,
    quickSettings,
    currentRideRequest,
    activeTrip,
    sessionMetrics,
    grantLocationAccess,
    simulateRideRequest,
    declineRideRequest,
    acceptRideRequest,
    cancelActiveTrip,
    markPickedUp,
    completeActiveTrip,
  } = useDemoAppContext();

  if (!isOnline) {
    return (
      <section className={cn(`${surfaceCardClassName} p-5`, className)}>
        <div className="flex items-start gap-3">
          <div className="rounded-[18px] bg-slate-950 p-3 text-white">
            <CarFront className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Driver dispatch simulator
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              Go online to start trip testing
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This simulates how nearby customer bookings surface to drivers,
              then move through pickup, in-trip progress, and completion on both
              mobile and desktop.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (locationPermission !== "granted") {
    return (
      <section className={cn(`${surfaceCardClassName} p-5`, className)}>
        <div className="flex items-start gap-3">
          <div className="rounded-[18px] bg-slate-950 p-3 text-white">
            <Navigation className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Location sync required
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              Allow workspace location to receive nearby bookings
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Drivers first enable location, then the app matches customer
              bookings around their active work zone in {operatingCity}.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Selected work zone
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-950">
            {currentWorkspaceZone.name}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {currentWorkspaceZone.landmark}
          </p>
        </div>

        <button
          onClick={grantLocationAccess}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <MapPinned className="size-4" />
          Allow location and start matching
        </button>
      </section>
    );
  }

  if (currentRideRequest) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(`${surfaceCardClassName} p-5`, className)}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Nearby customer booking surfaced
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              {formatCurrency(currentRideRequest.fare)} estimated fare
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {currentRideRequest.note}
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {currentRideRequest.tag}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
          <div className="rounded-[18px] bg-white p-3 text-slate-700 shadow-sm">
            <UserRound className="size-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-950">
              Customer: {currentRideRequest.riderName}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Rider rating {currentRideRequest.riderRating.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <DetailPill label="Zone" value={currentWorkspaceZone.name} />
          <DetailPill
            label="Pickup ETA"
            value={`${currentRideRequest.pickupEtaMinutes} min`}
          />
          <DetailPill
            label="Pickup distance"
            value={`${currentRideRequest.pickupDistanceKm.toFixed(1)} km`}
          />
          <DetailPill
            label="Trip time"
            value={`${currentRideRequest.tripEtaMinutes} min`}
          />
          <DetailPill label="Payment" value={currentRideRequest.paymentMethod} />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Pickup
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {currentRideRequest.pickupLabel}
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Dropoff
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {currentRideRequest.dropoffLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={declineRideRequest}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <X className="size-4" />
            Decline
          </button>
          <button
            onClick={acceptRideRequest}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Sparkles className="size-4" />
            Accept booking
          </button>
        </div>
      </motion.section>
    );
  }

  if (activeTrip?.stage === "pickup") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(`${surfaceCardClassName} p-5`, className)}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Driver en route to pickup
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Customer {activeTrip.riderName} is waiting
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Navigate to the pickup point, then confirm once the rider is in
              the car.
            </p>
          </div>
          <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            Pickup phase
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <DetailPill label="Rider" value={activeTrip.riderName} />
          <DetailPill label="Zone" value={currentWorkspaceZone.name} />
          <DetailPill
            label="Arrival"
            value={`${activeTrip.pickupEtaMinutes} min`}
          />
          <DetailPill
            label="Distance"
            value={`${activeTrip.pickupDistanceKm.toFixed(1)} km`}
          />
          <DetailPill label="Fare" value={formatCurrency(activeTrip.fare)} />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Pickup point
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {activeTrip.pickupLabel}
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Destination
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {activeTrip.dropoffLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={cancelActiveTrip}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
          >
            Cancel request
          </button>
          <button
            onClick={markPickedUp}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <MapPinned className="size-4" />
            Mark rider picked up
          </button>
        </div>
      </motion.section>
    );
  }

  if (activeTrip?.stage === "dropoff") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(`${surfaceCardClassName} p-5`, className)}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
              Booking in progress
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Dropoff in {activeTrip.tripEtaMinutes} min
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This is the live in-trip state reviewers can test on both layouts.
            </p>
          </div>
          <div className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
            Active trip
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <DetailPill label="Zone" value={currentWorkspaceZone.name} />
          <DetailPill
            label="Destination"
            value={activeTrip.dropoffLabel}
          />
          <DetailPill
            label="Trip distance"
            value={`${activeTrip.tripDistanceKm.toFixed(1)} km`}
          />
          <DetailPill label="Payment" value={activeTrip.paymentMethod} />
          <DetailPill label="Fare" value={formatCurrency(activeTrip.fare)} />
        </div>

        <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Session progress
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-950">
                {sessionMetrics.todayTrips} trips completed today
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
              <WalletCards className="size-4 text-emerald-600" />
              {formatCurrency(sessionMetrics.todayEarnings)} earned today
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">
            <Route className="size-4" />
            {activeTrip.tripDistanceKm.toFixed(1)} km remaining
          </div>
          <button
            onClick={completeActiveTrip}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Navigation className="size-4" />
            Complete trip
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <section className={cn(`${surfaceCardClassName} p-5`, className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Ride radar active
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Ready for the next nearby booking
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Preview how a customer booking appears to the driver when nearby
            demand matches your location and working zone.
          </p>
        </div>
        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          Live demo
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DetailPill label="City" value={operatingCity} />
        <DetailPill label="Zone" value={currentWorkspaceZone.name} />
        <DetailPill
          label="Auto accept"
          value={quickSettings.autoAccept ? "On" : "Off"}
        />
        <DetailPill
          label="Mode"
          value={quickSettings.navigation ? "Nav ready" : "Manual nav"}
        />
      </div>

      <button
        onClick={simulateRideRequest}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <Sparkles className="size-4" />
        Preview nearby booking signal
      </button>
    </section>
  );
}
