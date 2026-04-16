import {
  Moon,
  Navigation,
  Sun,
  Volume2,
  VolumeX,
  Wifi,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useDemoAppContext } from "../context/DemoAppContext";
import { softCardClassName } from "../lib/ui";
import { Switch } from "./ui/switch";

interface QuickSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickSettings({ isOpen, onClose }: QuickSettingsProps) {
  const { quickSettings, updateQuickSetting } = useDemoAppContext();

  const settingsList = [
    {
      key: "sound" as const,
      icon: quickSettings.sound ? Volume2 : VolumeX,
      title: "Sound",
      description: "Hear request alerts and safety reminders.",
    },
    {
      key: "navigation" as const,
      icon: Navigation,
      title: "Auto navigation",
      description: "Launch navigation as soon as a ride is accepted.",
    },
    {
      key: "autoAccept" as const,
      icon: Wifi,
      title: "Auto accept",
      description: "Join the next request faster during peak demand.",
    },
    {
      key: "darkMode" as const,
      icon: quickSettings.darkMode ? Moon : Sun,
      title: "Dark mode preference",
      description: "Save your preferred theme mode for future polish passes.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-slate-950/35 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="fixed inset-x-0 bottom-0 z-[61] px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Quick settings"
              className={`mx-auto w-full max-w-md p-6 ${softCardClassName}`}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Driver controls
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-950">
                    Quick settings
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close quick settings"
                  className="rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-3">
                {settingsList.map((item) => {
                  const Icon = item.icon;
                  const isEnabled = quickSettings[item.key];

                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-4 rounded-[22px] border border-slate-200 bg-white/80 px-4 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-2xl p-2.5 ${
                            isEnabled
                              ? "bg-slate-950 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-950">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-5 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) =>
                          updateQuickSetting(item.key, checked)
                        }
                      />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onClose}
                className="mt-6 w-full rounded-[20px] bg-slate-950 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Save and close
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
