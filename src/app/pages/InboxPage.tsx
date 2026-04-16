import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Gift,
  Mail,
  ShieldAlert,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AppShell } from "../components/AppShell";
import { useDemoAppContext } from "../context/DemoAppContext";
import { surfaceCardClassName } from "../lib/ui";

const filters = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
] as const;

export function InboxPage() {
  const navigate = useNavigate();
  const { messages, markAllMessagesRead, toggleMessageRead, unreadCount } =
    useDemoAppContext();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const visibleMessages =
    filter === "unread"
      ? messages.filter((message) => !message.read)
      : messages;

  function getIcon(messageType: (typeof messages)[number]["type"]) {
    switch (messageType) {
      case "promotion":
        return Gift;
      case "alert":
        return ShieldAlert;
      case "success":
        return CheckCircle2;
      default:
        return Bell;
    }
  }

  function getAccent(messageType: (typeof messages)[number]["type"]) {
    switch (messageType) {
      case "promotion":
        return "bg-emerald-100 text-emerald-700";
      case "alert":
        return "bg-rose-100 text-rose-700";
      case "success":
        return "bg-sky-100 text-sky-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <AppShell
      header={
        <div className={`${surfaceCardClassName} overflow-hidden`}>
          <div className="rounded-[30px] bg-white p-6 lg:p-8">
            <div className="flex items-start gap-3">
              <button
                onClick={() => navigate("/")}
                aria-label="Back to home"
                className="rounded-full bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200"
              >
                <ArrowLeft className="size-5" />
              </button>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Inbox
                </p>
                <h1 className="mt-2 text-[28px] font-semibold leading-tight text-slate-950 lg:text-[38px]">
                  Driver messages
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-500 lg:max-w-2xl lg:text-base">
                  Alerts, promotions, and SURG updates all stay here.
                </p>
              </div>
              <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                {unreadCount} unread
              </div>
            </div>
          </div>
        </div>
      }
      contentClassName="space-y-4"
    >
      <section className={`${surfaceCardClassName} p-4`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-2 gap-2 rounded-[22px] bg-slate-100/80 p-1.5">
            {filters.map((item) => {
              const isActive = item.id === filter;

              return (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`rounded-[18px] px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={markAllMessagesRead}
            className="text-sm font-semibold text-sky-700"
          >
            Mark all read
          </button>
        </div>
      </section>

      {visibleMessages.length > 0 ? (
        <section className="grid gap-3 xl:grid-cols-2">
          {visibleMessages.map((message, index) => {
            const Icon = getIcon(message.type);

            return (
              <motion.button
                key={message.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => toggleMessageRead(message.id)}
                className={`${surfaceCardClassName} flex w-full items-start gap-4 p-4 text-left transition hover:-translate-y-0.5 ${
                  message.read ? "" : "ring-1 ring-sky-200"
                }`}
              >
                <div className={`rounded-[18px] p-3 ${getAccent(message.type)}`}>
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold text-slate-950">
                          {message.title}
                        </h2>
                        {!message.read ? (
                          <span className="size-2 rounded-full bg-sky-500" />
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {message.message}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {message.read ? "Read" : "New"}
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-medium text-slate-400">
                    {message.time}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </section>
      ) : (
        <section
          className={`${surfaceCardClassName} px-6 py-12 text-center lg:mx-auto lg:max-w-3xl`}
        >
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Mail className="size-7" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-slate-950">
            {filter === "unread" ? "No unread messages" : "Inbox is empty"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {filter === "unread"
              ? "You have caught up on every current alert."
              : "Important updates, payout notices, and offers will appear here."}
          </p>
          {filter === "unread" ? (
            <button
              onClick={() => setFilter("all")}
              className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View all messages
            </button>
          ) : null}
        </section>
      )}
    </AppShell>
  );
}
