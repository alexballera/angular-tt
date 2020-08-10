import { Injectable } from '@angular/core'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import sortBy from 'lodash/fp/sortBy'
import { combineLatest, Observable } from 'rxjs'
import { map, pluck, tap } from 'rxjs/operators'
import { State } from '../../reducers'
import { PlanificationService } from '../../services/planification.service'

@Injectable({ providedIn: 'root' })
export class HomeworkService {
  constructor(
    private store: Store<State>,
    private planificationService: PlanificationService
  ) {}

  public featureSelector = this.store.pipe(
    select(createFeatureSelector<State['assignmentForm']>('assignmentForm'))
  )

  attachments$: Observable<
    Array<{ url: string; name: string; size: string }>
  > = this.featureSelector.pipe(select('attachments'))

  attachmentLoading$: Observable<boolean> = this.featureSelector.pipe(
    select('attachmentLoading')
  )

  courseAssignments$: Observable<any> = this.store.select(
    'assignments',
    'courseAssignments'
  )

  selectedStudentAssignmentId$: Observable<any> = this.store.select(
    'assignments',
    'selectedStudentAssignmentId'
  )

  studentAssignments$ = combineLatest([
    this.store.select('assignments', 'studentAssignments'),
    this.planificationService.selectedGroup$,
  ]).pipe(
    map(([studentAssignments, selectedGroup]) =>
      studentAssignments.map(assignment => {
        const student = selectedGroup.users.find(
          user => user.sub === assignment.studentId
        )
        const teacher = selectedGroup.owners.find(
          user => user.sub === assignment.teacherId
        )
        return {
          ...assignment,
          student: {
            given_name: student && student.given_name,
            family_name: student && student.family_name,
          },
          teacher: {
            given_name: teacher && teacher.given_name,
            family_name: teacher && teacher.family_name,
          },
        }
      })
    )
  )

  selectedStudentAssignment$ = combineLatest([
    this.selectedStudentAssignmentId$,
    this.studentAssignments$,
  ]).pipe(
    map(([id, studentAssignments]) => {
      const selectedStudentAssignment = studentAssignments.find(
        studentAssignment => studentAssignment.id === id
      )
      return selectedStudentAssignment
    })
  )

  selectedStudentAssignmentSubmissions$ = this.selectedStudentAssignment$.pipe(
    pluck('submissions'),
    map(submissions => {
      return submissions.map(submission => {
        return {
          ...submission,
          comments: sortBy('createdAt', submission.comments),
        }
      })
    })
  )
}
