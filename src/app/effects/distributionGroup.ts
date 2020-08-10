import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { CdmsService, ToastService } from '@ticmas/common-services'
import { of } from 'rxjs'
import {
  catchError,
  concatMap,
  map,
  mergeAll,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  DistributionGroupActions,
  StudentAdditionFormActions,
  UsersActions,
} from '../actions'
import { LoadingActions } from '../actions/loading'
import { State } from '../reducers'
import { AuthService } from '../services/auth.service'
import { ContentsService } from '../services/contents.service'
import { ContextService } from '../services/context.service'
import { DistributionGroupService } from '../services/distribution-group.service'
import { PlanificationService } from '../services/planification.service'
import { S3UploadService } from '../services/s3-upload.service'

@Injectable()
export class GroupPlanificationEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private cdms: CdmsService,
    private store: Store<State>,
    private context: ContextService,
    private planification: PlanificationService,
    private toastr: ToastService,
    private s3: S3UploadService,
    private toast: ToastService,
    private distributionG: DistributionGroupService,
    private contentService: ContentsService
  ) {}

  @Effect()
  fetch$ = this.actions$.pipe(
    ofType(DistributionGroupActions.FETCH, DistributionGroupActions.UPDATE),
    switchMap<any, any>(({ payload: courseId }) =>
      this.cdms.getDistributionGroups().pipe(
        withLatestFrom(this.auth.userInfo$),
        map(([groups, authUser]) =>
          this.context.getAuthUserOwnedCourses(groups, authUser)
        ),
        switchMap(groups =>
          of(
            DistributionGroupActions.fetchSuccess(groups),
            StudentAdditionFormActions.checkUser()
          )
        ),
        catchError(() =>
          of(DistributionGroupActions.fetchFailure({ courseId }))
        )
      )
    ),
    shareReplay()
  )

  @Effect()
  create$ = this.actions$.pipe(
    ofType<any>(DistributionGroupActions.CREATE_MANY),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.context.school$, this.auth.userInfo$))
    ),
    map(
      ([
        { payload },
        selection,
        { preferred_username, sub, given_name, family_name },
      ]) => {
        return [
          {
            users: [],
            owners: [
              {
                sub,
                given_name,
                family_name,
                preferred_username,
                picture: '',
              },
            ],
            name: payload.data.name,
            category: payload.data.subject,
            course: payload.group._id,
            context: 'ALGO',
            themes: [],
            contents: [],
            level: payload.data.level,
            color: 'ALGO',
          },
        ]
      }
    ),
    switchMap(groups =>
      groups.map(g =>
        this.cdms.createDistributionGroup(g).pipe(
          switchMap(result => {
            this.toast.showToast(
              'Se ha creado la clase de manera exitosa',
              null,
              {
                status: 'success',
              }
            )
            return of(
              LoadingActions.loadingSite(false),
              DistributionGroupActions.fetch()
            )
          }),

          catchError(() => of(DistributionGroupActions.createFailure(null)))
        )
      )
    ),
    mergeAll()
  )

  @Effect()
  update$ = this.actions$.pipe(
    ofType<any>(DistributionGroupActions.UPDATE_GROUP),
    switchMap(({ payload }) =>
      this.cdms.updateDistributionGroup(payload.id, payload.course).pipe(
        switchMap(() => of(DistributionGroupActions.fetch())),
        catchError(() =>
          of(
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            })
          )
        )
      )
    )
  )

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<any>(DistributionGroupActions.DELETE_DISTRIBUTION_GROUP),
    switchMap(({ payload }) =>
      this.cdms.deleteDistributionGroup(payload).pipe(
        switchMap(() =>
          of(
            LoadingActions.loadingSite(false),
            DistributionGroupActions.deleteDistributionGroupSuccess(payload),
            this.toast.showToast(
              'Se ha eliminado el curso de manera exitosa',
              null,
              { status: 'success' }
            )
          )
        ),
        catchError(() =>
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
  deleteByCourse$ = this.actions$.pipe(
    ofType<any>(DistributionGroupActions.DELETE_DISTRIBUTION_GROUP_BY_COURSE),
    switchMap(({ payload }) =>
      this.cdms.deleteDistributionGroupByCourse(payload).pipe(
        switchMap(() =>
          of(
            LoadingActions.loadingSite(false),
            DistributionGroupActions.deleteDistributionGroupByCourseSuccess(
              payload
            ),
            this.toast.showToast(
              'Se ha eliminado el curso de manera exitosa',
              null,
              { status: 'success' }
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
  empty = this.actions$.pipe(
    ofType(DistributionGroupActions.EMPTY_DISTRIBUTION_GROUP),
    switchMap<any, any>(({ payload }) =>
      this.cdms.resetDistributionGroup(payload).pipe(
        switchMap(() =>
          of(
            LoadingActions.loadingSite(false),
            DistributionGroupActions.emptyThemesDistributionGroup(payload),
            DistributionGroupActions.emptyContentsDistributionGroup(payload),
            this.toast.showToast(
              'Se ha limpiado la planificación para este curso',
              null,
              { status: 'success' }
            )
          )
        ),
        catchError(() =>
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
  createSubgroup$ = this.actions$.pipe(
    ofType<any>(DistributionGroupActions.CREATE_SUBGROUP),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(this.planification.selectedGroup$, this.auth.userInfo$)
      )
    ),
    map(
      ([
        { payload },
        selection,
        { preferred_username, sub, given_name, family_name },
      ]) => {
        return {
          users: payload.users,
          owners: [
            {
              sub,
              given_name,
              family_name,
              preferred_username,
              picture: '',
            },
          ],
          name: payload.name,
          description: '',
          parent: selection._id,
          category: selection.category,
          course: selection.course._id,
          context: 'ALGO',
          lrs: [
            {
              password: '6cc2417f9c383e1bdf15c8e5c79d893488784ab4',
              userName: 'fb0b06c7b1956e520f7c644c04a674de8d311a4f',
              endPoint:
                'https://learninglocker.integration.ticmas.vi-datec.com/data/xAPI',
            },
          ],
          themes: [],
          contents: [],
          level: selection.level,
        }
      }
    ),
    switchMap(group =>
      this.cdms.createDistributionGroup(group).pipe(
        switchMap(created => {
          this.toast.showToast('Subgrupo creado correctamente', null, {
            status: 'success',
          })
          return of(
            LoadingActions.loadingSite(false),
            DistributionGroupActions.createSuccess(created)
          )
        }),
        catchError(() =>
          of(
            LoadingActions.loadingSite(false),
            DistributionGroupActions.createFailure(null),
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            })
          )
        )
      )
    )
  )

  @Effect()
  addUsersToDistributionGroup$ = this.actions$.pipe(
    ofType(DistributionGroupActions.ADD_USERS_SUBGROUP),
    switchMap<any, any>(({ payload }) => {
      return this.cdms
        .addUserToDistributionGroup(payload.groupId, payload.users)
        .pipe(
          switchMap(() => {
            return of(
              DistributionGroupActions.addUsersSubgroupSuccess(payload),
              DistributionGroupActions.fetch()
            )
          }),
          catchError(() => {
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            })
            return of(
              DistributionGroupActions.addUsersSubgroupFailure(payload.users)
            )
          })
        )
    })
  )

  @Effect({ dispatch: false })
  studentsAddition$ = this.actions$.pipe(
    ofType(
      DistributionGroupActions.ADD_USERS_SUBGROUP_SUCCESS,
      DistributionGroupActions.ADD_USERS_SUBGROUP_FAILURE,
      DistributionGroupActions.RESET_SUBGROUP_USERS_ADDITION_FORM
    ),
    switchMap<any, any>(action => {
      return of({
        succeeded:
          action.type === DistributionGroupActions.ADD_USERS_SUBGROUP_SUCCESS,
        failed:
          action.type === DistributionGroupActions.ADD_USERS_SUBGROUP_FAILURE,
      })
    })
  )

  @Effect()
  removeStudent$ = this.actions$.pipe(
    ofType<any>(DistributionGroupActions.REMOVE_STUDENT_GROUPS),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.planification.distributionGroups$))
    ),
    map(([{ payload }, groups]) => {
      const listGroups = groups.filter(
        u =>
          u.parent === payload.distributionGroup ||
          u._id === payload.distributionGroup
      )
      const data = []
      listGroups.map(list => {
        data.push({
          userId: payload.student,
          groupId: list._id,
          courseId: list.course._id,
        })
      })
      return data
    }),
    switchMap(data =>
      data.map(d =>
        this.cdms.removeUserFromDistributionGroup(d.groupId, d.userId).pipe(
          switchMap(() =>
            of(UsersActions.deleteSuccess(d), DistributionGroupActions.fetch())
          ),
          catchError(err => of(UsersActions.deleteFailure(err)))
        )
      )
    ),
    mergeAll()
  )

  @Effect()
  addAttach = this.actions$.pipe(
    ofType<any>(DistributionGroupActions.ADD_ATTACH_CONTENT),
    withLatestFrom(this.distributionG.attachFiles$),
    switchMap<any, any>(([{ payload }, files]) => {
      const data = {
        ...payload,
        cover_url: files.cover,
        url: files.file ? files.file : payload.url,
      }
      return of(DistributionGroupActions.addAttachContentSuccess(data))
    })
  )

  @Effect()
  uploadCoverS3$ = this.actions$.pipe(
    ofType(DistributionGroupActions.UPLOAD_COVER_ATTACH_CONTENT),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(
          this.planification.selectedGroup$,
          this.contentService.resource$
        )
      )
    ),
    switchMap<any, any>(([{ payload }, group, resource]) => {
      const resourceId = group._id + '-' + resource._id
      return this.s3.uploadFile(resourceId, payload.file).pipe(
        switchMap(res => {
          return of(
            DistributionGroupActions.uploadCoverAttachContentSuccess(
              'https://' + res.Bucket + '/' + res.Key
            )
          )
        }),
        catchError(err => of())
      )
    })
  )

  @Effect()
  uploadS3$ = this.actions$.pipe(
    ofType(DistributionGroupActions.UPLOAD_FILE_ATTACH_CONTENT),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(
          this.planification.selectedGroup$,
          this.contentService.resource$
        )
      )
    ),
    switchMap<any, any>(([{ payload }, group, resource]) => {
      const resourceId = group._id + '-' + resource._id
      return this.s3.uploadFile(resourceId, payload.file).pipe(
        switchMap(res => {
          this.toast.showToast('Se ha subido el archivo correctamente', null, {
            status: 'success',
          })
          return of(
            DistributionGroupActions.uploadFileAttachContentSuccess(
              'https://' + res.Bucket + '/' + res.Key
            )
          )
        }),
        catchError(err => of())
      )
    })
  )
}
