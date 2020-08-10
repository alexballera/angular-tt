import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NbDialogService } from '@nebular/theme'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { AssignmentActions, SubmissionsActions } from 'src/app/actions'
import { HomeworkService } from '../../homework.service'
import { ConfirmCommentComponent } from './confirm-comment/comment-comfirm.component'
@Component({
  selector: 'app-homework-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class HomeworkCommentsComponent implements OnInit, OnDestroy {
  @Input() commentType: string
  @Input() submissionIndex = 0
  @Input() showPlaceholder: boolean = false
  @Output() onPlaceholderChange = new EventEmitter<boolean>()
  @Output() commentTypeChange = new EventEmitter<string>()

  form: FormGroup
  studentAssignment$: Observable<any>
  studentSubmissions$: Observable<any>
  selectedSubmissionUserInfo = []
  subscriptions$: Subscription
  msgErr: string
  scores = [
    'Prefiero no calificar',
    10,
    9.5,
    9,
    8.5,
    8,
    7.5,
    7,
    6.5,
    6,
    5.5,
    5,
    4.5,
    4,
    3.5,
    3,
    2.5,
    2,
    1.5,
    1,
  ]

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private dialogService: NbDialogService,
    private homeworkService: HomeworkService
  ) {
    this.form = this.fb.group({
      commentText: [''],
      score: [''],
    })
  }

  ngOnInit() {
    this.store.dispatch(AssignmentActions.getAssignmentSubmissions())
    this.studentSubmissions$ = this.homeworkService.selectedStudentAssignmentSubmissions$
    this.studentAssignment$ = this.homeworkService.selectedStudentAssignment$
    this.subscriptions$ = this.studentAssignment$.subscribe(
      studentAssignment => {
        this.selectedSubmissionUserInfo = [
          { id: studentAssignment.studentId, ...studentAssignment.student },
          { id: studentAssignment.teacherId, ...studentAssignment.teacher },
        ]
      }
    )
  }

  setTypeAndPlaceholder(commentType: string, showPlaceholder = true) {
    this.commentTypeChange.emit(commentType)
    this.onPlaceholderChange.emit(showPlaceholder)
  }

  openConfirmModal(type: string, score?: string) {
    const text = this.form.get('commentText').value
    if (this.form.get('commentText').value) {
      this.msgErr = ''
      this.dialogService
        .open(ConfirmCommentComponent, {
          context: { type, text, score },
        })
        .onClose.subscribe(data => {
          if (data) {
            this.store.dispatch(
              SubmissionsActions.addComment({
                index: this.submissionIndex,
                data: text,
                submissionState:
                  type === 'correction'
                    ? 'rejected'
                    : type === 'approval'
                    ? 'approved'
                    : null,
                score,
              })
            )
            this.form.controls.commentText.setValue('')
            this.form.controls.score.setValue('')
          }
        })
    } else {
      this.msgErr = 'Este campo es obligatorio'
    }
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe()
  }
}
