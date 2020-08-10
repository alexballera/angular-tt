import { Injectable } from '@angular/core'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import {
  CourseMetrics,
  DistributionGroupInContext,
  GroupMetrics,
  MonthlyAvgInteraction,
  QuarterlyInteraction,
} from '@ticmas/common-interfaces'
import { addDays, format, parseISO } from 'date-fns'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import head from 'lodash/head'
import omit from 'lodash/omit'
import round from 'lodash/round'
import sumBy from 'lodash/sumBy'
import toArray from 'lodash/toArray'
import { combineLatest, Observable, zip } from 'rxjs'
import { map } from 'rxjs/operators'
import { State } from '../ngrx'
import { featureName } from '../ngrx/ngrx.module'

export interface CoursesMetrics {
  name: string
  students: number
  hours: number
  minutes: number
  progress: number
  contents: {
    distributed: number
    completed: number
    progressed: number
  }
  courses: DistributionGroupInContext[]
}

export interface Metrics {
  courses: CourseMetrics
  quarterlyInteractions: QuarterlyInteraction[]
  monthlyAvgInteraction: MonthlyAvgInteraction[]
}

@Injectable({
  providedIn: 'root',
})
export class DirectorMetricsService {
  constructor(private store: Store<State>) {}

  featureSelector$ = this.store.pipe(
    select(createFeatureSelector<State>(featureName))
  )

  metrics$: Observable<Metrics> = this.featureSelector$.pipe(
    select('distributionGroups', 'metrics')
  )

  selectTeacher$: Observable<any> = this.featureSelector$.pipe(
    select('teacher')
  )

  courseList$: Observable<
    DistributionGroupInContext[]
  > = this.featureSelector$.pipe(
    select('distributionGroups', 'list'),
    map(groups => groups.filter(group => !group.parent))
  )

  metricsSelectCourse$: Observable<any> = combineLatest([
    this.metrics$,
    this.courseList$,
    this.selectTeacher$,
  ]).pipe(
    map(([metricsCourses, courseList, teacher]) => {
      const list = Object.values(metricsCourses.courses)
      let coursesTeacher = []
      let response = []
      courseList.map(cl => {
        if (cl.owners.find(ow => ow.sub === teacher.sub)) {
          coursesTeacher = coursesTeacher.concat(cl)
        }
      })
      coursesTeacher.map(ct => {
        let distributedContent = []
        let progressContent = []
        let completContent = []
        const data = list.find(l => l.course === ct.course._id)
        const totalContents = Object.values(data.contents.all.list)
        ct.contents.map(cnt => {
          const totalContent = totalContents.find(c => c._id === cnt._id)
          if (totalContent) {
            const contentEndDate = addDays(
              parseISO(totalContent.startDate),
              +totalContent.duration
            )
            distributedContent = distributedContent.concat({
              ...totalContent,
              attachments: cnt.attachments,
              endDate: format(contentEndDate, 'yyyy-MM-dd'),
            })
            if (totalContent.metrics.completed) {
              completContent = completContent.concat({
                ...totalContent,
                attachments: cnt.attachments,
                endDate: format(contentEndDate, 'yyyy-MM-dd'),
              })
            } else if (totalContent.metrics.assets.progress > 0) {
              progressContent = progressContent.concat({
                ...totalContent,
                attachments: cnt.attachments,
                endDate: format(contentEndDate, 'yyyy-MM-dd'),
              })
            }
          }
        })
        response = response.concat({
          general: [
            {
              title: 'En curso',
              value: progressContent.length,
              component: 'in-progress',
              content: progressContent,
            },
            {
              title: 'Finalizados',
              value: completContent.length,
              component: 'finished',
              content: completContent,
            },
            {
              title: 'Total',
              value: distributedContent.length,
              component: 'total',
              content: distributedContent,
            },
          ],
        })
      })
      return response
    })
  )

  courses$: Observable<CoursesMetrics[]> = zip(
    this.metrics$,
    this.courseList$
  ).pipe(
    map(([metrics, courses]) => {
      const res = courses.map(course => {
        const courseMetrics: GroupMetrics = get(
          metrics.courses,
          course.course._id,
          {}
        )
        const contentRelatedMetrics = courseMetrics.contents.all
        return {
          name: course.category,
          students: courseMetrics.students.length,
          ...omit(contentRelatedMetrics, ['list']),
          course,
        }
      })
      return toArray(groupBy(res, 'name')).map(subject => {
        const progress = round(sumBy(subject, 'progress') / subject.length)
        const distributedContents = sumBy(subject, 'total.distributed')
        return {
          name: head(subject).name,
          students: sumBy(subject, 'students'),
          hours: sumBy(subject, 'hours'),
          minutes: sumBy(subject, 'minutes'),
          progress,
          contents: {
            distributed: distributedContents,
            completed: sumBy(subject, 'total.completed'),
            progressed: progress * (distributedContents / 100),
          },
          courses: subject.map(s => s.course),
        }
      })
    })
  )
}
