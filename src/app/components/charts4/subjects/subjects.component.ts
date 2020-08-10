import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { Component, NgZone, OnInit } from '@angular/core'

am4core.useTheme(am4themes_animated)

@Component({
  selector: 'ticmas-charts4-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  private chart: am4charts.XYChart

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('subjects', am4charts.XYChart)

      chart.paddingRight = 20

      const data = [
        {
          content: 'Biología',
          label:
            '[#6f5abb font-size: 20px bold]25%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]40[/] [#d7d7d7 bold]cont.[/]',
          assigned: 40,
          progress: 25,
        },
        {
          content: 'Matemática',
          label:
            '[#6f5abb font-size: 20px bold]40%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]80[/] [#d7d7d7 bold]cont.[/]',
          assigned: 80,
          progress: 40,
        },
        {
          content: 'Inglés',
          label:
            '[#6f5abb font-size: 20px bold]61%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]15[/] [#d7d7d7 bold]cont.[/]',
          assigned: 61,
          progress: 15,
        },
        {
          content: 'Educación Artística',
          label:
            '[#6f5abb font-size: 20px bold]25%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]50[/] [#d7d7d7 bold]cont.[/]',
          assigned: 50,
          progress: 25,
        },
        {
          content: 'Geografía',
          label:
            '[#6f5abb font-size: 20px bold]60%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]70[/] [#d7d7d7 bold]cont.[/]',
          assigned: 70,
          progress: 60,
        },
        {
          content: 'Historia',
          label:
            '[#6f5abb font-size: 20px bold]15%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]35[/] [#d7d7d7 bold]cont.[/]',
          assigned: 35,
          progress: 15,
        },
        {
          content: 'Fisicoquímica',
          label:
            '[#6f5abb font-size: 20px bold]5%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]10[/] [#d7d7d7 bold]cont.[/]',
          assigned: 10,
          progress: 5,
        },
        {
          content: 'Taller de educación emocional',
          label:
            '[#6f5abb font-size: 20px bold]50%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]60[/] [#d7d7d7 bold]cont.[/]',
          assigned: 60,
          progress: 50,
        },
        {
          content: 'Const. de la Ciudadanía',
          label:
            '[#6f5abb font-size: 20px bold]30%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]40[/] [#d7d7d7 bold]cont.[/]',
          assigned: 40,
          progress: 30,
        },
        {
          content: 'Prácticas del lenguaje',
          label:
            '[#6f5abb font-size: 20px bold]30%[/] [#d7d7d7 bold] de[/] [#d7d7d7 bold font-size: 12px]40[/] [#d7d7d7 bold]cont.[/]',
          assigned: 40,
          progress: 30,
        },
      ]
      chart.data = data

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'content'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.grid.template.strokeOpacity = 0
      categoryAxis.renderer.inversed = true
      categoryAxis.renderer.labels.template.maxWidth = 150
      categoryAxis.renderer.labels.template.wrap = true

      const dataAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      dataAxis.dataFields.category = 'label'
      dataAxis.renderer.opposite = true
      dataAxis.renderer.grid.template.strokeOpacity = 0

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.grid.template.strokeOpacity = 1
      valueAxis.renderer.grid.template.stroke = am4core.color('#ccc')
      valueAxis.renderer.grid.template.strokeWidth = 1

      function createSeries(field, name, fill, height) {
        const series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueX = field
        series.dataFields.categoryY = 'content'
        series.name = name
        series.fill = am4core.color(fill)
        series.strokeWidth = 0
        series.columns.template.height = height
        series.stacked = true

        const valueLabel = series.bullets.push(new am4charts.LabelBullet())
        valueLabel.label.horizontalCenter = 'left'
        valueLabel.label.hideOversized = true

        const categoryLabel = series.bullets.push(new am4charts.LabelBullet())
        categoryLabel.label.horizontalCenter = 'right'
        categoryLabel.label.hideOversized = false
      }

      createSeries('assigned', 'Income', '#6f5abb', 20)
      createSeries('progress', 'Expenses', '#d7d7d7', 25)

      this.chart = chart
    })
  }
}
