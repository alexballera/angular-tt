import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { CdmsService, ToastService } from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators'
import {
  DistributionGroupActions,
  GroupEditActions,
  UiStatesActions,
} from '../actions'
import { LoadingActions } from '../actions/loading'
import { LayoutService } from '../components/layout/layout.module'
import { State } from '../reducers'

@Injectable()
export class GroupEditEffects {
  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private cdms: CdmsService,
    private toast: ToastService,
    private layoutService: LayoutService
  ) {}

  @Effect()
  saveContents$ = this.actions$.pipe(
    ofType(GroupEditActions.SAVE_CONTENTS),
    withLatestFrom(
      this.store.select('distributionGroup'),
      this.store.select('editableResource')
    ),
    switchMap<any, any>(
      ([
        { payload },
        { selection, subgroupSelected, attachContent },
        resource,
      ]) => {
        const newResource = {
          ...resource,
          tags: payload.tags,
        }
        const content = {
          ...payload,
          resource: newResource,
          attachments: attachContent,
        }
        return this.cdms
          .createDistributionGroupContents(subgroupSelected || selection, [
            content,
          ])
          .pipe(
            switchMap(group => {
              this.toast.showToast(
                'El contenido se ha asignado correctamente',
                null,
                {
                  status: 'success',
                }
              )
              return of(
                DistributionGroupActions.fetch(),
                DistributionGroupActions.resetAttachContent(),
                GroupEditActions.saveContentsSuccess({})
              )
            }),
            catchError(err => {
              this.toast.showToast('Error', null, { status: 'danger' })
              return of(GroupEditActions.saveContentsFailure({}))
            })
          )
      }
    )
  )

  @Effect()
  removeResource$ = this.actions$.pipe(
    ofType(GroupEditActions.DELETE_CONTENT),
    switchMap<any, any>(({ payload }) =>
      this.cdms
        .deleteDistributionGroupContent(payload.group._id, payload.content._id)
        .pipe(
          switchMap(() => {
            this.toast.showToast('Se ha eliminado el contenido', null, {
              status: 'success',
            })
            return of(DistributionGroupActions.fetch())
          }),
          catchError(err =>
            of(
              LoadingActions.loadingSite(false),
              this.toast.showToast(
                'Se exportó la planificación correctamente',
                null,
                { status: 'success' }
              )
            )
          )
        )
    )
  )

  @Effect()
  addTheme$ = this.actions$.pipe(
    ofType(GroupEditActions.ADD_THEME),
    switchMap<any, any>(({ payload: { group, theme } }) =>
      this.cdms.createDistributionGroupTheme(group._id, theme).pipe(
        switchMap(newTheme =>
          of(
            GroupEditActions.addThemeSuccess({ group, theme: newTheme }),
            this.toast.showToast('Se ha agregado el tema', null, {
              status: 'success',
            })
          )
        ),
        catchError(err =>
          of(
            GroupEditActions.addThemeFailure({}),
            this.toast.showToast(
              'Se exportó la planificación correctamente',
              null,
              { status: 'success' }
            )
          )
        )
      )
    )
  )

  @Effect()
  updateTheme$ = this.actions$.pipe(
    ofType(GroupEditActions.UPDATE_THEME),
    switchMap<any, any>(({ payload: { group, theme } }) => {
      const { _id, ...data } = theme
      return this.cdms.updateDistributionGroupTheme(group._id, _id, data).pipe(
        switchMap(() =>
          of(
            GroupEditActions.updateThemeSuccess({ group, theme }),
            this.toast.showToast('Se ha actualizado el tema', null, {
              status: 'success',
            })
          )
        ),
        catchError(err =>
          of(
            GroupEditActions.updateThemeFailure({}),
            this.toast.showToast(
              'Se exportó la planificación correctamente',
              null,
              { status: 'success' }
            )
          )
        )
      )
    })
  )

  @Effect()
  deleteTheme$ = this.actions$.pipe(
    ofType(GroupEditActions.DELETE_THEME),
    switchMap<any, any>(({ payload: { group, theme } }) =>
      this.cdms.deleteDistributionGroupTheme(group._id, theme._id).pipe(
        switchMap(() =>
          of(
            GroupEditActions.deleteThemeSuccess({ group, theme }),
            this.toast.showToast('Se ha eliminado el tema', null, {
              status: 'success',
            })
          )
        ),
        catchError(err =>
          of(
            GroupEditActions.deleteThemeFailure({}),
            this.toast.showToast(
              'Se exportó la planificación correctamente',
              null,
              { status: 'success' }
            )
          )
        )
      )
    )
  )

  @Effect()
  updateContent$ = this.actions$.pipe(
    ofType(GroupEditActions.UPDATE_CONTENT),
    withLatestFrom(
      this.store.select('distributionGroup', 'selection'),
      this.store.select('distributionGroup', 'subgroupSelected'),
      this.store.select('distributionGroup', 'attachContent')
    ),
    switchMap<any, any>(([payload, group, subgroup, attachments]) => {
      const contents = {
        ...payload.payload.content,
        attachments,
      }
      return this.cdms
        .updateDistributionGroupContent(
          subgroup || group,
          payload.payload.content._id,
          contents
        )
        .pipe(
          switchMap(() => {
            this.toast.showToast('Se ha actualizado el contenido', null, {
              status: 'success',
            })
            this.layoutService.closeSidebar()
            return of(
              DistributionGroupActions.fetch(),
              DistributionGroupActions.resetAttachContent()
            )
          }),
          catchError(err => {
            this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
              status: 'danger',
            })
            return of(err)
          })
        )
    })
  )
}
