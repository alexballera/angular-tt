import { Inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
  AssignmentsService,
  S3UploadService,
  ToastService,
} from '@ticmas/common-services'
import { of } from 'rxjs'
import {
  catchError,
  concatMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import { HomeworkService } from '../components/homework/homework.service'
import { AssignmentFormActions } from './../actions/assignmentForm'
import { PlanificationService } from './../services/planification.service'

@Injectable()
export class AssignmentFormEffects {
  constructor(
    private actions$: Actions,
    private assigment: AssignmentsService,
    private toast: ToastService,
    private planificationService: PlanificationService,
    private router: Router,
    private s3: S3UploadService,
    @Inject('ENV') private environment,
    private homeworkService: HomeworkService
  ) {}

  @Effect()
  uploadS3$ = this.actions$.pipe(
    ofType(AssignmentFormActions.UPLOAD_ATTACHMENT),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.planificationService.selectedGroup$))
    ),
    switchMap<any, any>(([{ payload }, group]) => {
      const timestamp = new Date().getTime()
      const dir = `${this.environment.s3.homework.base}/${group._id}/${timestamp}.${payload.name}`
      return this.s3
        .upload(payload.file, this.environment.s3.homework.bucket, dir)
        .pipe(
          switchMap((res: any) => {
            return of(
              AssignmentFormActions.uploadAttachmentSuccess({
                url: 'https://' + res.Bucket + '/' + res.key,
                name: payload.name,
                size: payload.size,
              })
            )
          }),
          catchError(err => {
            this.toast.showToast(
              'Algo salió mal con la subida del archivo, intenta nuevamente',
              null,
              {
                status: 'danger',
              }
            )
            return of()
          })
        )
    })
  )

  @Effect()
  saveAssignment$ = this.actions$.pipe(
    ofType(AssignmentFormActions.SAVE_ASSIGNMENT),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.homeworkService.attachments$))
    ),
    switchMap<any, any>(([{ payload }, attachments]) =>
      this.assigment
        .createAssignment({
          title: payload.title,
          content: payload.content,
          attachments: attachments.map(attachment => ({ url: attachment.url })),
        })
        .pipe(
          switchMap(res =>
            of(
              AssignmentFormActions.saveAssignmentSuccess({
                ...res,
                dueAt: payload.dueAt,
              })
            )
          ),
          catchError(() => {
            this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
              status: 'danger',
            })
            return of(AssignmentFormActions.saveAssignmentFailure())
          })
        )
    )
  )

  @Effect()
  saveCourseAssignment$ = this.actions$.pipe(
    ofType(AssignmentFormActions.SAVE_ASSIGNMENT_SUCCESS),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.planificationService.selectedGroup$))
    ),
    switchMap<any, any>(([{ payload }, { users, course }]) => {
      const courseAssignment = {
        assignmentId: payload.id,
        studentIds: users.map(u => u.sub),
        dueAt: payload.dueAt,
      }
      return this.assigment
        .createCourseAssignments(course._id, courseAssignment)
        .pipe(
          switchMap(res => {
            this.toast.showToast('La tarea se ha creado correctamente', null, {
              status: 'success',
            })
            return of(AssignmentFormActions.saveCourseAssignmentSuccess(res))
          }),
          catchError(() => {
            this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
              status: 'danger',
            })
            return of(AssignmentFormActions.saveCourseAssignmentFailure())
          })
        )
    })
  )

  @Effect({
    dispatch: false,
  })
  redirectToAssignmentList$ = this.actions$.pipe(
    ofType(AssignmentFormActions.SAVE_COURSE_ASSIGNMENT_SUCCESS),
    tap(() => this.router.navigate(['clases']))
  )
}
