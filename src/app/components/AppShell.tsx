import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { cn } from "./ui/utils";

interface AppShellProps {
  children: ReactNode;
  header?: ReactNode;
  showBottomNav?: boolean;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
}

export function AppShell({
  children,
  header,
  showBottomNav = true,
  className,
  contentClassName,
  headerClassName,
}: AppShellProps) {
  return (
    <>
      <div
        className={cn(
          "relative min-h-screen overflow-hidden bg-[#f4f7fb] pb-[calc(6.5rem+env(safe-area-inset-bottom))]",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(29,78,216,0.16),_transparent_68%)]" />
        <div className="pointer-events-none absolute right-[-4rem] top-28 size-44 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="pointer-events-none absolute left-[-2rem] top-72 size-32 rounded-full bg-emerald-200/40 blur-3xl" />

        {header ? (
          <div className={cn("relative px-4 pt-4", headerClassName)}>
            <div className="mx-auto w-full max-w-md">{header}</div>
          </div>
        ) : null}

        <main
          className={cn(
            "relative mx-auto w-full max-w-md px-4 pb-8",
            header ? "pt-4" : "pt-6",
            contentClassName,
          )}
        >
          {children}
        </main>
      </div>

      {showBottomNav ? <BottomNav /> : null}
    </>
  );
}
