import { Injectable } from '@angular/core'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { ifObservable } from '../ngrx-helpers'
import { State } from '../reducers'
import { AuthService } from './auth.service'

@Injectable()
export class IntegrationsService {
  constructor(private store: Store<State>, private auth: AuthService) {}

  private featureSelector = this.store.pipe(
    select(createFeatureSelector<State['integrations']>('integrations'))
  )

  classroomLoading$: Observable<boolean> = this.featureSelector.pipe(
    select('classroomLoading')
  )
}
