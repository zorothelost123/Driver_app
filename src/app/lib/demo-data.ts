export interface DriverProfile {
  id: string;
  name: string;
  city: string;
  phone: string;
  rating: number;
  trips: number;
  acceptanceRate: number;
  completionRate: number;
  experienceYears: number;
  vehicle: string;
  walletBalance: number;
  shiftGoal: number;
  drivePass: "Active" | "Renew Soon";
}

export type ShiftPlanningMode = "morning" | "evening";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  accent: "green" | "blue" | "amber";
  stat: string;
  shiftModes: ShiftPlanningMode[];
}

export interface DemandZone {
  id: string;
  name: string;
  demand: "high" | "medium" | "low";
  distanceKm: number;
  etaMinutes: number;
  earningsPerHour: number;
  waitTimeLabel: string;
  hotspotScore: number;
  note: string;
  coordinates: {
    top: string;
    left: string;
    size: number;
  };
}

export type RouteOption = "fastest" | "lowTraffic" | "fuelEfficient";

export interface RouteOptionConfig {
  id: RouteOption;
  label: string;
  summary: string;
  etaLabel: string;
  fuelLabel: string;
}

export interface InboxMessage {
  id: string;
  type: "promotion" | "alert" | "notification" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface WeeklyEarning {
  day: string;
  amount: number;
  trips: number;
  hours: number;
}

export interface RecentTrip {
  id: string;
  from: string;
  to: string;
  amount: number;
  time: string;
  distance: string;
  status: "Completed" | "Payout Pending";
}

export interface RideRequest {
  id: string;
  riderName: string;
  riderRating: number;
  pickupLabel: string;
  dropoffLabel: string;
  pickupDistanceKm: number;
  pickupEtaMinutes: number;
  tripDistanceKm: number;
  tripEtaMinutes: number;
  fare: number;
  paymentMethod: string;
  tag: string;
  note: string;
}

export type ActiveTripStage = "pickup" | "dropoff";

export interface ActiveTrip extends RideRequest {
  stage: ActiveTripStage;
}

export interface DriverSessionMetrics {
  todayEarnings: number;
  todayTrips: number;
}

export interface PeakWindow {
  id: string;
  label: string;
  timeRange: string;
  demandTone: string;
  hotspots: string[];
  insight: string;
  shiftModes: ShiftPlanningMode[];
}

export interface ShiftPlan {
  id: ShiftPlanningMode;
  label: string;
  timeRange: string;
  corridorLabel: string;
  summary: string;
  actionLabel: string;
  focusZoneIds: string[];
  routePath: string;
  alternatePath: string;
}

export interface WorkspaceZone {
  id: string;
  name: string;
  landmark: string;
  bestWindow: string;
  demandSummary: string;
  coverageAreas: string[];
  sampleRideRequestIds: string[];
}

export interface CityDemandProfile {
  city: string;
  liveLocationLabel: string;
  liveLocationHint: string;
  defaultWorkspaceZoneId: string;
  workspaceZones: WorkspaceZone[];
  shiftPlans: ShiftPlan[];
  opportunities: Opportunity[];
  zones: DemandZone[];
  rideRequests: RideRequest[];
  peakWindows: PeakWindow[];
}

export const demoDrivers: DriverProfile[] = [
  {
    id: "rajesh",
    name: "Rajesh Kumar",
    city: "Bengaluru",
    phone: "+91 98765 43210",
    rating: 4.8,
    trips: 2450,
    acceptanceRate: 85,
    completionRate: 98,
    experienceYears: 4.2,
    vehicle: "Maruti Suzuki Dzire",
    walletBalance: 1245,
    shiftGoal: 2200,
    drivePass: "Active",
  },
  {
    id: "meera",
    name: "Meera Nair",
    city: "Hyderabad",
    phone: "+91 99887 66554",
    rating: 4.9,
    trips: 1810,
    acceptanceRate: 89,
    completionRate: 99,
    experienceYears: 3.6,
    vehicle: "Hyundai Aura",
    walletBalance: 1680,
    shiftGoal: 2500,
    drivePass: "Renew Soon",
  },
];

export const homeRequiredActions = [
  {
    id: "terms",
    title: "Action needed",
    description:
      "Accept the updated driver agreement before tonight's peak window.",
    cta: "Review now",
  },
];

const bengaluruProfile: CityDemandProfile = {
  city: "Bengaluru",
  liveLocationLabel: "Near Marathahalli Bridge",
  liveLocationHint: "Fast access to ORR office demand and airport feeders",
  defaultWorkspaceZoneId: "blr-marathahalli-core",
  workspaceZones: [
    {
      id: "blr-marathahalli-core",
      name: "Marathahalli Work Zone",
      landmark: "Outer Ring Road / Marathahalli Bridge",
      bestWindow: "7:00 AM to 11:00 AM",
      demandSummary: "Best for office-entry demand and short pickup cycles.",
      coverageAreas: ["Marathahalli", "Bellandur", "Kadubeesanahalli"],
      sampleRideRequestIds: ["blr-ride-101", "blr-ride-103"],
    },
    {
      id: "blr-silk-board-exit",
      name: "Silk Board Exit Zone",
      landmark: "Silk Board Junction corridor",
      bestWindow: "4:30 PM to 8:00 PM",
      demandSummary: "Strong return-home demand as offices begin to empty.",
      coverageAreas: ["Silk Board", "HSR Layout", "BTM Layout"],
      sampleRideRequestIds: ["blr-ride-102"],
    },
    {
      id: "blr-whitefield-campus",
      name: "Whitefield Campus Zone",
      landmark: "Whitefield IT Park",
      bestWindow: "8:00 AM to 10:30 AM",
      demandSummary: "Longer campus trips with premium office-side fares.",
      coverageAreas: ["Whitefield", "ITPL", "Brookefield"],
      sampleRideRequestIds: ["blr-ride-101"],
    },
  ],
  opportunities: [
    {
      id: "blr-orr-boost",
      title: "ORR commute surge is forming",
      description:
        "Morning office demand is building across Marathahalli, Bellandur, and Kadubeesanahalli.",
      accent: "green",
      stat: "7 AM to 11 AM",
      shiftModes: ["morning"],
    },
    {
      id: "blr-evening-exit",
      title: "Silk Board evening exit flow",
      description:
        "Return traffic is likely to raise short-trip booking volume after 4:30 PM.",
      accent: "blue",
      stat: "4:30 PM to 8 PM",
      shiftModes: ["evening"],
    },
    {
      id: "blr-airport",
      title: "Airport corridor demand",
      description:
        "Late evening airport runs are paying better with lighter traffic after peak exits.",
      accent: "amber",
      stat: "After 8 PM",
      shiftModes: ["evening"],
    },
  ],
  shiftPlans: [
    {
      id: "morning",
      label: "Morning office mode",
      timeRange: "7:00 AM to 11:00 AM",
      corridorLabel: "ORR office corridor",
      summary:
        "Bias the driver toward Marathahalli, Bellandur, and Whitefield feeders where office-entry demand forms fastest.",
      actionLabel: "Stage near metro exits and office gates before 8:30 AM.",
      focusZoneIds: ["marathahalli", "whitefield-it-park"],
      routePath: "M 18 70 C 28 58, 44 38, 67 23",
      alternatePath: "M 20 74 C 34 66, 46 48, 58 34",
    },
    {
      id: "evening",
      label: "Evening return mode",
      timeRange: "4:30 PM to 8:00 PM",
      corridorLabel: "Silk Board return corridor",
      summary:
        "Bias the driver toward Silk Board, HSR, and JP Nagar where office-exit demand turns into repeated short cycles.",
      actionLabel: "Stay near exit roads from 5 PM so the next trip stacks quickly.",
      focusZoneIds: ["silk-board", "jp-nagar"],
      routePath: "M 68 22 C 55 36, 38 54, 22 70",
      alternatePath: "M 72 28 C 60 44, 46 60, 30 74",
    },
  ],
  zones: [
    {
      id: "marathahalli",
      name: "Marathahalli",
      demand: "high",
      distanceKm: 2.5,
      etaMinutes: 7,
      earningsPerHour: 360,
      waitTimeLabel: "3 min wait",
      hotspotScore: 95,
      note: "Strong office commute demand with frequent short pickups.",
      coordinates: { top: "22%", left: "67%", size: 88 },
    },
    {
      id: "silk-board",
      name: "Silk Board",
      demand: "high",
      distanceKm: 4.1,
      etaMinutes: 11,
      earningsPerHour: 340,
      waitTimeLabel: "4 min wait",
      hotspotScore: 91,
      note: "Heavy rider demand during office entry and evening return waves.",
      coordinates: { top: "62%", left: "22%", size: 96 },
    },
    {
      id: "whitefield-it-park",
      name: "Whitefield IT Park",
      demand: "medium",
      distanceKm: 6.4,
      etaMinutes: 15,
      earningsPerHour: 250,
      waitTimeLabel: "7 min wait",
      hotspotScore: 77,
      note: "Premium office trips with a slightly longer approach.",
      coordinates: { top: "28%", left: "22%", size: 74 },
    },
    {
      id: "jp-nagar",
      name: "JP Nagar",
      demand: "medium",
      distanceKm: 5.7,
      etaMinutes: 14,
      earningsPerHour: 220,
      waitTimeLabel: "9 min wait",
      hotspotScore: 71,
      note: "Residential demand rises sharply during evening return hours.",
      coordinates: { top: "74%", left: "60%", size: 68 },
    },
    {
      id: "hebbal",
      name: "Hebbal",
      demand: "low",
      distanceKm: 7.2,
      etaMinutes: 16,
      earningsPerHour: 165,
      waitTimeLabel: "12 min wait",
      hotspotScore: 52,
      note: "Demand picks up later with airport and north-corridor rides.",
      coordinates: { top: "78%", left: "78%", size: 56 },
    },
  ],
  rideRequests: [
    {
      id: "blr-ride-101",
      riderName: "Ananya",
      riderRating: 4.9,
      pickupLabel: "Marathahalli Bridge",
      dropoffLabel: "Bellandur Ecospace",
      pickupDistanceKm: 1.4,
      pickupEtaMinutes: 4,
      tripDistanceKm: 6.1,
      tripEtaMinutes: 18,
      fare: 214,
      paymentMethod: "UPI",
      tag: "Office commute",
      note: "A nearby customer booking surfaced from the ORR office corridor.",
    },
    {
      id: "blr-ride-102",
      riderName: "Vikram",
      riderRating: 4.8,
      pickupLabel: "HSR Layout 27th Main",
      dropoffLabel: "Silk Board Junction",
      pickupDistanceKm: 2.2,
      pickupEtaMinutes: 6,
      tripDistanceKm: 7.8,
      tripEtaMinutes: 20,
      fare: 246,
      paymentMethod: "Cash",
      tag: "Peak exit flow",
      note: "This booking matches a known evening return-demand pattern.",
    },
    {
      id: "blr-ride-103",
      riderName: "Sana",
      riderRating: 5.0,
      pickupLabel: "Kadubeesanahalli Signal",
      dropoffLabel: "Kempegowda Airport Road",
      pickupDistanceKm: 2.8,
      pickupEtaMinutes: 8,
      tripDistanceKm: 13.6,
      tripEtaMinutes: 31,
      fare: 382,
      paymentMethod: "Card",
      tag: "Airport run",
      note: "Longer airport fare triggered from a high-value demand corridor.",
    },
  ],
  peakWindows: [
    {
      id: "blr-morning",
      label: "Morning commute",
      timeRange: "7:00 AM to 11:00 AM",
      demandTone: "Office entry peak",
      hotspots: ["Marathahalli", "Bellandur", "Whitefield IT Park"],
      insight:
        "Prioritize office corridors where riders are booking faster than average.",
      shiftModes: ["morning"],
    },
    {
      id: "blr-evening",
      label: "Evening return",
      timeRange: "4:30 PM to 8:00 PM",
      demandTone: "Office exit peak",
      hotspots: ["Silk Board", "HSR Layout", "JP Nagar"],
      insight:
        "Shorter return trips stack quickly when office parks begin to clear out.",
      shiftModes: ["evening"],
    },
    {
      id: "blr-late",
      label: "Late airport demand",
      timeRange: "8:00 PM to 10:30 PM",
      demandTone: "Airport and hotel rides",
      hotspots: ["Hebbal", "Manyata", "Airport corridor"],
      insight:
        "Traffic eases while longer-fare requests become more attractive.",
      shiftModes: ["evening"],
    },
  ],
};

const hyderabadProfile: CityDemandProfile = {
  city: "Hyderabad",
  liveLocationLabel: "Near HITEC City flyover",
  liveLocationHint: "Best placed for tech park dispatch and evening return rides",
  defaultWorkspaceZoneId: "hyd-hitec-core",
  workspaceZones: [
    {
      id: "hyd-hitec-core",
      name: "HITEC Core Zone",
      landmark: "Cyber Towers / HITEC flyover",
      bestWindow: "7:30 AM to 11:00 AM",
      demandSummary: "Strong office-entry demand around tech towers and metro exits.",
      coverageAreas: ["HITEC City", "Madhapur", "Raidurgam"],
      sampleRideRequestIds: ["hyd-ride-201", "hyd-ride-203"],
    },
    {
      id: "hyd-raidurgam-loop",
      name: "Raidurgam Loop",
      landmark: "Raidurg metro and office edge",
      bestWindow: "5:00 PM to 8:00 PM",
      demandSummary: "Excellent for evening return trips leaving the tech parks.",
      coverageAreas: ["Raidurgam", "Gachibowli", "Kondapur"],
      sampleRideRequestIds: ["hyd-ride-202"],
    },
    {
      id: "hyd-financial-district",
      name: "Financial District Zone",
      landmark: "Financial District office gate",
      bestWindow: "8:30 AM to 10:30 AM",
      demandSummary: "Longer premium office rides with cleaner road segments.",
      coverageAreas: ["Financial District", "Nanakramguda", "Gachibowli"],
      sampleRideRequestIds: ["hyd-ride-203"],
    },
  ],
  opportunities: [
    {
      id: "hyd-tech-peak",
      title: "HITEC City office start rush",
      description:
        "Morning bookings are clustering around Raidurgam, Madhapur, and Gachibowli.",
      accent: "green",
      stat: "7:30 AM to 11 AM",
      shiftModes: ["morning"],
    },
    {
      id: "hyd-evening-return",
      title: "Evening tech park exits",
      description:
        "Return rides increase sharply when offices begin to release around 5 PM.",
      accent: "blue",
      stat: "5 PM to 8 PM",
      shiftModes: ["evening"],
    },
    {
      id: "hyd-financial-district",
      title: "Financial District premium runs",
      description:
        "Longer fares are surfacing from office campuses with better payout potential.",
      accent: "amber",
      stat: "High-value corridor",
      shiftModes: ["evening"],
    },
  ],
  shiftPlans: [
    {
      id: "morning",
      label: "Morning tech park mode",
      timeRange: "7:30 AM to 11:00 AM",
      corridorLabel: "HITEC office corridor",
      summary:
        "Bias the driver toward HITEC City, Madhapur, and Raidurgam where the metro and office towers generate the earliest demand.",
      actionLabel: "Anchor near Cyber Towers before towers fully open for smoother pickups.",
      focusZoneIds: ["hitec-city", "raidurgam"],
      routePath: "M 18 68 C 28 54, 44 34, 66 20",
      alternatePath: "M 22 74 C 36 62, 48 46, 58 30",
    },
    {
      id: "evening",
      label: "Evening return mode",
      timeRange: "5:00 PM to 8:00 PM",
      corridorLabel: "Raidurgam return corridor",
      summary:
        "Bias the driver toward Raidurgam, Gachibowli, and Financial District as office exits turn into steady return-home bookings.",
      actionLabel: "Stay on the tech-park edge to catch fast repeat bookings after 5 PM.",
      focusZoneIds: ["raidurgam", "financial-district"],
      routePath: "M 67 22 C 58 38, 42 56, 24 70",
      alternatePath: "M 72 28 C 60 46, 48 60, 30 74",
    },
  ],
  zones: [
    {
      id: "hitec-city",
      name: "HITEC City",
      demand: "high",
      distanceKm: 2.1,
      etaMinutes: 6,
      earningsPerHour: 345,
      waitTimeLabel: "3 min wait",
      hotspotScore: 94,
      note: "Core tech-corridor demand with fast repeat bookings.",
      coordinates: { top: "20%", left: "66%", size: 86 },
    },
    {
      id: "raidurgam",
      name: "Raidurgam",
      demand: "high",
      distanceKm: 3.0,
      etaMinutes: 8,
      earningsPerHour: 330,
      waitTimeLabel: "4 min wait",
      hotspotScore: 90,
      note: "Strong morning office traffic and reliable evening return volume.",
      coordinates: { top: "60%", left: "20%", size: 96 },
    },
    {
      id: "gachibowli",
      name: "Gachibowli",
      demand: "medium",
      distanceKm: 4.2,
      etaMinutes: 11,
      earningsPerHour: 245,
      waitTimeLabel: "7 min wait",
      hotspotScore: 76,
      note: "Longer office and campus trips with solid payout potential.",
      coordinates: { top: "26%", left: "22%", size: 74 },
    },
    {
      id: "financial-district",
      name: "Financial District",
      demand: "medium",
      distanceKm: 5.6,
      etaMinutes: 13,
      earningsPerHour: 228,
      waitTimeLabel: "8 min wait",
      hotspotScore: 72,
      note: "Best during office changeovers and airport transfer windows.",
      coordinates: { top: "72%", left: "61%", size: 68 },
    },
    {
      id: "kondapur",
      name: "Kondapur",
      demand: "low",
      distanceKm: 4.8,
      etaMinutes: 12,
      earningsPerHour: 168,
      waitTimeLabel: "11 min wait",
      hotspotScore: 50,
      note: "Demand strengthens near meal hours and office exit periods.",
      coordinates: { top: "78%", left: "79%", size: 56 },
    },
  ],
  rideRequests: [
    {
      id: "hyd-ride-201",
      riderName: "Pranav",
      riderRating: 4.8,
      pickupLabel: "Cyber Towers",
      dropoffLabel: "Raidurg Metro",
      pickupDistanceKm: 1.1,
      pickupEtaMinutes: 3,
      tripDistanceKm: 5.4,
      tripEtaMinutes: 15,
      fare: 196,
      paymentMethod: "UPI",
      tag: "Tech corridor",
      note: "A nearby office customer booking surfaced inside the tech corridor.",
    },
    {
      id: "hyd-ride-202",
      riderName: "Niharika",
      riderRating: 4.9,
      pickupLabel: "Madhapur signal",
      dropoffLabel: "Gachibowli circle",
      pickupDistanceKm: 2.0,
      pickupEtaMinutes: 6,
      tripDistanceKm: 8.0,
      tripEtaMinutes: 22,
      fare: 254,
      paymentMethod: "Cash",
      tag: "Evening return",
      note: "This request matches a strong office-exit demand wave.",
    },
    {
      id: "hyd-ride-203",
      riderName: "Kiran",
      riderRating: 4.7,
      pickupLabel: "Financial District gate",
      dropoffLabel: "Banjara Hills",
      pickupDistanceKm: 2.9,
      pickupEtaMinutes: 8,
      tripDistanceKm: 11.8,
      tripEtaMinutes: 28,
      fare: 338,
      paymentMethod: "Card",
      tag: "Premium fare",
      note: "Longer premium trip surfaced from a high-value office corridor.",
    },
  ],
  peakWindows: [
    {
      id: "hyd-morning",
      label: "Morning tech commute",
      timeRange: "7:30 AM to 11:00 AM",
      demandTone: "Office entry peak",
      hotspots: ["HITEC City", "Raidurgam", "Madhapur"],
      insight:
        "Stay near tech towers and metro exits where customer bookings form quickly.",
      shiftModes: ["morning"],
    },
    {
      id: "hyd-evening",
      label: "Evening return",
      timeRange: "5:00 PM to 8:00 PM",
      demandTone: "Office exit peak",
      hotspots: ["Gachibowli", "Financial District", "Kondapur"],
      insight:
        "Return routes create repeated short and medium-distance requests.",
      shiftModes: ["evening"],
    },
    {
      id: "hyd-late",
      label: "Late premium demand",
      timeRange: "8:00 PM to 10:00 PM",
      demandTone: "Dining and airport mix",
      hotspots: ["Jubilee Hills", "Banjara Hills", "Airport corridor"],
      insight:
        "Later hours favor smoother roads and higher-value longer trips.",
      shiftModes: ["evening"],
    },
  ],
};

const cityDemandProfiles: Record<string, CityDemandProfile> = {
  [bengaluruProfile.city]: bengaluruProfile,
  [hyderabadProfile.city]: hyderabadProfile,
};

export function getCityDemandProfile(city: string) {
  return cityDemandProfiles[city] ?? bengaluruProfile;
}

export const availableOperatingCities = Object.keys(cityDemandProfiles);

export const homeOpportunities = getCityDemandProfile(
  demoDrivers[0].city,
).opportunities;
export const demandZones = getCityDemandProfile(demoDrivers[0].city).zones;
export const mockRideRequests = getCityDemandProfile(
  demoDrivers[0].city,
).rideRequests;
export const peakWindows = getCityDemandProfile(demoDrivers[0].city).peakWindows;

export const routeOptions: RouteOptionConfig[] = [
  {
    id: "fastest",
    label: "Fastest",
    summary: "Prioritize ETA for the quickest arrival to the hotspot.",
    etaLabel: "8 min ETA",
    fuelLabel: "Normal fuel use",
  },
  {
    id: "lowTraffic",
    label: "Low Traffic",
    summary: "Favor calmer corridors and fewer stop-start bottlenecks.",
    etaLabel: "10 min ETA",
    fuelLabel: "Best for steady flow",
  },
  {
    id: "fuelEfficient",
    label: "Fuel Efficient",
    summary: "Balance distance and idling time to reduce fuel burn.",
    etaLabel: "11 min ETA",
    fuelLabel: "Save about 8 percent fuel",
  },
];

export const initialInboxMessages: InboxMessage[] = [
  {
    id: "terms-update",
    type: "alert",
    title: "Action required",
    message:
      "Please accept the updated Terms and Conditions to keep receiving requests.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "weekend-bonus",
    type: "promotion",
    title: "Peak-hour booster",
    message:
      "Morning office bookings are paying better in your city commute corridor today.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "payout",
    type: "success",
    title: "Payout processed",
    message:
      "Rs. 4,225 is on the way to your bank account ending in 4523.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "surg-launch",
    type: "notification",
    title: "SURG driver tip",
    message:
      "Check the Peak Hour Playbook before moving between office corridors.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "commission-window",
    type: "promotion",
    title: "Zero commission window",
    message:
      "Your next 5 accepted trips stay commission-free until 9 PM tonight.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "rating-update",
    type: "notification",
    title: "Rating update",
    message: "Excellent work. Your rider rating has moved up to 4.8.",
    time: "3 days ago",
    read: true,
  },
];

export const weeklyEarnings: WeeklyEarning[] = [
  { day: "Mon", amount: 450, trips: 8, hours: 5.2 },
  { day: "Tue", amount: 620, trips: 12, hours: 6.1 },
  { day: "Wed", amount: 380, trips: 7, hours: 4.8 },
  { day: "Thu", amount: 710, trips: 14, hours: 6.8 },
  { day: "Fri", amount: 850, trips: 16, hours: 7.2 },
  { day: "Sat", amount: 920, trips: 18, hours: 8.1 },
  { day: "Sun", amount: 540, trips: 10, hours: 5.7 },
];

export const recentTrips: RecentTrip[] = [
  {
    id: "trip-1",
    from: "Marathahalli Bridge",
    to: "Bellandur Ecospace",
    amount: 245,
    time: "2 hours ago",
    distance: "12.5 km",
    status: "Completed",
  },
  {
    id: "trip-2",
    from: "Cyber Towers",
    to: "Gachibowli Circle",
    amount: 180,
    time: "4 hours ago",
    distance: "8.2 km",
    status: "Completed",
  },
  {
    id: "trip-3",
    from: "HSR Layout",
    to: "Silk Board Junction",
    amount: 95,
    time: "6 hours ago",
    distance: "4.3 km",
    status: "Payout Pending",
  },
];

export const initialDriverSessionMetrics: DriverSessionMetrics = {
  todayEarnings: 0,
  todayTrips: 0,
};

export const earningsSummaries = {
  week: {
    total: 4470,
    trips: 85,
    onlineHours: 42,
    perTrip: 53,
    today: 0,
    pending: 245,
    trend: "+12.4%",
  },
  month: {
    total: 18420,
    trips: 344,
    onlineHours: 169,
    perTrip: 54,
    today: 0,
    pending: 1245,
    trend: "+18.1%",
  },
  all: {
    total: 245800,
    trips: 4621,
    onlineHours: 1942,
    perTrip: 53,
    today: 0,
    pending: 1245,
    trend: "+24.6%",
  },
};
