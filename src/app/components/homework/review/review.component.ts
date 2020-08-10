import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { FullNamePipe } from 'src/app/shared/pipes/full-name.pipe'
import { AssignmentActions } from '../../../actions'
import { HomeworkService } from '../homework.service'

@Component({
  selector: 'app-homework-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class HomeworkReviewComponent implements OnInit {
  studentList$: Observable<Array<{ text: string; key: string | number }>>
  selectedStudentAssignmentId$: Observable<number>

  commentType = 'sendComment'
  showPlaceholder: boolean = true
  submissionIndex = 0

  selectedStudentAssignmentSubmissions$: Observable<any>

  constructor(
    private homeworkService: HomeworkService,
    private store: Store<any>,
    private router: Router,
    private fullNamePipe: FullNamePipe
  ) {}

  ngOnInit() {
    this.studentList$ = this.homeworkService.studentAssignments$.pipe(
      map(assignments =>
        assignments
          .filter(assignment => assignment.submissions.length)
          .map(assignment => {
            return {
              text: this.fullNamePipe.transform(assignment.student),
              key: assignment.id,
            }
          })
      )
    )

    this.selectedStudentAssignmentSubmissions$ = this.homeworkService.selectedStudentAssignmentSubmissions$

    this.selectedStudentAssignmentId$ = this.homeworkService.selectedStudentAssignmentId$

    this.selectedStudentAssignmentSubmissions$
      .subscribe(submissions => {
        this.submissionIndex = submissions.length - 1
      })
      .unsubscribe()
  }

  setCommentType(value: string) {
    this.commentType = value
  }

  setPlaceholderStatus(value: boolean) {
    this.showPlaceholder = value
  }

  sendCommentType(commentType: string) {
    this.setCommentType(commentType)
    this.setPlaceholderStatus(false)
  }

  onStudentChange(studentAssignmentId: number) {
    this.store.dispatch(
      AssignmentActions.saveStudentAssignmentId(studentAssignmentId)
    )
    this.selectedStudentAssignmentSubmissions$
      .subscribe(submissions => {
        this.submissionIndex = submissions.length - 1
      })
      .unsubscribe()
    this.router.navigateByUrl(`/tareas/${studentAssignmentId}`)
  }

  setSubmissionIndex(index: number) {
    this.submissionIndex = index
  }
}
