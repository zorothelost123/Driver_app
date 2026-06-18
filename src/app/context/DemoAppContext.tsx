import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import {
  ActiveTrip,
  DriverProfile,
  DriverSessionMetrics,
  InboxMessage,
  RecentTrip,
  RideRequest,
  RouteOption,
  ShiftPlanningMode,
  WorkspaceZone,
  demoDrivers,
  getCityDemandProfile,
  initialDriverSessionMetrics,
  initialInboxMessages,
} from "../lib/demo-data";

const defaultCityProfile = getCityDemandProfile(demoDrivers[0].city);

const STORAGE_KEYS = {
  auth: "driver-app.auth",
  activeDriverId: "driver-app.active-driver",
  operatingCity: "driver-app.operating-city",
  onlineStatus: "driver-app.online",
  avoidTraffic: "driver-app.avoid-traffic",
  routeOption: "driver-app.route-option",
  earningsPeriod: "driver-app.earnings-period",
  inboxMessages: "driver-app.inbox-messages",
  quickSettings: "driver-app.quick-settings",
  rideRequestCursor: "driver-app.ride-request-cursor",
  currentRideRequest: "driver-app.current-ride-request",
  activeTrip: "driver-app.active-trip",
  sessionMetrics: "driver-app.session-metrics",
  sessionTrips: "driver-app.session-trips",
  locationPermission: "driver-app.location-permission",
  workspaceZoneId: "driver-app.workspace-zone-id",
  shiftPlanningMode: "driver-app.shift-planning-mode",
} as const;

export type EarningsPeriod = "week" | "month" | "all";
export type LocationPermissionState = "prompt" | "granted";

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
  operatingCity: string;
  currentWorkspaceZone: WorkspaceZone;
  locationPermission: LocationPermissionState;
  isAuthenticatedForDispatch: boolean;
  isOnline: boolean;
  canGoOffline: boolean;
  canSwitchOperatingCity: boolean;
  quickSettings: QuickSettingsState;
  shiftPlanningMode: ShiftPlanningMode;
  avoidTrafficMode: boolean;
  routeOption: RouteOption;
  earningsPeriod: EarningsPeriod;
  messages: InboxMessage[];
  unreadCount: number;
  currentRideRequest: RideRequest | null;
  activeTrip: ActiveTrip | null;
  sessionMetrics: DriverSessionMetrics;
  sessionTrips: RecentTrip[];
  signInAsDriver: (driverId: string) => void;
  signOut: () => void;
  setIsOnline: (value: boolean) => void;
  setOperatingCity: (city: string) => void;
  grantLocationAccess: () => void;
  selectWorkspaceZone: (zoneId: string) => void;
  updateQuickSetting: (key: keyof QuickSettingsState, value: boolean) => void;
  setShiftPlanningMode: (value: ShiftPlanningMode) => void;
  setAvoidTrafficMode: (value: boolean) => void;
  setRouteOption: (value: RouteOption) => void;
  setEarningsPeriod: (value: EarningsPeriod) => void;
  markMessageRead: (messageId: string) => void;
  toggleMessageRead: (messageId: string) => void;
  markAllMessagesRead: () => void;
  setMessages: Dispatch<SetStateAction<InboxMessage[]>>;
  simulateRideRequest: () => void;
  declineRideRequest: () => void;
  acceptRideRequest: () => void;
  cancelActiveTrip: () => void;
  markPickedUp: () => void;
  completeActiveTrip: () => void;
}

const DemoAppContext = createContext<DemoAppContextValue | null>(null);

const defaultQuickSettings: QuickSettingsState = {
  sound: true,
  navigation: true,
  autoAccept: false,
  darkMode: false,
};

function getDefaultShiftPlanningMode(): ShiftPlanningMode {
  return new Date().getHours() >= 14 ? "evening" : "morning";
}

