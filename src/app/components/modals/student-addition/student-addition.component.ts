import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControlState } from 'ngrx-forms'
import { Observable } from 'rxjs'
import { StudentAdditionService } from '../../../services/student-addition.service'

@Component({
  selector: 'app-student-addition',
  templateUrl: './student-addition.component.html',
  styleUrls: ['./student-addition.component.scss'],
})
export class StudentAdditionComponent implements OnInit {
  @Input() isModalActive
  @Input() ngrxFormControlState: FormControlState<string>
  @Output() openStudentAdditionModal = new EventEmitter()

  step = 1
  isLoading = false
  formState$
  studentExistsInCourse$: Observable<any>
  userNotFound$: Observable<any>
  userWasFound$: Observable<any>

  constructor(private studentAdditionService: StudentAdditionService) {}

  ngOnInit() {
    this.formState$ = this.studentAdditionService.formState$
  }

  next() {
    this.step = ++this.step
  }

  prev() {
    this.step = --this.step
  }

  close() {
    this.reset()
    this.openStudentAdditionModal.emit()
  }

  reset() {
    this.step = 1
    this.isLoading = false
    this.studentAdditionService.resetForm()
  }

  markAsLoading() {
    this.isLoading = !this.isLoading
  }
}
