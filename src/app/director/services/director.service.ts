import { Injectable } from '@angular/core'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import {
  ChartConfig,
  DistributionGroupInContext,
  QuarterlyInteraction,
} from '@ticmas/common-interfaces'
import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import parseISO from 'date-fns/parseISO'
import floor from 'lodash/floor'
import flatten from 'lodash/fp/flatten'
import has from 'lodash/fp/has'
import uniqBy from 'lodash/fp/uniqBy'
import groupBy from 'lodash/groupBy'
import head from 'lodash/head'
import orderBy from 'lodash/orderBy'
import round from 'lodash/round'
import sumBy from 'lodash/sumBy'
import values from 'lodash/values'
import { combineLatest, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { ContextService } from '../../services/context.service'
import { State } from '../ngrx'
import { featureName } from '../ngrx/ngrx.module'
import { DirectorMetricsService } from './metrics.service'

export interface GeneralMetrics {
  students: number
  subjects: number
  courses: number
  contents: number
  teachers: number
}

@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  constructor(
    private directorMetricsService: DirectorMetricsService,
    private contextService: ContextService,
    private store: Store<State>
  ) {}

  featureSelector$ = this.store.pipe(
    select(createFeatureSelector<State>(featureName))
  )

  distributionGroups$: Observable<
    DistributionGroupInContext[]
  > = this.featureSelector$.pipe(select('distributionGroups', 'list'))

  studentCount$: Observable<number> = this.distributionGroups$.pipe(
    map(groups => groups.map(({ users }) => users)),
    map(list => flatten(list)),
    map(users => uniqBy('preferred_username', users).length)
  )

  teacherCount$ = this.contextService.school$.pipe(
    filter(has('owners.length')),
    map(schools => schools.owners.length)
  )

  teachers$ = this.contextService.school$.pipe(
    filter(has('owners.length')),
    map(schools => schools.owners)
  )

  dataTeachers$: Observable<any> = combineLatest([
    this.teachers$,
    this.directorMetricsService.courseList$,
  ]).pipe(
    map(([teachers, courses]) => {
      return teachers.map(teacher => {
        const data = {
          ...teacher,
          courses: [],
          countCourses: 0,
          students: [],
          countStudent: 0,
        }
        courses.forEach(list => {
          const tt = list.owners.find(ow => ow.sub === teacher.sub)
          if (tt) {
            if (list.users.length > 0) {
              data.students = data.students.concat(list.users)
            }
            data.picture = tt.picture
            data.countCourses++
            data.courses = data.courses.concat(list.course)
          }
        })
        data.countStudent = data.students.length
        return data
      })
    })
  )

  generalMetrics$: Observable<GeneralMetrics> = combineLatest([
    this.directorMetricsService.courses$,
    this.teacherCount$,
    this.studentCount$,
  ]).pipe(
    map(([subjects, teachers, students]) => {
      return {
        subjects: subjects.length,
        courses: sumBy(subjects, subject => subject.courses.length),
        contents: sumBy(subjects, subject => subject.contents.distributed),
        students,
        teachers,
      }
    })
  )

  coursesSource$: Observable<any> = combineLatest([
    this.generalMetrics$,
    this.directorMetricsService.metrics$,
  ])

  progressOnSubjects$: Observable<
    any
  > = this.directorMetricsService.courses$.pipe(
    map((subjects: any[]) => {
      const results = subjects.map(subject => {
        const total = subject.contents.distributed
        const progress = round(+subject.progress)
        const progressed = round(+subject.contents.progressed)
        return {
          valueY: subject.name,
          valueX: progressed,
          total,
          progress,
          ref: `[#6f5abb]${progress}%[/][#d7d7d7 font-size: 10px] de[/][#d7d7d7] ${total}[/][display: none]${subject.name}[/][#d7d7d7 font-size: 10px] cont.[/]`,
        }
      })

      return orderBy(results, 'progress')
    })
  )

  quarterlyInteractions$: Observable<
    Array<{ valueX: string; valueY: number }>
  > = this.coursesSource$.pipe(
    map(([generalMetrics, { quarterlyInteractions }]) => {
      const totalStudents = generalMetrics.students
      const monthInteractions = values(
        groupBy(quarterlyInteractions, 'monthrear')
      )
      const metrics = monthInteractions.map(
        (interactions: QuarterlyInteraction[]) => {
          const month = head(interactions).monthrear
          const { hours } = this.getTotalInteractionTime(
            interactions,
            totalStudents
          )
          return { month, hours }
        }
      )

      return orderBy(metrics, 'month').map(({ month, hours }) => ({
        valueX: format(parseISO(month), 'MMMM', {
          locale: es,
        }),
        valueY: hours,
      }))
    })
  )

  monthlyAvgInteraction$: Observable<{
    hours: number
    minutes: number
  }> = this.coursesSource$.pipe(
    map(([generalMetrics, { monthlyAvgInteraction }]) => {
      const totalStudents = generalMetrics.students
      return this.getTotalInteractionTime(monthlyAvgInteraction, totalStudents)
    })
  )

  getTotalInteractionTime(interactions, totalStudents) {
    const hours = sumBy(interactions, (interaction: any) => interaction.hours)
    const minutes = sumBy(
      interactions,
      (interaction: any) => interaction.minutes
    )
    const seconds = sumBy(
      interactions,
      (interaction: any) => interaction.seconds
    )

    const totalMinutes = seconds ? minutes + seconds / 60 : minutes
    const totalHours = totalMinutes ? hours + totalMinutes / 60 : hours

    const avgHours = totalHours / totalStudents || 0
    const avgMinutes = (avgHours - floor(avgHours)) * 60

    return {
      hours: floor(avgHours),
      minutes: round(avgMinutes),
    }
  }

  subjectsChartConfig$: Observable<ChartConfig> = this.progressOnSubjects$.pipe(
    map(subjects => {
      const maxContentsCount = Math.max(subjects.map(subject => subject.total))
      const config: ChartConfig = {
        series: {
          name: {
            primary: 'Contenidos asignados',
            secondary: 'Contenidos completados',
          },
        },
        axis: {
          x: {
            max: maxContentsCount,
            minGridDistance: 40,
            title: {
              label: 'Contenidos',
            },
          },
        },
      }

      return config
    })
  )

  quarterlyChartConfig$: Observable<
    ChartConfig
  > = this.quarterlyInteractions$.pipe(
    map(interactions => {
      const interactionHours = interactions.map(
        interaction => interaction.valueY
      )
      const maxHours = Math.max(...interactionHours)
      const maxRoundToTen =
        maxHours && maxHours > 10 ? (maxHours / 10 + 1) * 10 : 10

      const config: ChartConfig = {
        axis: {
          x: {
            title: {
              label: 'meses',
            },
          },
          y: {
            min: 0,
            minGridDistance: 20,
            max: maxRoundToTen,
            title: {
              label: 'Hs.',
              valign: 'bottom',
              dy: 25,
            },
          },
        },
      }

      return config
    })
  )
}
