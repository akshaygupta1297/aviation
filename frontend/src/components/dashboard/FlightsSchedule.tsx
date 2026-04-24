// ─── Flights Schedule Area Chart ─────────────────────────────────────────────
import ReactECharts from "echarts-for-react";
import { DARK2, GOLD, GRAY, WHITE_1 } from "@/utils/colors";
import { domesticFlights, flightScheduleMonths, internationalFlights } from "@/utils/jsonArry";
import { ChevronDown } from "@/utils/utilsAVG";

export function FlightsScheduleChart() {
  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: DARK2,
      borderColor: GOLD,
      borderWidth: 1,
      textStyle: { color: GOLD, fontSize: 12 },
      formatter: (params: any[]) =>
        `<span style="color:${GOLD};font-weight:600">${params[0].name}</span><br/>` +
        params.map((p) => `${p.marker} ${p.seriesName}: <b>${p.value}</b> flights`).join("<br/>"),
    },
    legend: {
      data: ["Domestic", "International"],
      top: 0,
      right: 0,
      itemWidth: 16,
      itemHeight: 3,
      textStyle: { color: GRAY, fontSize: 11 },
    },
    grid: { left: 8, right: 8, top: 28, bottom: 0, containLabel: true },
    xAxis: {
      type: "category",
      data: flightScheduleMonths,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: GRAY, fontSize: 11 },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
      interval: 50,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#F3F4F6", type: "dashed" } },
      axisLabel: { color: GRAY, fontSize: 11 },
    },
    series: [
      {
        name: "Domestic",
        type: "line",
        data: domesticFlights,
        smooth: true,
        symbol: "none",
        lineStyle: { color: GOLD, width: 2.5 },
        areaStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(201,168,76,0.28)" },
              { offset: 1, color: "rgba(201,168,76,0.01)" },
            ],
          },
        },
      },
      {
        name: "International",
        type: "line",
        data: internationalFlights,
        smooth: true,
        symbol: "none",
        lineStyle: { color: DARK2, width: 2 },
        areaStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(209,213,219,0.45)" },
              { offset: 1, color: "rgba(209,213,219,0.01)" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Flights Schedule
        </p>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 hover:bg-amber-100 transition-colors">
          📅 Last 8 Months <ChevronDown />
        </button>
      </div>
      <ReactECharts option={option} style={{ height: 200 }} />
    </div>
  );
}