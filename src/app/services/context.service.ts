import { Injectable } from '@angular/core'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import { Group, Subject } from '@ticmas/common-interfaces'
import get from 'lodash/fp/get'
import last from 'lodash/fp/last'
import { combineLatest, Observable, of } from 'rxjs'
import { filter, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators'
import { ContextActions } from '../actions'
import { ifObservable } from '../ngrx-helpers'
import { State } from '../reducers'
import { AuthService } from './auth.service'

@Injectable()
export class ContextService {
  constructor(private store: Store<State>, private auth: AuthService) {}

  private featureSelector = this.store.pipe(
    select(createFeatureSelector<State['context']>('context'))
  )

  contextList$: Observable<Group[]> = ifObservable(
    this.featureSelector.pipe(select('lastFetched')),
    this.featureSelector.pipe(
      select('list'),
      // TODO separar owner (puede ver/modificar) de owner (profe con curso asignado)
      withLatestFrom(this.auth.userInfo$),
      filter(([, user]) => !!user),
      map(([groups, user]) =>
        groups.filter(group =>
          group.owners
            .map(({ preferred_username }) => preferred_username)
            .includes(user.preferred_username)
        )
      ),
      shareReplay(1)
    ),
    of([]).pipe(tap(() => this.store.dispatch(ContextActions.fetch())))
  )

  contextSelection$: Observable<Group[]> = this.featureSelector.pipe(
    select('selection')
  )

  school$: Observable<Group> = ifObservable(
    this.featureSelector.pipe(select('school')),
    this.featureSelector.pipe(select('school')),
    this.contextList$.pipe(
      map(groups => groups.filter(g => g.type === 'Escuela')[0])
    )
  )

  schools$: Observable<Group[]> = this.featureSelector.pipe(select('schools'))

  hasOnboarding$: Observable<boolean> = this.school$.pipe(
    map(school => school?.config?.modules.some(mod => mod.key === 'onboarding'))
  )

  hasOnboarding2$: Observable<boolean> = this.school$.pipe(
    map(school =>
      school?.config?.modules.some(mod => mod.key === 'onboarding2')
    )
  )

  hasHomework$: Observable<boolean> = this.school$.pipe(
    map(school => school?.config?.modules.some(mod => mod.key === 'tareas'))
  )

  hasTraining$: Observable<boolean> = this.school$.pipe(
    map(school =>
      school?.config?.modules.some(mod => mod.key === 'capacitaciones')
    )
  )

  contextFilter$: Observable<Group[][]> = combineLatest(
    this.contextList$,
    this.contextSelection$
  ).pipe(
    map(([list, selection]) => {
      const nodeIds = list.map(get('_id'))

      return [null, ...selection].map(selectedNode =>
        list.filter(node => {
          if (node.schedule && node.schedule.length) {
            return false
          }
          if (selectedNode && node.parent) {
            return node.parent._id === selectedNode._id
          }
          return !nodeIds.includes(node.parent._id) && selectedNode === null
        })
      )
    }),
    shareReplay(1)
  )

  subjectsFilterBySelection$: Observable<Subject[]> = combineLatest(
    this.contextList$,
    this.contextSelection$
  ).pipe(
    map(([list, selection]) => {
      let selected = last(selection)
      let subjects = []
      while (selected) {
        if (selected.config.levelsBySubject) {
          subjects = subjects.concat(selected.config.levelsBySubject)
        }
        selected = list.find(c => c._id === get('parent._id', selected))
      }
      return subjects
    }),
    shareReplay(1)
  )

  scheduleFilterBySelection$: Observable<any[]> = combineLatest(
    this.contextList$,
    this.school$
  ).pipe(
    map(([list, selection]) => {
      const selected = selection
      while (selected) {
        if (selected._id) {
          return list.filter(l => l.parent._id === selected._id)
        }
      }
    }),
    shareReplay(1)
  )

  getContextSelect(id) {
    return this.store.select('context', 'list').pipe(
      map(course => {
        return course.find(c => c._id === id)
      })
    )
  }

  getDistributionGroup(course) {
    return this.store.select('distributionGroup', 'list').pipe(
      map(distributionGroups => {
        return distributionGroups.find(c => c.course === course)
      })
    )
  }

  getAuthUserOwnedCourses(groups, authUser) {
    return groups.filter(group =>
      group.owners.some(owner => owner.sub === authUser.sub)
    )
  }
}
