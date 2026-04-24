import TickIcon from "../assets/images/TickIcon.png"
import PlanIcon from "../assets/images/PlanIcon.png"
import CancleIcon from "../assets/images/CancleIcon.png"
import DollorIcon from "../assets/images/DollerIcon.png"

// ─── Dummy Data ───────────────────────────────────────────────────────────────

export const ticketSalesDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const ticketSalesData = [1800, 2400, 3100, 2700, 3800, 2200, 3500];

export const flightScheduleMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
export const domesticFlights = [120, 105, 150, 135, 170, 140, 150, 125, 140];
export const internationalFlights = [110, 135, 95, 110, 60, 100, 85, 105, 95];

export const airlineData = [
    { value: 35, name: "SkyHigh Airlines" },
    { value: 30, name: "FlyFast Airways" },
    { value: 20, name: "AeroJet" },
    { value: 15, name: "Nimbus Airlines" },
];

export const routeData = [
    { route: "Paris (CDG) → New York (JFK)", km: "5,834 km", passengers: 140000, pct: 100 },
    { route: "Hong Kong (HKG) → Los Angeles (LAX)", km: "11,063 km", passengers: 130000, pct: 93 },
    { route: "Frankfurt (FRA) → Bangkok (BKK)", km: "8,927 km", passengers: 120000, pct: 86 },
    { route: "Los Angeles (LAX) → Tokyo (HND)", km: "8,235 km", passengers: 110000, pct: 79 },
    { route: "Singapore (SIN) → London (LHR)", km: "10,885 km", passengers: 100000, pct: 71 },
];

export const stats = [
    { label: "Completed Flights", value: "125", change: "+1.35%", up: true, icon: TickIcon },
    { label: "Active Flights", value: "80", change: "+3.68%", up: true, icon: PlanIcon },
    { label: "Cancelled Flights", value: "25", change: "-1.45%", up: false, icon: CancleIcon },
    { label: "Total Revenue", value: "$15,000", change: "+6.94%", up: true, icon: DollorIcon },
];