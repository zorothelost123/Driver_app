import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock3,
  Landmark,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AppShell } from "../components/AppShell";
import { useDemoAppContext } from "../context/DemoAppContext";
import {
  earningsSummaries,
  recentTrips,
  weeklyEarnings,
} from "../lib/demo-data";
import { formatCurrency } from "../lib/formatters";
import { brandGradientClassName, surfaceCardClassName } from "../lib/ui";

const periodLabels = {
  week: "This week",
  month: "This month",
  all: "All time",
} as const;

export function EarningsPage() {
  const navigate = useNavigate();
  const { earningsPeriod, setEarningsPeriod } = useDemoAppContext();

  const summary = earningsSummaries[earningsPeriod];
  const maxAmount = Math.max(...weeklyEarnings.map((entry) => entry.amount));

  return (
    <AppShell
      header={
        <div className={`${surfaceCardClassName} overflow-hidden`}>
          <div
            className={`relative overflow-hidden rounded-[30px] p-6 text-white lg:p-8 ${brandGradientClassName}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_34%)]" />
            <div className="absolute -right-12 bottom-0 size-36 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex items-start gap-3">
              <button
                onClick={() => navigate("/")}
                aria-label="Back to home"
                className="rounded-full bg-white/12 p-3 text-white transition hover:bg-white/18"
              >
                <ArrowLeft className="size-5" />
              </button>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                  Earnings
                </p>
                <h1 className="mt-2 text-[28px] font-semibold leading-tight lg:text-[38px]">
                  Income overview
                </h1>
                <p className="mt-2 text-sm leading-6 text-white/80 lg:max-w-2xl lg:text-base">
                  Track your shift performance, recent trips, and the next
                  payout cycle.
                </p>
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
        className={`${surfaceCardClassName} overflow-hidden lg:col-span-4`}
      >
        <div className={`p-6 text-white lg:h-full ${brandGradientClassName}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                {periodLabels[earningsPeriod]}
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                {formatCurrency(summary.total)}
              </h2>
              <p className="mt-2 text-sm text-white/80">
                {summary.trend} compared with the previous period
              </p>
            </div>
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
              <TrendingUp className="size-6" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 lg:mt-8">
            <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Trips
              </p>
              <p className="mt-2 text-lg font-semibold">{summary.trips}</p>
            </div>
            <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Online
              </p>
              <p className="mt-2 text-lg font-semibold">
                {summary.onlineHours}h
              </p>
            </div>
            <div className="rounded-[22px] border border-white/15 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Avg / trip
              </p>
              <p className="mt-2 text-lg font-semibold">
                {formatCurrency(summary.perTrip)}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 lg:col-span-8">
        <section className={`${surfaceCardClassName} p-3`}>
          <div className="grid grid-cols-3 gap-2 rounded-[24px] bg-slate-100/80 p-1.5">
            {(["week", "month", "all"] as const).map((period) => {
              const isSelected = period === earningsPeriod;

              return (
                <button
                  key={period}
                  onClick={() => setEarningsPeriod(period)}
                  className={`rounded-[20px] px-3 py-3 text-sm font-semibold transition ${
                    isSelected
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {periodLabels[period]}
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-12">
          <div className={`${surfaceCardClassName} p-5 lg:col-span-8`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Weekly overview
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-950">
                  Ride income pattern
                </h2>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Demo chart
              </div>
            </div>

            <div className="mt-5 flex h-52 items-end justify-between gap-2">
              {weeklyEarnings.map((entry, index) => {
                const height = `${(entry.amount / maxAmount) * 100}%`;

                return (
                  <div
                    key={entry.day}
                    className="flex flex-1 flex-col items-center"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{ delay: index * 0.06, duration: 0.45 }}
                      className="group relative flex w-full items-end justify-center rounded-t-[18px] bg-[linear-gradient(180deg,#38bdf8_0%,#2563eb_60%,#0f172a_100%)]"
                    >
                      <div className="absolute -top-10 rounded-full bg-slate-950 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-sm transition group-hover:opacity-100">
                        {formatCurrency(entry.amount)}
                      </div>
                    </motion.div>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      {entry.day}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-4">
            <div className={`${surfaceCardClassName} p-4`}>
              <div className="flex items-center gap-3">
                <div className="rounded-[18px] bg-sky-100 p-3 text-sky-700">
                  <CalendarDays className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Today
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-950">
                    {formatCurrency(summary.today)}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${surfaceCardClassName} p-4`}>
              <div className="flex items-center gap-3">
                <div className="rounded-[18px] bg-emerald-100 p-3 text-emerald-700">
                  <Wallet className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Pending
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-950">
                    {formatCurrency(summary.pending)}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${surfaceCardClassName} p-5`}>
              <div className="flex items-start gap-3">
                <div className="rounded-[18px] bg-indigo-100 p-3 text-indigo-700">
                  <Landmark className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Next payout
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">
                    Monday, April 20, 2026
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Earnings will be transferred to your bank account after the
                    final review cut-off at 9 AM.
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Update bank details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={`${surfaceCardClassName} p-5 lg:col-span-12`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Recent trips
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              Latest completed rides
            </h2>
          </div>
          <button className="text-sm font-semibold text-sky-700">
            View all
          </button>
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          {recentTrips.map((trip, index) => (
            <motion.article
              key={trip.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <p className="text-sm font-semibold text-slate-950">
                      {trip.from}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-rose-400" />
                    <p className="text-sm font-semibold text-slate-950">
                      {trip.to}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3.5" />
                      {trip.time}
                    </span>
                    <span>{trip.distance}</span>
                    <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-slate-600">
                      {trip.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-slate-950">
                    {formatCurrency(trip.amount)}
                  </p>
                  <ChevronRight className="ml-auto mt-3 size-5 text-slate-400" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
