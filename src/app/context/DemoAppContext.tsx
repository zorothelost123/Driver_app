import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import {
  DriverProfile,
  InboxMessage,
  RouteOption,
  demoDrivers,
  initialInboxMessages,
} from "../lib/demo-data";
import { usePersistentState } from "../hooks/usePersistentState";

const STORAGE_KEYS = {
  auth: "driver-app.auth",
  activeDriverId: "driver-app.active-driver",
  onlineStatus: "driver-app.online",
  avoidTraffic: "driver-app.avoid-traffic",
  routeOption: "driver-app.route-option",
  earningsPeriod: "driver-app.earnings-period",
  inboxMessages: "driver-app.inbox-messages",
  quickSettings: "driver-app.quick-settings",
} as const;

export type EarningsPeriod = "week" | "month" | "all";

export interface QuickSettingsState {
  sound: boolean;
  navigation: boolean;
  autoAccept: boolean;
  darkMode: boolean;
}

interface DemoAppContextValue {
  isAuthenticated: boolean;
  activeDriverId: string;
  activeDriver: DriverProfile;
  isOnline: boolean;
  quickSettings: QuickSettingsState;
  avoidTrafficMode: boolean;
  routeOption: RouteOption;
  earningsPeriod: EarningsPeriod;
  messages: InboxMessage[];
  unreadCount: number;
  signInAsDriver: (driverId: string) => void;
  signOut: () => void;
  setIsOnline: (value: boolean) => void;
  updateQuickSetting: (key: keyof QuickSettingsState, value: boolean) => void;
  setAvoidTrafficMode: (value: boolean) => void;
  setRouteOption: (value: RouteOption) => void;
  setEarningsPeriod: (value: EarningsPeriod) => void;
  markMessageRead: (messageId: string) => void;
  toggleMessageRead: (messageId: string) => void;
  markAllMessagesRead: () => void;
  setMessages: Dispatch<SetStateAction<InboxMessage[]>>;
}

const DemoAppContext = createContext<DemoAppContextValue | null>(null);

const defaultQuickSettings: QuickSettingsState = {
  sound: true,
  navigation: true,
  autoAccept: false,
  darkMode: false,
};

export function DemoAppProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = usePersistentState(
    STORAGE_KEYS.auth,
    true,
  );
  const [activeDriverId, setActiveDriverId] = usePersistentState(
    STORAGE_KEYS.activeDriverId,
    demoDrivers[0].id,
  );
  const [isOnline, setIsOnline] = usePersistentState(
    STORAGE_KEYS.onlineStatus,
    false,
  );
  const [quickSettings, setQuickSettings] = usePersistentState(
    STORAGE_KEYS.quickSettings,
    defaultQuickSettings,
  );
  const [avoidTrafficMode, setAvoidTrafficMode] = usePersistentState(
    STORAGE_KEYS.avoidTraffic,
    true,
  );
  const [routeOption, setRouteOption] = usePersistentState<RouteOption>(
    STORAGE_KEYS.routeOption,
    "lowTraffic",
  );
  const [earningsPeriod, setEarningsPeriod] =
    usePersistentState<EarningsPeriod>(STORAGE_KEYS.earningsPeriod, "week");
  const [messages, setMessages] = usePersistentState<InboxMessage[]>(
    STORAGE_KEYS.inboxMessages,
    initialInboxMessages,
  );

  const activeDriver =
    demoDrivers.find((driver) => driver.id === activeDriverId) ?? demoDrivers[0];
  const unreadCount = messages.filter((message) => !message.read).length;

  function signInAsDriver(driverId: string) {
    setActiveDriverId(driverId);
    setIsAuthenticated(true);
  }

  function signOut() {
    setIsOnline(false);
    setIsAuthenticated(false);
  }

  function updateQuickSetting(key: keyof QuickSettingsState, value: boolean) {
    setQuickSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  }

  function markMessageRead(messageId: string) {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId ? { ...message, read: true } : message,
      ),
    );
  }

  function toggleMessageRead(messageId: string) {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId
          ? { ...message, read: !message.read }
          : message,
      ),
    );
  }

  function markAllMessagesRead() {
    setMessages((currentMessages) =>
      currentMessages.map((message) => ({ ...message, read: true })),
    );
  }

  return (
    <DemoAppContext.Provider
      value={{
        isAuthenticated,
        activeDriverId,
        activeDriver,
        isOnline,
        quickSettings,
        avoidTrafficMode,
        routeOption,
        earningsPeriod,
        messages,
        unreadCount,
        signInAsDriver,
        signOut,
        setIsOnline,
        updateQuickSetting,
        setAvoidTrafficMode,
        setRouteOption,
        setEarningsPeriod,
        markMessageRead,
        toggleMessageRead,
        markAllMessagesRead,
        setMessages,
      }}
    >
      {children}
    </DemoAppContext.Provider>
  );
}

export function useDemoAppContext() {
  const context = useContext(DemoAppContext);

  if (!context) {
    throw new Error("useDemoAppContext must be used inside DemoAppProvider");
  }

  return context;
}
