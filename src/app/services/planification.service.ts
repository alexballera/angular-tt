import { Injectable } from '@angular/core'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import {
  DistributionGroup,
  Group,
  PlannedTheme,
  UserInfo,
} from '@ticmas/common-interfaces'
import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  parseISO,
  subDays,
} from 'date-fns'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import groupBy from 'lodash/fp/groupBy'
import keyBy from 'lodash/fp/keyBy'
import keys from 'lodash/fp/keys'
import mapValues from 'lodash/fp/mapValues'
import reduce from 'lodash/fp/reduce'
import _tap from 'lodash/fp/tap'
import { RRule } from 'rrule'
import { combineLatest, Observable, of } from 'rxjs'
import { map, shareReplay, tap } from 'rxjs/operators'
import { DistributionGroupActions } from '../actions'
import { DistributionGroupInContext, PlannedDay } from '../models'
import { ifObservable } from '../ngrx-helpers'
import { State } from '../reducers'
import { AuthService } from './auth.service'
import { CalendarService } from './calendar.service'
import { ContextService } from './context.service'

@Injectable()
export class PlanificationService {
  constructor(
    private store: Store<State>,
    private calendar: CalendarService,
    private context: ContextService,
    private auth: AuthService
  ) {}

  public featureSelector = this.store.pipe(
    select(
      createFeatureSelector<State['distributionGroup']>('distributionGroup')
    )
  )

  distributionGroup$: Observable<DistributionGroup[]> = ifObservable(
    this.featureSelector.pipe(select('lastFetched')),
    combineLatest([
      this.auth.userInfo$,
      this.featureSelector.pipe(select('list')),
    ]).pipe(
      map(([user, list]) =>
        list.filter(dg => dg.owners.map(get('sub')).includes(user.sub))
      )
    ),
    of([]).pipe(
      tap(() => this.store.dispatch(DistributionGroupActions.fetch()))
    )
  )

  distributionGroups$: Observable<DistributionGroupInContext[]> = ifObservable(
    this.featureSelector.pipe(select('lastFetched')),
    combineLatest([
      this.auth.userInfo$,
      this.featureSelector.pipe(select('list')),
      this.context.contextList$,
    ]).pipe(
      map<
        [UserInfo, DistributionGroup[], Group[]],
        [DistributionGroup[], Group[]]
      >(([user, list, contexts]) => [
        list.filter(dg => dg.owners.map(get('sub')).includes(user.sub)),
        contexts,
      ]),
      map<[DistributionGroup[], Group[]], DistributionGroupInContext[]>(
        ([list, contexts]) =>
          list.map(group => PlanificationService.addContext(group, contexts))
      ),
      shareReplay(1)
    ),
    of([]).pipe(
      tap(() => this.store.dispatch(DistributionGroupActions.fetch()))
    )
  )

  groupId$: Observable<string> = this.featureSelector.pipe(select('selection'))

  distributionGroupsLength$: Observable<number> = this.distributionGroups$.pipe(
    map(distributionGroups => distributionGroups.length)
  )

  usersForm$: Observable<any> = this.featureSelector.pipe(select('usersForm'))

  selectedGroup$: Observable<DistributionGroupInContext> = combineLatest(
    this.distributionGroups$,
    this.featureSelector.pipe(select('selection')),
    this.featureSelector.pipe(select('subgroupSelected'))
  ).pipe(
    map(
      ([groups, selection, subgroupSelected]) =>
        groups.find(g => g._id === subgroupSelected) ||
        groups.find(g => g._id === selection) ||
        groups[0]
    ),
    shareReplay(1)
  )

  selectedTheme$: Observable<PlannedTheme> = this.store.select(
    'groupEdit',
    'theme'
  )

  weekPlanification$: Observable<PlannedDay[]> = combineLatest(
    this.distributionGroups$,
    this.context.contextList$,
    this.calendar.daysOfWeek$,
    this.calendar.hourScale$
  ).pipe(
    map(([g, c, d, s]) =>
      PlanificationService.planificationForDays(g, c, d, s)
    ),
    shareReplay(1)
  )

  monthPlanification$: Observable<PlannedDay[]> = combineLatest([
    this.distributionGroups$,
    this.context.contextList$,
    this.calendar.daysOfMonth$,
  ]).pipe(
    map(([g, c, d]) => PlanificationService.planificationForDays(g, c, d)),
    shareReplay(1)
  )

