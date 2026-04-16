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

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  accent: "green" | "blue" | "amber";
  stat: string;
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

export const demoDrivers: DriverProfile[] = [
  {
    id: "rajesh",
    name: "Rajesh Kumar",
    city: "Guntur",
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
    city: "Vijayawada",
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
    description: "Accept the updated driver agreement before tonight's peak window.",
    cta: "Review now",
  },
];

export const homeOpportunities: Opportunity[] = [
  {
    id: "bonus",
    title: "Extra Rs. 16 per trip",
    description: "Complete 4 rides between 5 PM and 8 PM to unlock the booster.",
    accent: "green",
    stat: "Peak bonus",
  },
  {
    id: "commission",
    title: "Zero commission window",
    description: "Your next 5 accepted trips keep the full fare in your pocket.",
    accent: "blue",
    stat: "Valid today",
  },
  {
    id: "airport",
    title: "Airport queue looks light",
    description: "SURG predicts a fast turnaround with strong rider demand.",
    accent: "amber",
    stat: "12 min away",
  },
];

export const demandZones: DemandZone[] = [
  {
    id: "guntur-west",
    name: "Guntur West",
    demand: "high",
    distanceKm: 2.5,
    etaMinutes: 6,
    earningsPerHour: 300,
    waitTimeLabel: "2 min wait",
    hotspotScore: 94,
    note: "Short pickups and strong office crowd.",
    coordinates: { top: "18%", left: "68%", size: 86 },
  },
  {
    id: "mall",
    name: "City Center Mall",
    demand: "high",
    distanceKm: 3.2,
    etaMinutes: 8,
    earningsPerHour: 280,
    waitTimeLabel: "5 min wait",
    hotspotScore: 89,
    note: "Retail rush with premium ride mix.",
    coordinates: { top: "58%", left: "16%", size: 98 },
  },
  {
    id: "station",
    name: "Railway Station",
    demand: "medium",
    distanceKm: 1.8,
    etaMinutes: 5,
    earningsPerHour: 180,
    waitTimeLabel: "8 min wait",
    hotspotScore: 76,
    note: "Reliable trips, moderate congestion.",
    coordinates: { top: "24%", left: "20%", size: 72 },
  },
  {
    id: "airport-road",
    name: "Airport Road",
    demand: "medium",
    distanceKm: 5.5,
    etaMinutes: 12,
    earningsPerHour: 220,
    waitTimeLabel: "10 min wait",
    hotspotScore: 72,
    note: "Longer fares with slightly slower pickup cycles.",
    coordinates: { top: "70%", left: "62%", size: 66 },
  },
  {
    id: "industrial",
    name: "Industrial Area",
    demand: "low",
    distanceKm: 4.0,
    etaMinutes: 11,
    earningsPerHour: 120,
    waitTimeLabel: "15 min wait",
    hotspotScore: 48,
    note: "Demand is cooling off after the lunch shift.",
    coordinates: { top: "76%", left: "76%", size: 54 },
  },
];

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
    message: "Please accept the updated Terms and Conditions to keep receiving requests.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "weekend-bonus",
    type: "promotion",
    title: "Weekend bonus unlocked",
    message: "Earn Rs. 16 extra per trip this weekend after your first 10 completed rides.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "payout",
    type: "success",
    title: "Payout processed",
    message: "Rs. 4,225 is on the way to your bank account ending in 4523.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "surg-launch",
    type: "notification",
    title: "SURG tip of the day",
    message: "Guntur West is trending now. Avoid heavy traffic to improve your pickup pace.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "commission-window",
    type: "promotion",
    title: "Zero commission window",
    message: "Your next 5 accepted trips stay commission-free until 9 PM tonight.",
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
    from: "MG Road",
    to: "Airport",
    amount: 245,
    time: "2 hours ago",
    distance: "12.5 km",
    status: "Completed",
  },
  {
    id: "trip-2",
    from: "Railway Station",
    to: "City Center",
    amount: 180,
    time: "4 hours ago",
    distance: "8.2 km",
    status: "Completed",
  },
  {
    id: "trip-3",
    from: "Hospital",
    to: "Mall",
    amount: 95,
    time: "6 hours ago",
    distance: "4.3 km",
    status: "Payout Pending",
  },
];

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
