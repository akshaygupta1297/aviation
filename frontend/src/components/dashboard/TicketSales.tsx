// ─── Ticket Sales Bar Chart ───────────────────────────────────────────────────
import ReactECharts from "echarts-for-react";
import { DARK2, GOLD, GOLD_LIGHT, GRAY, WHITE } from "@/utils/colors";
import { ticketSalesData, ticketSalesDays } from "@/utils/jsonArry";
import { ChevronDown } from "@/utils/utilsAVG";

export function TicketSalesChart() {
  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "none" },
      backgroundColor: DARK2,
      borderColor: GOLD,
      borderWidth: 1,
      textStyle: { color: WHITE, fontSize: 12 },
      formatter: (params: any[]) => {
        const p = params[0];
        return `<span style="color:${GOLD};font-weight:600">${p.name}</span><br/>${p.value.toLocaleString()} tickets`;
      },
    },
    grid: { left: 8, right: 8, top: 12, bottom: 0, containLabel: true },
    xAxis: {
      type: "category",
      data: ticketSalesDays,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: GRAY, fontSize: 11 },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 4000,
      interval: 1000,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#F3F4F6", type: "dashed" } },
      axisLabel: {
        color: GRAY,
        fontSize: 11,
        formatter: (v: number) => `${v / 1000}k`,
      },
    },
    series: [
      {
        type: "bar",
        data: ticketSalesData.map((v, i) => ({
          value: v,
          itemStyle: {
            color: i === 4 ? GOLD : DARK2,
            borderRadius: [4, 4, 0, 0],
          },
        })),
        barWidth: "50%",
        emphasis: { itemStyle: { color: GOLD_LIGHT } },
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Ticket Sales
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">12,500</span>
            <span className="text-xs text-gray-400">Tickets Sold</span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 hover:bg-amber-100 transition-colors">
          📅 This Week <ChevronDown />
        </button>
      </div>
      <ReactECharts option={option} style={{ height: 200 }} />
    </div>
  );
}