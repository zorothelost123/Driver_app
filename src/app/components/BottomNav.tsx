import { Home, Inbox, TrendingUp, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useDemoAppContext } from "../context/DemoAppContext";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOnline, unreadCount } = useDemoAppContext();

  const navItems = [
    { icon: Home, label: "Home", path: "/", badge: isOnline ? "Live" : undefined },
    { icon: TrendingUp, label: "Earnings", path: "/earnings" },
    { icon: Inbox, label: "Inbox", path: "/inbox", badge: unreadCount > 0 ? `${unreadCount}` : undefined },
    { icon: User, label: "Account", path: "/profile" },
  ];

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:hidden">
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto mx-auto flex w-full max-w-md items-center gap-2 rounded-[30px] border border-white/80 bg-white/88 p-2 shadow-[0_28px_70px_-34px_rgba(15,23,42,0.42)] backdrop-blur-xl"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-14 flex-1 flex-col items-center justify-center gap-1 rounded-[22px] transition-all ${
                  isActive
                    ? "bg-slate-950 text-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.8)]"
                    : "text-slate-500 hover:bg-slate-100/80"
                }`}
              >
                <Icon className="size-5" />
                <span className="text-[11px] font-semibold tracking-wide">
                  {item.label}
                </span>
                {item.badge ? (
                  <span
                    className={`absolute right-3 top-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      item.path === "/"
                        ? "bg-emerald-100 text-emerald-700"
                        : isActive
                          ? "bg-white/18 text-white"
                          : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pointer-events-none fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block xl:left-5">
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto w-24 rounded-[32px] border border-white/80 bg-white/88 p-3 shadow-[0_28px_70px_-34px_rgba(15,23,42,0.42)] backdrop-blur-xl xl:w-28"
        >
          <div className="mb-4 rounded-[24px] bg-slate-950 px-3 py-4 text-center text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Driver
            </p>
            <p className="mt-1 text-sm font-semibold">SURG</p>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex w-full flex-col items-center justify-center gap-1 rounded-[22px] px-2 py-3 text-center transition-all ${
                    isActive
                      ? "bg-slate-950 text-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.8)]"
                      : "text-slate-500 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="text-[11px] font-semibold leading-tight tracking-wide">
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span
                      className={`absolute right-2 top-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                        item.path === "/"
                          ? "bg-emerald-100 text-emerald-700"
                          : isActive
                            ? "bg-white/18 text-white"
                            : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-[20px] bg-slate-100 px-2 py-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Status
            </p>
            <p className={`mt-1 text-xs font-semibold ${isOnline ? "text-emerald-700" : "text-slate-600"}`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
