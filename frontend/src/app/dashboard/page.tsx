import StatsCard from "@/components/dashboard/StatsCard";
import TicketSales from "@/components/dashboard/TicketSales";
import FlightsSchedule from "@/components/dashboard/FlightsSchedule";

export const metadata = {
  title: "Dashboard | Sky",
  description: "Overview of flights, revenue, and bookings",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard title="Completed Flights" value="125" />
        <StatsCard title="Active Flights" value="80" />
        <StatsCard title="Canceled Flights" value="25" />
        <StatsCard title="Revenue" value="$15,000" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <TicketSales />
        <FlightsSchedule />
      </div>
    </div>
  );
}