  schedules$: Observable<any> = this.distributionGroups$.pipe(
    map(groups => {
      const groupsByCourse = Object.values(groupBy('course._id', groups)).map(
        list => ({
          course: list[0].course,
          list,
        })
      )
      const data = []
      groupsByCourse.forEach(({ course, list }) => {
        let dataCourse = {}
        const contents = list.reduce(
          (total, dg) => total.concat(dg.contents),
          []
        )
        course.schedule.forEach(c => {
          dataCourse = {
            id: course._id,
            title: course.name,
            rrule: c.rrule,
            duration: this.getDuration(c.duration),
            backgroundColor: course.color,
            contents,
          }
          data.push(dataCourse)
        })
      })
      return data
    })
  )
  private getDuration(d) {
    const hour = Math.floor(d / 60)
    const min = d % 60
    if (min < 10) {
      return `0${hour}:0${min}`
    } else {
      return `0${hour}:${min}`
    }
  }
  private getColor(c) {
    switch (c) {
      case '1':
        return 'rgb(95, 245, 188)'
      case '2':
        return 'rgb(255, 81, 0)'
      case '3':
        return 'rgb(255, 170, 50)'
      case '4':
        return 'rgb(62, 157, 245)'
      case '5':
        return 'rgb(173, 216, 230)'
      case '6':
        return 'rgb(47, 252, 173)'
      case '7':
        return 'rgb(178, 252, 156)'
      case '8':
        return 'rgb(255, 115, 162)'
      case '9':
        return 'rgb(81, 220, 252)'
      case '10':
        return 'rgb(186, 171, 171)'
      default:
        return 'rgb(95, 245, 188)'
    }
  }

  private static addContext(group, contexts): DistributionGroupInContext {
    return {
      ...group,
      course: contexts.find(c => c._id === group.course) || {
        _id: group.course,
      },
    }
  }

  private static planificationForDays(
    groups: DistributionGroupInContext[],
    contexts: Group[],
    dates: Date[],
    scale?: Date[]
  ) {
    const coursesById = keyBy('_id', contexts)
    const serializeDate = d => format(d, 'YYYY-MM-DD')
    const lastDate = endOfDay(dates[dates.length - 1])
    const scheduledInstances = flow(
      filter('schedule.length'),
      keyBy('_id'),
      mapValues<any, any>(context =>
        context.schedule.reduce((acc, { rrule, duration }) => {
          return acc.concat(
            RRule.fromString(rrule)
              .between(dates[0], lastDate, true)
              .map(date => ({ date, duration }))
          )
        }, [])
      ),
      mapValues<any, any>(
        groupBy((sch: { date: Date; duration: string }) =>
          serializeDate(sch.date)
        )
      )
    )(contexts)

    return dates.map<PlannedDay>(date => {
      const planification = {}
      const schedule = []
      const groupColors = {}

      for (const context of contexts) {
        for (const contextSchedule of get(
          [context._id, serializeDate(date)],
          scheduledInstances
        ) || []) {
          schedule.push({
            context,
            subjects: flow(
              filter<DistributionGroupInContext>(
                g => g.course._id === context._id
              ),
              _tap(grs =>
                grs.forEach(group => {
                  groupColors[group._id] = get(
                    [group.course._id, 'color'],
                    coursesById
                  )
                })
              ),
              keyBy('category'),
              keys
            )(groups),
            ancestorsNames: context.ancestors
              .slice()
              .reverse()
              .slice(0, 2)
              .map(a => a.name)
              .join(' - '),
            color: context.color,
            contents: flow(
              filter<DistributionGroupInContext>(
                g => g.course._id === context._id
              ),
              reduce((contents, group) => contents.concat(group.contents), []),
              filter(c => {
                const contentStartDate = parseISO(c.startDate)
                const contentEndDate = addDays(contentStartDate, +c.duration)
                return (
                  isBefore(contentStartDate, contentEndDate) &&
                  isWithinInterval(date, {
                    start: contentStartDate,
                    end: contentEndDate,
                  })
                )
              })
            )(groups),
            themes: [],
            ...(scale
              ? CalendarService.percentualWithinRange(
                  scale,
                  contextSchedule.date,
                  contextSchedule.duration
                )
              : {}),
          })
        }
      }
      for (const group of groups) {
        if (!planification[group._id]) {
          planification[group._id] = {
            group,
            contents: [],
            currentContents: [],
            dueContents: [],
            themes: [],
            color: get([group.course._id, 'color'], coursesById),
          }
        }
        for (const theme of group.themes) {
          const difference = differenceInDays(date, parseISO(theme.startDate))
          if (difference >= 0 && difference < Number(theme.duration)) {
            planification[group._id].themes.push(theme)
            schedule
              .filter(sch => sch.context._id === group.course._id)
              .forEach(sch => sch.themes.push(theme))
          }
        }
        for (const content of group.contents) {
          if (content.startDate) {
            const contentStartDate = parseISO(content.startDate)
            const contentEndDate = addDays(contentStartDate, +content.duration)
            if (isSameDay(date, contentStartDate)) {
              planification[group._id].contents.push(content)
            }
            if (
              isBefore(
                addDays(contentStartDate, 1),
                subDays(contentEndDate, 0)
              ) &&
              isWithinInterval(date, {
                start: addDays(contentStartDate, 1),
                end: subDays(contentEndDate, 1),
              })
            ) {
              planification[group._id].currentContents.push(content)
            }
            if (isSameDay(date, contentEndDate)) {
              planification[group._id].dueContents.push(content)
            }
          }
        }
      }
      return { date, schedule, planification, groupColors }
    })
  }
}
