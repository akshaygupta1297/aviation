
"use client"
import PaymentHistoryTable from "@/components/dashboard/Paymenthistorytable";
import SkytixDashboard from "@/components/dashboard/SkytixCharts";
import { useEffect, useState } from "react";



export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <div>
        <SkytixDashboard />
        <PaymentHistoryTable />
      </div>
    </>
  );
}