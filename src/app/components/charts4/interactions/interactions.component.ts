import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { Component, NgZone, OnInit } from '@angular/core'

am4core.useTheme(am4themes_animated)

@Component({
  selector: 'ticmas-charts4-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.scss'],
})
export class InteractionsComponent implements OnInit {
  private chart: am4charts.XYChart

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('interactions', am4charts.XYChart)

      chart.paddingRight = 20

      const data = [
        {
          date: '2012-03-09',
          students: 147,
        },
        {
          date: '2012-03-10',
          students: 24,
        },
        {
          date: '2012-03-11',
          students: 169,
        },
        {
          date: '2012-03-12',
          students: 132,
        },
        {
          date: '2012-03-13',
          students: 158,
        },
        {
          date: '2012-03-14',
          students: 132,
        },
        {
          date: '2012-03-15',
          students: 75,
        },
      ]

      chart.data = data

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.grid.template.location = 0

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.tooltip.disabled = true
      valueAxis.renderer.minWidth = 35

      const series = chart.series.push(new am4charts.LineSeries())
      series.dataFields.dateX = 'date'
      series.dataFields.valueY = 'students'
      series.stroke = am4core.color('#6f5abb')
      series.strokeWidth = 3
      series.dx = 0
      series.dy = 0

      series.tooltipText = '{valueY.students}'
      chart.cursor = new am4charts.XYCursor()

      this.chart = chart
    })
  }
}
