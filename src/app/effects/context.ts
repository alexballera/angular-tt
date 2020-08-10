import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Group } from '@ticmas/common-interfaces'
import { EomtService, ToastService } from '@ticmas/common-services'
import { of } from 'rxjs'
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators'
import { ContextActions, DistributionGroupActions } from '../actions'
import { LoadingActions } from '../actions/loading'
import { State } from '../reducers'
import { AuthService } from '../services/auth.service'
import { ContextService } from '../services/context.service'

interface Schedule {
  from: Date
  to: Date
}

interface ContextCreationAction {
  type: string
  payload: {
    name: string
    color: string
    schedule: {
      [day: number]: Schedule
    }
  }
}

@Injectable()
export class ContextEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private auth: AuthService,
    private contextService: ContextService,
    private eomt: EomtService,
    private toast: ToastService
  ) {}

  @Effect()
  context$ = this.actions$.pipe(
    ofType(ContextActions.FETCH),
    mergeMap<any, any>(() =>
      this.eomt.getGroups().pipe(
        withLatestFrom(this.auth.userInfo$),
        map(([groups, authUser]) =>
          this.contextService.getAuthUserOwnedCourses(groups, authUser)
        ),
        switchMap<any, any>(groups => of(ContextActions.fetchSuccess(groups))),
        catchError(err =>
          of(
            LoadingActions.loadingSite(false),
            ContextActions.fetchFailure(null),
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            })
          )
        )
      )
    )
  )

  @Effect()
  contextCreate$ = this.actions$.pipe(
    ofType<any>(ContextActions.CREATE),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(this.contextService.school$, this.auth.userInfo$)
      )
    ),
    map(([{ payload }, selection, user]) => {
      const getIdAndName = ({ _id, name }: Partial<Group>) => ({ _id, name })
      const parent = selection ? selection : null
      return {
        group: {
          _id: payload._id,
          name: payload.name,
          owners: [user],
          ancestors: parent
            ? parent.ancestors.map(getIdAndName).concat(getIdAndName(parent))
            : [],
          parent: parent ? getIdAndName(parent) : null,
          color: payload.color,
          schedule: payload.schedule,
        },
        course: payload,
      }
    }),
    switchMap(data =>
      this.eomt.createGroup(data.group).pipe(
        switchMap<any, any>(group =>
          of(
            ContextActions.createSuccess(group),
            DistributionGroupActions.createMany({
              data: data.course,
              group,
            })
          )
        ),
        catchError(err =>
          of(
            LoadingActions.loadingSite(false),
            ContextActions.createFailure(null),
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            })
          )
        )
      )
    )
  )

  @Effect()
  deleteContext$ = this.actions$.pipe(
    ofType(ContextActions.DELETE),
    withLatestFrom(this.store.select('distributionGroup', 'list')),
    mergeMap<any, any>(([action, list]) =>
      this.eomt.deleteGroup(action.payload).pipe(
        switchMap<any, any>(() =>
          of(
            ContextActions.deleteSuccess(action.payload),
            DistributionGroupActions.deleteDistributionGroupByCourse(
              action.payload
            )
          )
        ),
        catchError(err =>
          of(
            LoadingActions.loadingSite(false),
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            })
          )
        )
      )
    )
  )

  @Effect()
  cancelCreateContext$ = this.actions$.pipe(
    ofType(ContextActions.CANCEL_CREATE),
    withLatestFrom(this.store.select('context', 'tmpContext')),
    switchMap<any, any>(([action, idGroup]) =>
      this.eomt.deleteGroup(idGroup).pipe(
        switchMap(() =>
          of(
            ContextActions.deleteSuccess(idGroup),
            LoadingActions.loadingSite(false)
          )
        ),
        catchError(err => {
          return of(
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            })
          )
        })
      )
    )
  )

  @Effect()
  updateGroup$ = this.actions$.pipe(
    ofType(ContextActions.UPDATE),
    switchMap<any, any>(({ payload }) => {
      return this.eomt.updateGroup(payload._id, payload).pipe(
        switchMap(() => {
          this.toast.showToast(
            'Se ha actualizado los datos de la clase exitosamente',
            null,
            {
              status: 'success',
            }
          )
          return of(ContextActions.fetch(), LoadingActions.loadingSite(false))
        }),
        catchError(err =>
          of(
            LoadingActions.loadingSite(false),
            this.toast.showToast('Ocurrió un error, intenta nuevamente', null, {
              status: 'danger',
            })
          )
        )
      )
    })
  )
}
