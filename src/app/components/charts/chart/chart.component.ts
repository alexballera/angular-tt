import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { ChartConfig } from '@ticmas/common-interfaces'
import has from 'lodash/has'
import { ChartService } from '../chart.service'

am4core.useTheme(am4themes_animated)

@Component({
  selector: 'ticmas-chart',
  template: `
    <div
      #chartDiv
      [id]="elementId"
      [style.width.%]="width"
      [style.height.vh]="height"
    ></div>
  `,
})
export class ChartComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('chartDiv') private element: ElementRef
  @Input() graphData: any[]
  @Input() width: number = 100
  @Input() height: number = 100
  @Input() config: ChartConfig
  @Input() type: string

  chart: am4charts.XYChart
  elementId: string

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    const random = Math.floor(Math.random() * 100 + 1)
    this.elementId = `chart-${Date.now()}-${random}`
  }

  ngAfterViewInit() {
    if (this.type === 'column') {
      this.columnChart()
    }

    if (this.type === 'line') {
      this.lineChart()
    }
  }

  ngOnChanges(change) {
    if (this.chart && has(change, 'graphData')) {
      this.chart.data = this.graphData
    }
  }

  ngOnDestroy() {
    this.chartService.destroyChart(this.chart)
  }

  columnChart() {
    this.chart = this.chartService.columnSeries(
      this.config,
      this.graphData,
      this.element.nativeElement
    )
  }

  lineChart() {
    this.chart = this.chartService.lineSeries(
      this.config,
      this.graphData,
      this.element.nativeElement
    )
  }
}
