import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { PlannedContent, Resource } from '@ticmas/common-interfaces'
import addDays from 'date-fns/addDays'
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import isWithinInterval from 'date-fns/isWithinInterval'
import { es } from 'date-fns/locale'
import parseISO from 'date-fns/parseISO'
import get from 'lodash/get'
import { Observable, of } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { ResourcesActions } from '../actions'
import { LoadingActions } from '../actions/loading'
import { Content } from '../models/metrics'
import { ifObservable } from '../ngrx-helpers'
import { DistributionGroupService } from './distribution-group.service'
import { PlanificationService } from './planification.service'

@Injectable({
  providedIn: 'root',
})
export class ContentsService {
  constructor(
    private store: Store<any>,
    public planificationService: PlanificationService,
    public distributionGroupService: DistributionGroupService,
    private router: Router
  ) {}

  resource$: Observable<Resource> = ifObservable(
    this.store.select('previewResource'),
    this.store.select('previewResource'),
    of(null).pipe(
      tap(() => {
        const contentId = this.router.url.substr(
          this.router.url.lastIndexOf('/') + 1
        )
        this.store.dispatch(ResourcesActions.getResource(contentId))
        this.store.dispatch(LoadingActions.loadingSite(true))
      })
    )
  )

  editableResource$: Observable<Resource> = this.store.select(
    'editableResource'
  )

  isResourceLoading$: Observable<boolean> = this.store.select(
    'uiStates',
    'loading'
  )

  assignContentLoading$: Observable<boolean> = this.store.select(
    'groupEdit',
    'assignContentLoading'
  )

  getViewsContent(): Observable<any> {
    const views$ = this.store.select('statements')
    const views = []
    return views$.pipe(
      map(statements => {
        if (statements) {
          const data = statements.list.filter(({ object, verb }) => {
            const resource = object.id.split('//')
            if (verb.id.includes('attempted') && resource[1] !== undefined) {
              views.push(resource[1])
            }
          })
        }
        return { count_views: { ...this.getCountViews(views) } }
      })
    )
  }

  getRepeatedContents(contentId: string = null): Observable<PlannedContent[]> {
    return this.planificationService.selectedGroup$.pipe(
      withLatestFrom(this.resource$),
      map(([selectedGroup, resource]) =>
        selectedGroup.contents.filter(
          content =>
            content.resource._id === resource._id && content._id !== contentId
        )
      )
    )
  }

  getCountViews(resources) {
    const res = []
    resources.foreach(r => {
      if (res[r]) {
        res[r]++
      } else {
        res[r] = 1
      }
    })
    return res
  }

  setResource(r) {
    this.store.dispatch(ResourcesActions.previewResource(r))
  }

  openContentPreview(resource: Resource) {
    this.setResource(resource)
    this.router.navigate(['/biblioteca/' + resource._id])
  }

  checkOverlap(contents, startDate, endDate) {
    const isOverlapping = contents.find(content => {
      const contentStart: Date = this.startDate(content)
      const contentEnd: Date = this.dueDate(contentStart, content.duration)

      return areIntervalsOverlapping(
        { start: contentStart, end: contentEnd },
        { start: startDate, end: endDate },
        {
          inclusive: true,
        }
      )
    })
    return isOverlapping ? true : false
  }

  setContentFullData(content) {
    const startDate = this.startDate(content)
    const dueDate = this.dueDate(startDate, content.duration)
    const resource = {
      ...content.resource,
      assets: content.resource.assets.map(asset => ({
        ...asset,
        embeds: asset.embeds.map(embed => ({
          ...embed,
          _id: `${asset._id}/${embed.id}`,
        })),
      })),
    }

    const attachments = get(content, 'attachments', [])

    const result = {
      ...content,
      attachments: attachments.filter(Boolean),
      resource,
      startDate: format(startDate, 'dd/MM/yyyy'),
      dueDate: format(dueDate, 'dd/MM/yyyy'),
      status: this.getContentValidityStatus(startDate, dueDate),
      daysToCurrent: this.getDaysToCurrentDate(dueDate),
    }

    return result
  }

  getContentValidityStatus(startDate, dueDate) {
    const currentDate = new Date()
    const isActive = this.isActive(currentDate, startDate, dueDate)
    const isDue = this.isDue(currentDate, dueDate)
    const isNextToDue = this.isNextToDue(currentDate, dueDate)
    return isDue
      ? 'isDue'
      : isNextToDue
      ? 'isNextToDue'
      : isActive
      ? 'isActive'
      : ''
  }

  getDaysToCurrentDate(dueDate: Date) {
    const currentDate = new Date()
    return differenceInCalendarDays(dueDate, currentDate)
  }

  startDate(content): Date {
    const startDate = parseISO(content.startDate)
    return startDate
  }

  dueDate(startDate, duration): Date {
    const dueDate = addDays(startDate, +duration)
    return dueDate
  }

  isActive(currentDate, start, end) {
    return isWithinInterval(currentDate, { start, end })
  }

  isDue(currentDate, dueDate) {
    return isBefore(dueDate, currentDate)
  }

  isNextToDue(currentDate, dueDate) {
    const nextDays = addDays(currentDate, 14)
    return isWithinInterval(dueDate, { start: currentDate, end: nextDays })
  }

  formatedLastInteraction(date) {
    let res = date
    if (date) {
      const lastInteraction = parseISO(date)
      res = {
        normal: format(lastInteraction, 'dd/MM/yyyy'),
        calendar: {
          month: format(lastInteraction, 'MMMM', { locale: es }),
          day: format(lastInteraction, 'dd'),
        },
      }
    }
    return res
  }

  sortByValidity(contents: Content[]) {
    const sort = contents.sort((a, b) => {
      const daysA = a.daysToCurrent
      const daysB = b.daysToCurrent
      const absA = Math.abs(daysA)
      const absB = Math.abs(daysB)
      return absA > absB
        ? 1
        : absA === absB
        ? daysA > daysB
          ? 1
          : daysA === daysB
          ? 0
          : -1
        : -1
    })

    return sort
  }
}
