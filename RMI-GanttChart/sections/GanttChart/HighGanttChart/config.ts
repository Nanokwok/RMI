import Highcharts from "highcharts"
import "highcharts/modules/gantt"
import "highcharts/modules/exporting"
import "highcharts/modules/pattern-fill"
import "highcharts/modules/accessibility"
import type { ProcessedTaskData } from "../../../types/high-gantt-types"
import { renderStatusBages } from "./ utils"

Highcharts.addEvent(Highcharts.Axis, "foundExtremes", (e: any) => {
  if (e.target.options.custom && e.target.options.custom.weekendPlotBands) {
    const axis = e.target,
      chart = axis.chart,
      day = 24 * 36e5,
      isWeekend = (t: number): boolean => /[06]/.test(chart.time.dateFormat("%w", t)),
      plotBands: Array<{ from: number; to?: number; color: string }> = []

    let inWeekend = false

    for (let x = Math.floor(axis.min / day) * day; x <= Math.ceil(axis.max / day) * day; x += day) {
      const last = plotBands.slice(-1)[0]
      if (isWeekend(x) && !inWeekend) {
        plotBands.push({
          from: x,
          color: "rgba(128,128,128,0.05)",
        })
        inWeekend = true
      }

      if (!isWeekend(x) && inWeekend && last) {
        last.to = x
        inWeekend = false
      }
    }
    axis.options.plotBands = plotBands
  }
})

export const getChartOptions = (data: ProcessedTaskData[]): Highcharts.Options => ({
  credits: {
    enabled: false,
  },

  chart: {
    height: Math.max(400, data.length * 60), // Dynamic height based on data length
    spacingLeft: 10,
    spacingRight: 10,
  },

  xAxis: {
    gridLineWidth: 0,
  },

  yAxis: {
    grid: {
      borderColor: "rgba(128,128,128,0.2)",
      columns: [
        {
          title: {
            text: "Task",
          },
          labels: {
            style: {
              whiteSpace: "normal",
              textOverflow: "none",
              width: "250px",
            },
          }
        },
        {
          title: {
            text: "Owner",
          },
          labels: {
            formatter: function (this: { value: number }) {
              const owner = data[this.value]?.owner || data[this.value]?.assignee
              return `<div style="white-space: normal; word-wrap: break-word; max-width: 120px;">${owner}</div>`
            },
            useHTML: true,
            style: {
              whiteSpace: "normal",
              width: "120px",
            },
          },
        },
        {
          title: {
            text: "Status",
          },
          labels: {
            formatter: function (this: { value: number }) {
              return renderStatusBages(data[this.value]?.status)
            },
            useHTML: true,
            style: {
              whiteSpace: "normal",
              width: "100px",
            },
          },
        },
      ],
    },
    labels: {
      style: {
        whiteSpace: "normal",
      },
    },
  } as Highcharts.YAxisLabelsOptions,

  plotOptions: {
    gantt: {
      dataLabels: {
        enabled: true,
        format: "{point.progress}%",
        style: {
          fontWeight: "bold",
          color: "#ffffff",
          textOutline: "none",
          lineWidth: 0,
        },
      },
      borderRadius: 4,
      groupPadding: 0.1,
      pointPadding: 0.1,
    },
  },

  series: [
    {
      type: "gantt",
      data: data,
      dataLabels: {
        enabled: true,
        format: "{point.progress}%",
        style: {
          fontWeight: "bold",
          color: "#ffffff",
          textOutline: "none",
          lineWidth: 0,
        },
      },
    },
  ],
})
