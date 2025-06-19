"use client"

import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import { getChartOptions } from './config'
import { processGanttData } from './ utils';
import { generateMockData } from './mockData';
import type { GanttChartProps } from '../../types/gantt-types';
import styles from './styles.module.css';

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartData = processGanttData(data || generateMockData());

  useEffect(() => {
    const options = getChartOptions(chartData);

    if (chartRef.current) {
      Highcharts.ganttChart(chartRef.current, options);
    }

    return () => {
      if (chartRef.current && (chartRef.current as any).highcharts) {
        (chartRef.current as any).highcharts.destroy();
      }
    };
  }, [chartData]);

  return (
    <div 
      id="gantt-chart-container" 
      ref={chartRef} 
      className={styles.container}
    />
  );
};

export default GanttChart;