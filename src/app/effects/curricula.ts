import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { CdmsService, RmService, ToastService } from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators'
import { CurriculaActions } from '../actions'
import { LoadingActions } from '../actions/loading'
import { State } from '../reducers'

@Injectable()
export class CurriculaEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private rm: RmService,
    private cdms: CdmsService,
    private toast: ToastService
  ) {}

  @Effect()
  curricula$ = this.actions$.pipe(
    ofType(CurriculaActions.GET_CURRICULA),
    withLatestFrom(this.store.select('context', 'selection')),
    switchMap<any, any>(([action, selectedGroups]) => {
      const tags = {
        jurisdiccion:
          selectedGroups[selectedGroups.length - 1].ancestors[0].name,
        materia: action.payload[0].subject.subjectName,
        nivel: action.payload[0].subject.levelName,
      }
      return this.rm.getCurriculaFilters({ tags: Object.values(tags) }).pipe(
        switchMap(res => of(CurriculaActions.getCurriculaSucces(res))),
        catchError(err =>
          of(
            this.toast.showToast(
              'No hay curriculas disponibles para este curso.',
              null,
              { status: 'danger' }
            ),
            CurriculaActions.showErrorCurricula(true),
            LoadingActions.loadingSite(false)
          )
        )
      )
    })
  )

  @Effect()
  setThemes$ = this.actions$.pipe(
    ofType(CurriculaActions.SUCCES_CURRICULA),
    withLatestFrom(this.store.select('distributionGroup', 'selection')),
    switchMap<any, any>(([action, id]) => {
      return this.cdms
        .updateDistributionGroupThemes(id, action.payload[0].themes)
        .pipe(
          switchMap(res =>
            of(
              CurriculaActions.importCurricula(action.payload[0].title),
              CurriculaActions.setThemesSuccess({
                group: id,
                themes: action.payload[0].themes,
              }),
              LoadingActions.loadingSite(false)
            )
          ),
          catchError(err =>
            of(
              this.toast.showToast('Algo falló, intenta nuevamente', null, {
                status: 'danger',
              }),
              LoadingActions.loadingSite(false)
            )
          )
        )
    })
  )
}
