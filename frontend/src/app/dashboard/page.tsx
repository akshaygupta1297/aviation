
import SkytixDashboard from "@/components/dashboard/SkytixCharts";

export const metadata = {
  title: "Dashboard | Sky",
  description: "Overview of flights, revenue, and bookings",
};

export default function DashboardPage() {
  return (
    <>
      <div className="">
        <SkytixDashboard />
      </div>
    </>
  );
}