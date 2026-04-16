import {
  ArrowLeft,
  BadgeIndianRupee,
  BookOpen,
  Camera,
  Car,
  ChevronRight,
  CreditCard,
  FileCheck,
  FileText,
  HelpCircle,
  Info,
  LogOut,
  Settings,
  Shield,
  Star,
  User,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AppShell } from "../components/AppShell";
import { useDemoAppContext } from "../context/DemoAppContext";
import { formatCurrency } from "../lib/formatters";
import {
  brandGradientClassName,
  metricTileClassName,
  surfaceCardClassName,
} from "../lib/ui";

const quickActions = [
  {
    icon: HelpCircle,
    title: "Help & Support",
    subtitle: "Talk to support or find trip help.",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    icon: Shield,
    title: "Safety Center",
    subtitle: "Emergency tools and trip safety.",
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Settings,
    title: "Settings",
    subtitle: "Preferences, alerts, and controls.",
    accent: "bg-slate-100 text-slate-700",
  },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { activeDriver, signOut } = useDemoAppContext();

  const menuSections = [
    {
      title: "Manage",
      items: [
        {
          icon: Car,
          label: "My Vehicles",
          value: activeDriver.vehicle,
          badge: "2 saved",
          accent: "bg-violet-100 text-violet-700",
        },
        {
          icon: FileText,
          label: "Documents",
          value: "Insurance and permit review",
          badge: "1 pending",
          accent: "bg-amber-100 text-amber-700",
        },
        {
          icon: CreditCard,
          label: "Insurance",
          value: "Policy active until December",
          accent: "bg-rose-100 text-rose-700",
        },
        {
          icon: BadgeIndianRupee,
          label: "Drive Pass",
          value: activeDriver.drivePass,
          accent: "bg-indigo-100 text-indigo-700",
        },
      ],
    },
    {
      title: "Money",
      items: [
        {
          icon: Wallet,
          label: "Wallet Balance",
          value: formatCurrency(activeDriver.walletBalance),
          accent: "bg-emerald-100 text-emerald-700",
        },
        {
          icon: BadgeIndianRupee,
          label: "Payout Methods",
          value: "HDFC Bank ending in 4523",
          accent: "bg-sky-100 text-sky-700",
        },
        {
          icon: FileCheck,
          label: "Tax Information",
          value: "FY 2025-26 statements ready",
          accent: "bg-amber-100 text-amber-700",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          icon: BookOpen,
          label: "Driver Tips & Info",
          value: "Peak-hour strategies and rider tips",
          accent: "bg-cyan-100 text-cyan-700",
        },
        {
          icon: Info,
          label: "About",
          value: "Driver App v3.2.1 demo build",
          accent: "bg-slate-100 text-slate-700",
        },
      ],
    },
  ];

  return (
    <AppShell
      header={
        <div className={`${surfaceCardClassName} overflow-hidden`}>
          <div
            className={`relative overflow-hidden rounded-[30px] p-6 text-white ${brandGradientClassName}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_34%)]" />
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
                  Driver profile
                </p>
                <h1 className="mt-2 text-[28px] font-semibold leading-tight">
                  Account and driver tools
                </h1>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Keep profile, payouts, documents, and support tools within
                  easy reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
      contentClassName="space-y-4"
    >
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${surfaceCardClassName} p-5`}
      >
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="flex size-20 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_60%,#38bdf8_100%)] text-2xl font-semibold text-white shadow-[0_24px_50px_-28px_rgba(37,99,235,0.65)]">
              {activeDriver.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </div>
            <button
              aria-label="Update profile photo"
              className="absolute -bottom-2 -right-2 rounded-full bg-slate-950 p-2 text-white shadow-lg transition hover:bg-slate-800"
            >
              <Camera className="size-4" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  {activeDriver.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {activeDriver.phone} • {activeDriver.city}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  {activeDriver.vehicle}
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {activeDriver.rating}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className={metricTileClassName}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Trips
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-950">
              {activeDriver.trips.toLocaleString("en-IN")}
            </p>
          </div>
          <div className={metricTileClassName}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Acceptance
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-950">
              {activeDriver.acceptanceRate}%
            </p>
          </div>
          <div className={metricTileClassName}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Completion
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-950">
              {activeDriver.completionRate}%
            </p>
          </div>
        </div>
      </motion.section>

      <section className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Quick actions
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">
            Common driver tools
          </h2>
        </div>
        <div className="grid gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;

            return (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + index * 0.05 }}
                className={`${surfaceCardClassName} flex items-center gap-4 p-4 text-left transition hover:-translate-y-0.5`}
              >
                <div className={`rounded-[18px] p-3 ${action.accent}`}>
                  <Icon className="size-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-950">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{action.subtitle}</p>
                </div>
                <ChevronRight className="size-5 text-slate-400" />
              </motion.button>
            );
          })}
        </div>
      </section>

      {menuSections.map((section, sectionIndex) => (
        <section key={section.title} className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {section.title}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950">
              {section.title === "Manage"
                ? "Vehicle and compliance"
                : section.title === "Money"
                  ? "Wallet, payouts, and tax"
                  : "Learn and app info"}
            </h2>
          </div>

          <div className={`${surfaceCardClassName} overflow-hidden`}>
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + sectionIndex * 0.04 + itemIndex * 0.03,
                  }}
                  className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50/90 last:border-b-0"
                >
                  <div className={`rounded-[18px] p-3 ${item.accent}`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-950">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{item.value}</p>
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {item.badge}
                    </span>
                  ) : null}
                  <ChevronRight className="size-5 text-slate-400" />
                </motion.button>
              );
            })}
          </div>
        </section>
      ))}

      <section className="grid gap-3 pb-2">
        <button
          onClick={signOut}
          className={`${surfaceCardClassName} flex items-center justify-center gap-2 p-4 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5`}
        >
          <User className="size-4" />
          Switch account
        </button>
        <button
          onClick={signOut}
          className="flex items-center justify-center gap-2 rounded-[26px] border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
        >
          <LogOut className="size-4" />
          Logout
        </button>
        <p className="pt-2 text-center text-xs text-slate-400">
          Driver App v3.2.1 • Demo profile state is stored locally
        </p>
      </section>
    </AppShell>
  );
}
