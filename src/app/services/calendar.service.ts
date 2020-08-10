import { Injectable } from '@angular/core'
import {
  createFeatureSelector,
  createSelector,
  select,
  Selector,
  Store,
} from '@ngrx/store'
import {
  addMinutes,
  differenceInMinutes,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getDay,
  isBefore,
  isToday,
  setHours,
  setMinutes,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import { Observable, zip } from 'rxjs'
import { map, shareReplay, withLatestFrom } from 'rxjs/operators'
import { State } from '../reducers'

@Injectable()
export class CalendarService {
  constructor(private store: Store<State>) {}

  private featureSelector = createFeatureSelector<State['calendar']>('calendar')

  private selectedDateSelector: Selector<State, Date> = createSelector(
    this.featureSelector,
    s => s.selectedDate
  )

  private weekDaysSelector: Selector<State, number[]> = createSelector(
    this.featureSelector,
    s => s.weekDays || [1, 2, 3, 4, 5]
  )

  private viewSelector: Selector<State, string> = createSelector(
    this.featureSelector,
    s => s.view
  )

  private weekStartsOnSelector: Selector<State, number> = createSelector(
    this.featureSelector,
    s => s.weekStartsOn
  )

  private hourScaleSelector: Selector<State, Date[]> = createSelector(
    this.featureSelector,
    ({
      hourScale: {
        from: [fromHour, fromMinutes],
        to: [toHour, toMinutes],
        step,
      } = {
        from: [0, 0],
        to: [20, 59],
        step: 60,
      },
    }) => {
      const today = startOfToday()
      let current = setMinutes(setHours(today, fromHour), fromMinutes)
      const end = setMinutes(setHours(today, toHour), toMinutes)
      const result = []
      while (isBefore(current, end)) {
        result.push(current)
        current = addMinutes(current, step)
      }
      result.push(current)
      return result
    }
  )

  private startOfMonthSelector: Selector<State, Date> = createSelector(
    this.featureSelector,
    s => startOfMonth(s.selectedDate)
  )

  private endOfMonthSelector: Selector<State, Date> = createSelector(
    this.featureSelector,
    s => endOfMonth(s.selectedDate)
  )

  private startOfWeekSelector: Selector<State, Date> = createSelector(
    this.featureSelector,
    this.weekStartsOnSelector,
    ({ selectedDate }, weekStartsOn: any) =>
      startOfWeek(selectedDate, { weekStartsOn })
  )

  private endOfWeekSelector: Selector<State, Date> = createSelector(
    this.featureSelector,
    this.weekStartsOnSelector,
    ({ selectedDate }, weekStartsOn: any) =>
      endOfWeek(selectedDate, { weekStartsOn })
  )

  selectedDate$: Observable<Date> = this.store.pipe(
    select(this.selectedDateSelector),
    shareReplay(1)
  )

  view$: Observable<string> = this.store.pipe(
    select(this.viewSelector),
    shareReplay(1)
  )

  weekDays$: Observable<number[]> = this.store.pipe(
    select(this.weekDaysSelector),
    shareReplay(1)
  )

  hourScale$: Observable<Date[]> = this.store.pipe(
    select(this.hourScaleSelector),
    shareReplay(1)
  )

  startOfMonth$: Observable<Date> = this.store.pipe(
    select(this.startOfMonthSelector),
    shareReplay(1)
  )

  endOfMonth$: Observable<Date> = this.store.pipe(
    select(this.endOfMonthSelector),
    shareReplay(1)
  )

  startOfWeek$: Observable<Date> = this.store.pipe(
    select(this.startOfWeekSelector),
    shareReplay(1)
  )

  endOfWeek$: Observable<Date> = this.store.pipe(
    select(this.endOfWeekSelector),
    shareReplay(1)
  )

  daysOfWeek$: Observable<Date[]> = zip(
    this.startOfWeek$,
    this.endOfWeek$
  ).pipe(
    withLatestFrom(this.weekDays$),
    map(([[start, end], weekDays]) =>
      eachDayOfInterval({ start, end }).filter(d =>
        weekDays.includes(getDay(d))
      )
    ),
    shareReplay(1)
  )

  daysOfMonth$: Observable<Date[]> = zip(
    this.startOfMonth$,
    this.endOfMonth$
  ).pipe(
    map(([start, end]) => eachDayOfInterval({ start, end })),
    shareReplay(1)
  )

  schedules$: Observable<any> = this.store.select('context', 'list').pipe(
    map(courses => {
      const data = []
      courses.map(course => {
        let dataCourse = {}
        course.schedule.map(c => {
          dataCourse = {
            id: course._id,
            title: course.name,
            rrule: c.rrule,
            duration: this.getDuration(c.duration),
            backgroundColor: this.getColor(course.color),
          }
          data.push(dataCourse)
        })
      })
      return data
    })
  )

  public static percentualWithinRange(
    scale: Date[],
    from: Date,
    duration: number
  ) {
    const range = differenceInMinutes(scale[scale.length - 1], scale[0])
    const minutesDay = 24 * 60
    let relativeStart = differenceInMinutes(from, scale[0]) % minutesDay
    while (relativeStart < 0) {
      relativeStart += minutesDay
    }
    return {
      percentStart: (relativeStart / range) * 100,
      percentDuration: (duration / range) * 100,
    }
  }

  isToday(date: Date): boolean {
    return isToday(date)
  }

  getDuration(d) {
    const hour = Math.floor(d / 60)
    const min = d % 60
    if (min < 10) {
      return `0${hour}:0${min}`
    } else {
      return `0${hour}:${min}`
    }
  }

  getColor(c) {
    switch (c) {
      case '#6f5cb8':
        return 'rgb(95, 245, 188)'
      case '#6deebc':
        return 'rgb(255, 81, 0)'
      case '#fbb431':
        return 'rgb(255, 170, 50)'
      case '#4fdaf2':
        return 'rgb(62, 157, 245)'
      case '#f39eb8':
        return 'rgb(173, 216, 230)'
      case '#fcf095':
        return 'rgb(47, 252, 173)'
      case '#fcf095':
        return 'rgb(178, 252, 156)'
      case '#964120':
        return 'rgb(255, 115, 162)'
      case '#db9ef3':
        return 'rgb(81, 220, 252)'
      case '#dfcba8':
        return 'rgb(186, 171, 171)'
      default:
        return 'rgb(95, 245, 188)'
    }
  }
}
