import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import { Injectable, NgZone } from '@angular/core'
import get from 'lodash/get'

@Injectable()
export class ChartService {
  constructor(private zone: NgZone) {}

  lineSeries(config, graphData, chartElement) {
    const vAlign = get(config, 'axis.y.title.valign', 'top')
    const hAlign = get(config, 'axis.x.title.align', 'right')

    return this.zone.runOutsideAngular(() => {
      const chart = am4core.create(chartElement, am4charts.XYChart)

      chart.data = graphData
      chart.cursor = new am4charts.XYCursor()
      chart.paddingTop = vAlign === 'top' ? 25 : 10
      chart.paddingRight = hAlign === 'right' ? 50 : 0

      const xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      xAxis.fontSize = 10
      xAxis.layout = 'absolute'
      xAxis.dataFields.category = 'valueX'
      xAxis.renderer.minGridDistance = 1
      xAxis.renderer.grid.template.location = 0

      xAxis.title.align = hAlign
      xAxis.title.paddingTop = 10
      xAxis.title.fontWeight = 'bold'
      xAxis.title.dx = get(config, 'axis.x.title.dx', 40)
      xAxis.title.text = get(config, 'axis.x.title.label', '')

      const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
      yAxis.layout = 'absolute'

      yAxis.fontSize = 10
      yAxis.strictMinMax = true
      yAxis.tooltip.disabled = true
      yAxis.min = get(config, 'axis.y.min', 0)
      yAxis.max = get(config, 'axis.y.max', 10)
      yAxis.renderer.minGridDistance = get(config, 'axis.y.minGridDistance', 20)

      yAxis.title.valign = vAlign
      yAxis.title.fontWeight = 'bold'
      yAxis.title.dy = get(config, 'axis.y.title.dy', -25)
      yAxis.title.text = get(config, 'axis.y.title.label', '')
      yAxis.title.rotation = get(config, 'axis.y.title.rotation', 0)
      yAxis.title.align = get(config, 'axis.y.title.align', 'center')

      const series = chart.series.push(new am4charts.LineSeries())
      series.dataFields.valueY = 'valueY'
      series.dataFields.categoryX = 'valueX'
      series.name = get(config, 'axis.y.title.label', '')
      series.strokeWidth = 3
      series.stroke = am4core.color(get(config, 'color.lineSeries', '#6f5abb'))
      series.tooltipText = '[bold]{categoryX}[/]: {valueY} {name}'

      return chart
    })
  }

  columnSeries(config, graphData, chartElement) {
    const vAlign = get(config, 'axis.y.title.valign', 'top')
    const hAlign = get(config, 'axis.x.title.align', 'right')

    return this.zone.runOutsideAngular(() => {
      const chart: am4charts.XYChart = am4core.create(
        chartElement,
        am4charts.XYChart
      )

      chart.data = graphData
      chart.paddingRight = 0
      chart.paddingLeft = -10
      chart.paddingTop = 0
      chart.paddingBottom = 0

      const yAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      yAxis.dataFields.category = 'valueY'
      yAxis.renderer.minGridDistance = 1
      yAxis.renderer.grid.template.location = 0
      yAxis.renderer.grid.template.disabled = true
      yAxis.renderer.grid.template.strokeOpacity = 0

      const yLabel = yAxis.renderer.labels.template
      yLabel.fontSize = '14'
      yLabel.align = 'left'
      yLabel.wrap = true
      yLabel.width = 200

      const yAxisOpposite = chart.yAxes.push(new am4charts.CategoryAxis())
      yAxisOpposite.fontSize = 18
      yAxisOpposite.fontWeight = 'bold'
      yAxisOpposite.renderer.opposite = true
      yAxisOpposite.dataFields.category = 'ref'
      yAxisOpposite.renderer.grid.template.disabled = true

      const xAxis = chart.xAxes.push(new am4charts.ValueAxis())
      xAxis.fontSize = 10
      xAxis.layout = 'absolute'
      xAxis.strictMinMax = true
      xAxis.min = get(config, 'axis.x.min', 0)
      xAxis.max = get(config, 'axis.x.max', 10)

      xAxis.renderer.minGridDistance = get(config, 'axis.x.minGridDistance', 10)
      xAxis.renderer.labels.template.fill = am4core.color('#808080')
      xAxis.renderer.labels.template.height = 20

      xAxis.title.align = hAlign
      xAxis.title.paddingTop = 10
      xAxis.title.fontWeight = 'lighter'
      xAxis.title.fill = am4core.color('#808080')
      xAxis.title.dx = get(config, 'axis.x.title.dx', 65)
      xAxis.title.text = get(config, 'axis.x.title.label', '')

      this.adjustChart(chart)
      this.createColumnSeries(
        chart,
        'total',
        get(config, 'series.name.primary', ''),
        get(config, 'color.columnSeries.primary', '#d7d7d7'),
        60
      )
      this.createColumnSeries(
        chart,
        'valueX',
        get(config, 'series.name.secondary', ''),
        get(config, 'color.columnSeries.secondary', '#6f5abb'),
        40
      )
      return chart
    })
  }

  createColumnSeries(chart, field, name, color, colHeight) {
    const series = chart.series.push(new am4charts.ColumnSeries())
    series.name = name
    series.strokeWidth = 0
    series.clustered = false
    series.fill = am4core.color(color)

    series.dataFields.valueX = field
    series.dataFields.categoryY = 'valueY'

    series.columns.template.height = am4core.percent(colHeight)
  }

  adjustChart(chartEl) {
    const cellSize = 45
    chartEl.events.on('datavalidated', ev => {
      const chart = ev.target
      const categoryAxis = chart.yAxes.getIndex(0)

      const adjustHeight =
        chart.data.length * cellSize - categoryAxis.pixelHeight

      const targetHeight = chart.pixelHeight + adjustHeight

      chart.svgContainer.htmlElement.style.height = targetHeight + 'px'
    })
  }

  destroyChart(chart) {
    return this.zone.runOutsideAngular(() => {
      if (chart) {
        chart.dispose()
      }
    })
  }
}
