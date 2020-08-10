import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { NbDialogService } from '@nebular/theme'
import { Observable } from 'rxjs'
import { HomeworkService } from './../../homework.service'
import { InstructionsComponent } from './../instructions/instructions.component'

@Component({
  selector: 'app-homework-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
})
export class HomeworkAssignmentComponent implements OnInit {
  @Input() submissionIndex = 0
  @Output() commentType = new EventEmitter<Event>()
  @Output() updateIndex = new EventEmitter<number>()

  open: boolean = false
  selectedStudentAssignmentId$: Observable<any>
  selectedStudentAssignmentSubmissions$: Observable<any>
  longDescription: boolean = false
  maxParagraphLength: number = 500
  constructor(
    private dialogService: NbDialogService,
    private homeworkService: HomeworkService,
    private router: Router
  ) {}

  ngOnInit() {
    this.homeworkService.selectedStudentAssignmentId$.subscribe(
      id => !id && this.router.navigateByUrl('clases')
    )
    this.selectedStudentAssignmentSubmissions$ = this.homeworkService.selectedStudentAssignmentSubmissions$
  }

  changeIndex(value: number) {
    this.updateIndex.emit(this.submissionIndex + value)
  }

  goToHomeworkInstructions() {
    this.dialogService.open(InstructionsComponent)
  }

  setCommentType(event: Event): void {
    this.commentType.emit(event)
  }
}
