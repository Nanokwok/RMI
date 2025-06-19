import Highcharts from 'highcharts';
import 'highcharts/modules/gantt';
import 'highcharts/modules/exporting';
import 'highcharts/modules/pattern-fill';
import 'highcharts/modules/accessibility';
import type { ProcessedTaskData } from '../../types/gantt-types'

Highcharts.addEvent(Highcharts.Axis, 'foundExtremes', (e: any) => {
  if (e.target.options.custom && e.target.options.custom.weekendPlotBands) {
      const axis = e.target,
          chart = axis.chart,
          day = 24 * 36e5,
          isWeekend = (t: number): boolean => /[06]/.test(chart.time.dateFormat('%w', t)),
          plotBands: Array<{ from: number; to?: number; color: string }> = [];

      let inWeekend = false;

      for (
          let x = Math.floor(axis.min / day) * day;
          x <= Math.ceil(axis.max / day) * day;
          x += day
      ) {
          const last = plotBands.slice(-1)[0];
          if (isWeekend(x) && !inWeekend) {
              plotBands.push({
                  from: x,
                  color: 'rgba(128,128,128,0.05)'
              });
              inWeekend = true;
          }

          if (!isWeekend(x) && inWeekend && last) {
              last.to = x;
              inWeekend = false;
          }
      }
      axis.options.plotBands = plotBands;
  }
});

export const getChartOptions = (data: ProcessedTaskData[]): Highcharts.Options => ({
  series: [{
      type: 'gantt',
      data: data,
      dataLabels: {
          enabled: true,
          format: '{point.progress}%',
          style: {
              fontWeight: 'normal',
              color: '#fff'
          }
      }
  }],
});