export function DemoAppProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = usePersistentState(
    STORAGE_KEYS.auth,
    true,
  );
  const [activeDriverId, setActiveDriverId] = usePersistentState(
    STORAGE_KEYS.activeDriverId,
    demoDrivers[0].id,
  );
  const [operatingCity, setOperatingCityState] = usePersistentState(
    STORAGE_KEYS.operatingCity,
    demoDrivers[0].city,
  );
  const [onlineStatus, setOnlineStatus] = usePersistentState(
    STORAGE_KEYS.onlineStatus,
    false,
  );
  const [quickSettings, setQuickSettings] = usePersistentState(
    STORAGE_KEYS.quickSettings,
    defaultQuickSettings,
  );
  const [shiftPlanningMode, setShiftPlanningMode] =
    usePersistentState<ShiftPlanningMode>(
      STORAGE_KEYS.shiftPlanningMode,
      getDefaultShiftPlanningMode(),
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
  const [rideRequestCursor, setRideRequestCursor] = usePersistentState(
    STORAGE_KEYS.rideRequestCursor,
    0,
  );
  const [currentRideRequest, setCurrentRideRequest] =
    usePersistentState<RideRequest | null>(STORAGE_KEYS.currentRideRequest, null);
  const [activeTrip, setActiveTrip] = usePersistentState<ActiveTrip | null>(
    STORAGE_KEYS.activeTrip,
    null,
  );
  const [sessionMetrics, setSessionMetrics] =
    usePersistentState<DriverSessionMetrics>(
      STORAGE_KEYS.sessionMetrics,
      initialDriverSessionMetrics,
    );
  const [sessionTrips, setSessionTrips] = usePersistentState<RecentTrip[]>(
    STORAGE_KEYS.sessionTrips,
    [],
  );
  const [locationPermission, setLocationPermission] =
    usePersistentState<LocationPermissionState>(
      STORAGE_KEYS.locationPermission,
      "prompt",
    );
  const [workspaceZoneId, setWorkspaceZoneId] = usePersistentState(
    STORAGE_KEYS.workspaceZoneId,
    defaultCityProfile.defaultWorkspaceZoneId,
  );

  const activeDriver =
    demoDrivers.find((driver) => driver.id === activeDriverId) ?? demoDrivers[0];
  const cityProfile = getCityDemandProfile(operatingCity);
  const currentWorkspaceZone =
    cityProfile.workspaceZones.find((zone) => zone.id === workspaceZoneId) ??
    cityProfile.workspaceZones.find(
      (zone) => zone.id === cityProfile.defaultWorkspaceZoneId,
    ) ??
    cityProfile.workspaceZones[0];
  const unreadCount = messages.filter((message) => !message.read).length;
  const canGoOffline = activeTrip === null;
  const canSwitchOperatingCity = currentRideRequest === null && activeTrip === null;
  const isAuthenticatedForDispatch =
    isAuthenticated && locationPermission === "granted";

  function prependMessage(message: InboxMessage) {
    setMessages((currentMessages) => [message, ...currentMessages].slice(0, 12));
  }

  function clearRideFlow() {
    setCurrentRideRequest(null);
    setActiveTrip(null);
  }

  function resetWorkspaceZoneForCity(city: string) {
    const nextProfile = getCityDemandProfile(city);
    setWorkspaceZoneId(nextProfile.defaultWorkspaceZoneId);
  }

  function signInAsDriver(driverId: string) {
    clearRideFlow();
    setActiveDriverId(driverId);
    const selectedDriver =
      demoDrivers.find((driver) => driver.id === driverId) ?? demoDrivers[0];
    setOperatingCityState(selectedDriver.city);
    resetWorkspaceZoneForCity(selectedDriver.city);
    setOnlineStatus(false);
    setLocationPermission("prompt");
    setIsAuthenticated(true);
  }

  function signOut() {
    clearRideFlow();
    setOnlineStatus(false);
    setIsAuthenticated(false);
  }

  function setIsOnline(value: boolean) {
    if (!value && activeTrip) {
      return;
    }

    if (!value) {
      setCurrentRideRequest(null);
    }

    setOnlineStatus(value);
  }

  function setOperatingCity(city: string) {
    if (!canSwitchOperatingCity) {
      return;
    }

    setOperatingCityState(city);
    resetWorkspaceZoneForCity(city);
    setCurrentRideRequest(null);
    prependMessage({
      id: `city-switch-${Date.now()}`,
      type: "notification",
      title: "Operating city updated",
      message: `SURG is now showing live driver demand guidance for ${city}.`,
      time: "Just now",
      read: false,
    });
  }

  function grantLocationAccess() {
    setLocationPermission("granted");
    prependMessage({
      id: `location-granted-${Date.now()}`,
      type: "success",
      title: "Location synced",
      message: `Workspace zone locked near ${currentWorkspaceZone.landmark} in ${operatingCity}.`,
      time: "Just now",
      read: false,
    });
  }

  function selectWorkspaceZone(zoneId: string) {
    setWorkspaceZoneId(zoneId);

    if (locationPermission !== "granted") {
      setLocationPermission("granted");
    }

    setCurrentRideRequest(null);
    prependMessage({
      id: `zone-switch-${Date.now()}`,
      type: "notification",
      title: "Workspace zone updated",
      message: `Driver demand guidance is now focused on ${cityProfile.workspaceZones.find((zone) => zone.id === zoneId)?.name ?? "the selected zone"}.`,
      time: "Just now",
      read: false,
    });
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

  function simulateRideRequest() {
    if (
      !onlineStatus ||
      currentRideRequest ||
      activeTrip ||
      locationPermission !== "granted"
    ) {
      return;
    }

    const workspaceRidePool = cityProfile.rideRequests.filter((request) =>
      currentWorkspaceZone.sampleRideRequestIds.includes(request.id),
    );
    const ridePool =
      workspaceRidePool.length > 0 ? workspaceRidePool : cityProfile.rideRequests;
    const nextRequest = ridePool[rideRequestCursor % ridePool.length];

    setRideRequestCursor((currentCursor) => currentCursor + 1);

    if (quickSettings.autoAccept) {
      setActiveTrip({ ...nextRequest, stage: "pickup" });
      prependMessage({
        id: `dispatch-${Date.now()}`,
        type: "notification",
        title: "Auto-accepted booking",
        message: `Heading to ${nextRequest.pickupLabel} from your ${currentWorkspaceZone.name}.`,
        time: "Just now",
        read: false,
      });
      return;
    }

    setCurrentRideRequest(nextRequest);
  }

  function declineRideRequest() {
    setCurrentRideRequest(null);
  }

  function acceptRideRequest() {
    if (!currentRideRequest) {
      return;
    }

    setActiveTrip({ ...currentRideRequest, stage: "pickup" });
    setCurrentRideRequest(null);
    prependMessage({
      id: `accepted-${Date.now()}`,
      type: "notification",
      title: "Booking accepted",
      message: `Pickup locked in for ${currentRideRequest.riderName} at ${currentRideRequest.pickupLabel}.`,
      time: "Just now",
      read: false,
    });
  }

  function cancelActiveTrip() {
    if (!activeTrip) {
      return;
    }

    prependMessage({
      id: `cancelled-${Date.now()}`,
      type: "alert",
      title: "Booking cancelled",
      message: `The active dispatch for ${activeTrip.riderName} has been cleared.`,
      time: "Just now",
      read: false,
    });
    setActiveTrip(null);
  }

  function markPickedUp() {
    if (!activeTrip || activeTrip.stage === "dropoff") {
      return;
    }

    setActiveTrip({ ...activeTrip, stage: "dropoff" });
    prependMessage({
      id: `picked-up-${Date.now()}`,
      type: "notification",
      title: "Customer picked up",
      message: `Trip to ${activeTrip.dropoffLabel} is now in progress.`,
      time: "Just now",
      read: false,
    });
  }

  function completeActiveTrip() {
    if (!activeTrip) {
      return;
    }

    const completedTrip: RecentTrip = {
      id: `${activeTrip.id}-completed-${Date.now()}`,
      from: activeTrip.pickupLabel,
      to: activeTrip.dropoffLabel,
      amount: activeTrip.fare,
      time: "Just now",
      distance: `${activeTrip.tripDistanceKm.toFixed(1)} km`,
      status: "Completed",
    };

    setSessionTrips((currentTrips) => [completedTrip, ...currentTrips].slice(0, 6));
    setSessionMetrics((currentMetrics) => ({
      todayEarnings: currentMetrics.todayEarnings + activeTrip.fare,
      todayTrips: currentMetrics.todayTrips + 1,
    }));
    prependMessage({
      id: `completed-${Date.now()}`,
      type: "success",
      title: "Trip completed",
      message: `You earned ${activeTrip.fare} rupees from ${activeTrip.pickupLabel} to ${activeTrip.dropoffLabel}.`,
      time: "Just now",
      read: false,
    });
    setActiveTrip(null);
  }

  return (
    <DemoAppContext.Provider
      value={{
        isAuthenticated,
        activeDriverId,
        activeDriver,
        operatingCity,
        currentWorkspaceZone,
        locationPermission,
        isAuthenticatedForDispatch,
        isOnline: onlineStatus,
        canGoOffline,
        canSwitchOperatingCity,
        quickSettings,
        shiftPlanningMode,
        avoidTrafficMode,
        routeOption,
        earningsPeriod,
        messages,
        unreadCount,
        currentRideRequest,
        activeTrip,
        sessionMetrics,
        sessionTrips,
        signInAsDriver,
        signOut,
        setIsOnline,
        setOperatingCity,
        grantLocationAccess,
        selectWorkspaceZone,
        updateQuickSetting,
        setShiftPlanningMode,
        setAvoidTrafficMode,
        setRouteOption,
        setEarningsPeriod,
        markMessageRead,
        toggleMessageRead,
        markAllMessagesRead,
        setMessages,
        simulateRideRequest,
        declineRideRequest,
        acceptRideRequest,
        cancelActiveTrip,
        markPickedUp,
        completeActiveTrip,
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
