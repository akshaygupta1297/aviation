"use client";

import ReactECharts from "echarts-for-react";
import GraphPlan from "../../assets/images/GraphPlan.png";
import Image from "next/image";
import { ChevronDown, DotsMenu } from "@/utils/utilsAVG";
import { airlineData, domesticFlights, flightScheduleMonths, internationalFlights, routeData, stats, ticketSalesData, ticketSalesDays } from "@/utils/jsonArry";
import { StatCards } from "./StatsCard";
import { TicketSalesChart } from "./TicketSales";
import { FlightsScheduleChart } from "./FlightsSchedule";
import { PopularAirlinesChart } from "./PopularAirlines";
import { TopFlightRoutesChart } from "./TopFlightRoutes";

// ─── Full Dashboard Page ──────────────────────────────────────────────────────

export default function SkytixDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-amber-500 text-xl">✈</span>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <StatCards />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <TicketSalesChart />
        <FlightsScheduleChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <PopularAirlinesChart />
        <TopFlightRoutesChart />
      </div>
    </div>
  );
}
