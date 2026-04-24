import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Dashboard | Sky",
  description: "Overview of flights, revenue, and bookings",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-auto">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="max-h-screen overflow-auto">{children}</main>
      </div>
    </div>
  );
}