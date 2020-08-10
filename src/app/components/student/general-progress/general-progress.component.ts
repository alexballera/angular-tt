import { Component, Input, OnChanges } from '@angular/core'
import { Store } from '@ngrx/store'
import { ChartConfig } from '@ticmas/common-interfaces'
import get from 'lodash/get'
import sumBy from 'lodash/sumBy'
import values from 'lodash/values'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { WeeklyInteractionsMetrics } from '../../../models/metrics'
import { StudentData, StudentMetrics } from '../../../models/student'
import { State } from '../../../reducers'
import { ChartsService } from '../../../services/charts.service'
import { ContentsService } from '../../../services/contents.service'
import { GlobalMetricsService } from '../../../services/metrics/global.service'
import { StudentMetricsService } from '../../../services/metrics/student.service'

@Component({
  selector: 'app-student-general-progress',
  templateUrl: './general-progress.component.html',
  styleUrls: ['./general-progress.component.scss'],
})
export class StudentGeneralProgressComponent implements OnChanges {
  @Input() studentData: StudentData
  chartData: any[]
  studentMetrics: StudentMetrics
  weeklyInteractions$: Observable<WeeklyInteractionsMetrics>
  lastWeekAverageInteraction$: Observable<{ hours: number; minutes: number }>

  constructor(
    private store: Store<State>,
    private chartService: ChartsService,
    private contentsService: ContentsService,
    private metricsService: GlobalMetricsService,
    private studentMetricsService: StudentMetricsService
  ) {}

  ngOnChanges(): void {
    this.getStudentMetrics()
    this.lastWeekAverageInteraction$ = this.store
      .select('metrics', 'groups')
      .pipe(
        map(({ contentAvgInteraction }) =>
          this.studentMetricsService.getAvgInteraction(
            contentAvgInteraction,
            this.studentData
          )
        )
      )

    this.weeklyInteractions$ = this.store.select('metrics', 'students').pipe(
      map(({ weeklyInteractions }) => {
        const studentWeeklyInteractions = weeklyInteractions.find(
          ({ actor }) => actor === this.studentData.info.preferred_username
        )
        const studentWeeklyMetrics = get(
          studentWeeklyInteractions,
          'results',
          []
        )
        return {
          detail: this.metricsService.weeklyChartData(studentWeeklyMetrics),
          average: this.metricsService.getAvgWeeklyInteractions(
            studentWeeklyMetrics
          ),
        }
      }),
      tap(({ detail }) => (this.chartData = detail))
    )
  }

  getStudentMetrics() {
    this.chartData = []
    const totalContents = this.studentData.group.contents.length

    const allContentsMetrics = get(this.studentData.metrics, 'all', {})
    const activeContentsMetrics = get(this.studentData.metrics, 'active', {})

    const contentList = values(get(allContentsMetrics, 'list', {}))

    const attemptedContents = sumBy(contentList, (content: any) =>
      get(content, 'metrics.assets.total.started', 0) > 0 ? 1 : 0
    )

    const completed = get(allContentsMetrics, 'total.completed', 0)

    const lastInteraction = this.contentsService.formatedLastInteraction(
      get(allContentsMetrics, 'lastInteraction', null)
    )

    this.studentMetrics = {
      lastInteraction: get(lastInteraction, 'calendar', null),
      progress: {
        all: get(allContentsMetrics, 'progress', 0),
        active: get(activeContentsMetrics, 'progress', 0),
      },
      contents: {
        total: totalContents,
        attempted: attemptedContents,
        completed,
        pending: totalContents - completed - attemptedContents,
      },
      activities: {
        total: 0,
        approved: sumBy(contentList, (content: any) =>
          get(content, 'metrics.assets.total.approved', 0) > 0 ? 1 : 0
        ),
        failed: sumBy(contentList, (content: any) =>
          get(content, 'metrics.assets.total.failed', 0) > 0 ? 1 : 0
        ),
      },
    }
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
