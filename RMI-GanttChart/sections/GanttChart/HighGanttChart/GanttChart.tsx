"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import { getChartOptions } from "./config";
import { processGanttData } from "./ utils";
import { generateMockData } from "./mockData";
import type { GanttChartProps } from "../../../types/high-gantt-types";
// import styles from "./styles.module.css"

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartData = processGanttData(data || generateMockData());

  useEffect(() => {
    const options = getChartOptions(chartData);

    if (chartRef.current) {
      const chart = Highcharts.ganttChart(chartRef.current, options);

      const handleResize = () => {
        if (chart && !chart.reflow) return;
        chart?.reflow();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (chart) {
          chart.destroy();
        }
      };
    }
  }, [chartData]);

  return (
    <div
      id="gantt-chart-container"
      ref={chartRef}
      // className={styles.container}
      style={{ minHeight: `${Math.max(400, chartData.length * 60)}px` }}
    />
  );
};

export default GanttChart;
