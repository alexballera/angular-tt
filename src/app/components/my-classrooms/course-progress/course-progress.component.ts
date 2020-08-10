import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ChartConfig, WeeklyInteraction } from '@ticmas/common-interfaces'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WeeklyInteractionsMetrics } from '../../../models/metrics'
import { State } from '../../../reducers'
import { ChartsService } from '../../../services/charts.service'
import { CourseMetricsService } from '../../../services/metrics/course.service'
import { GlobalMetricsService } from '../../../services/metrics/global.service'

@Component({
  selector: 'app-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.scss'],
})
export class CourseProgressComponent implements OnInit {
  spinner$: Observable<boolean>
  courseMetrics$: Observable<any>
  weeklyInteractions$: Observable<WeeklyInteractionsMetrics>

  constructor(
    private store: Store<State>,
    private chartService: ChartsService,
    private metricsService: GlobalMetricsService,
    private courseMetricsService: CourseMetricsService
  ) {}

  ngOnInit() {
    this.spinner$ = this.store.select('uiStates', 'loading')
    this.courseMetrics$ = this.courseMetricsService.selectedCourseMetrics$.pipe(
      map(metrics => {
        return {
          general: metrics.general.contents.all,
          active: metrics.general.contents.active,
          fromLastWeek: metrics.fromLastWeek.contents.all,
        }
      })
    )

    this.weeklyInteractions$ = this.courseMetricsService.weeklyInteractions$.pipe(
      map((weeklyInteractions: WeeklyInteraction[]) => ({
        detail: this.metricsService.weeklyChartData(weeklyInteractions),
        average: this.metricsService.getAvgWeeklyInteractions(
          weeklyInteractions
        ),
      }))
    )
  }

  chartConfig() {
    const config: ChartConfig = {
      axis: {
        x: {
          title: {
            label: 'Semanas',
          },
        },
        y: {
          title: {
            label: 'Horas',
          },
        },
      },
    }
    return this.chartService.lineChart(config)
  }
}
