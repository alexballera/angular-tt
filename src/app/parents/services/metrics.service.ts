import { Injectable } from '@angular/core'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import { DistributionGroupInContext } from '@ticmas/common-interfaces'
import get from 'lodash/get'
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
import sumBy from 'lodash/sumBy'
import { combineLatest, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { ContentsService } from '../../services/contents.service'
import { ContextService } from '../../services/context.service'
import { State } from '../ngrx'
import { featureName } from '../ngrx/ngrx.module'

@Injectable({
  providedIn: 'root',
})
export class ParentsMetricsService {
  constructor(
    private store: Store<State>,
    private context: ContextService,
    private contentsService: ContentsService
  ) {}

  addContext(group, contexts): DistributionGroupInContext {
    return {
      ...group,
      course: contexts.find(c => c._id === group.course) || {
        _id: group.course,
      },
    }
  }

  featureSelector$ = this.store.pipe(
    select(createFeatureSelector<State>(featureName))
  )

  metrics$: Observable<any> = this.featureSelector$.pipe(
    select('distributionGroups', 'metrics')
  )

  courseList$: Observable<any[]> = combineLatest([
    this.featureSelector$.pipe(select('distributionGroups', 'list')),
    this.context.contextList$,
  ]).pipe(
    map(([list, contexts]) =>
      list.map(group => ({
        ...this.addContext(group, contexts),
        contents: group.contents.map(c =>
          this.contentsService.setContentFullData(c)
        ),
      }))
    ),
    map(groups =>
      groups
        .filter(g => !has(g, 'parent'))
        .map(g => ({
          ...g.course,
          parentGroup: g,
        }))
    )
  )

  statusCounter$: Observable<any> = combineLatest([
    this.courseList$,
    this.metrics$,
  ]).pipe(
    filter(([, metrics]) => !isEmpty(metrics)),
    map(([list, metrics]) => {
      const results = list.map(course => {
        const courseMetrics = get(metrics, course.parentGroup.registration)

        const data = {
          due: 0,
          notIniciated: 0,
          active: 0,
        }

        course.parentGroup.contents.forEach(c => {
          const started = get(
            courseMetrics,
            `all.list.${c._id}.metrics.assets.total.started`,
            0
          )

          const isCompleted = get(
            courseMetrics,
            `all.list.${c._id}.metrics.complete`,
            false
          )

          if (c.status === 'isDue' && !isCompleted) {
            data.due++
          }

          if (started > 0 && !isCompleted) {
            data.active++
          }

          if (c.status === 'active' && !started) {
            data.notIniciated++
          }
        })

        return data
      })

      return {
        due: sumBy(results, (r: any) => r.due),
        notIniciated: sumBy(results, (r: any) => r.notIniciated),
        active: sumBy(results, (r: any) => r.active),
      }
    })
  )
}
