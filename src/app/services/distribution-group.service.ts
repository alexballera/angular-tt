import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import get from 'lodash/fp/get'
import has from 'lodash/fp/has'
import { combineLatest, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { DistributionGroupInContext } from '../models'
import { State } from '../reducers'
import { AuthService } from './auth.service'
import { PlanificationService } from './planification.service'

@Injectable({
  providedIn: 'root',
})
export class DistributionGroupService {
  constructor(
    private store: Store<State>,
    private planification: PlanificationService,
    private auth: AuthService
  ) {}

  courseEdit$ = this.store.select('distributionGroup', 'editCourse')

  groups$: Observable<any> = combineLatest([
    this.auth.userInfo$,
    this.store.select('distributionGroup', 'list'),
  ]).pipe(
    map(([user, list]) =>
      list.filter(dg => dg.owners.map(get('sub')).includes(user.sub))
    )
  )

  selected$: Observable<any> = this.store.select(
    'distributionGroup',
    'selection'
  )

  haveSelectedGroup$: Observable<boolean> = this.selected$.pipe(
    map(selected => !(selected === '' || selected === null))
  )

  attachContent$: Observable<any> = this.store.select(
    'distributionGroup',
    'attachContent'
  )
  attachFiles$: Observable<any> = this.store.select(
    'distributionGroup',
    'attachFilesContent'
  )

  attachCoverLoading$: Observable<boolean> = this.store.select(
    'distributionGroup',
    'attachCoverLoading'
  )

  selectedCourseGroups$: Observable<
    DistributionGroupInContext[]
  > = combineLatest([this.planification.selectedGroup$, this.groups$]).pipe(
    filter(
      ([selectedGroup, groups]) =>
        has('course._id', selectedGroup) && !!groups.length
    ),
    map(([selectedGroup, groups]) => {
      const course = get('course._id', selectedGroup)
      const courseGroups = groups.filter(g => g.course === course)
      return courseGroups
    })
  )

  subGroups$: Observable<any> = combineLatest([
    this.groups$,
    this.selected$,
  ]).pipe(
    map(([list, selection]) => {
      return list.filter(g => g.parent === selection)
    })
  )
}
