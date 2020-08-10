import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Store } from '@ngrx/store'
import sortBy from 'lodash/fp/sortBy'
import { map } from 'rxjs/operators'
import {
  fetchData,
  generalGuideSelector,
  listSelector,
  selectedSkillSelector,
  selectedSkillViewSelector,
  selectSkill,
  selectSkillView,
} from './ngrx'

@Injectable()
export class SoftSkillsService implements Resolve<void> {
  constructor(private store: Store<any>) {}

  generalGuide$ = this.store.select(generalGuideSelector)

  list$ = this.store.select(listSelector).pipe(map(sortBy('publishedAt')))

  selectedSkill$ = this.store.select(selectedSkillSelector)

  selectedSkillView$ = this.store.select(selectedSkillViewSelector)

  selectSkill(skill) {
    this.store.dispatch(selectSkill({ skill }))
  }

  selectSkillView(view) {
    this.store.dispatch(selectSkillView({ view }))
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(fetchData.request())
  }

  setOnboardingFlag(onboarding: string) {
    localStorage.setItem(onboarding, 'opened')
  }

  getOnboardingFlag(onboarding: string) {
    return localStorage.getItem(onboarding)
  }
}
