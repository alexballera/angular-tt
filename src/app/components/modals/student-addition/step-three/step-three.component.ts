import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { StudentAdditionService } from '../../../../services/student-addition.service'

@Component({
  selector: 'app-student-addition-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StudentAdditionStepThreeComponent implements OnInit {
  @Input() isLoading
  @Output() prev = new EventEmitter()
  @Output() markAsLoading = new EventEmitter()

  formState$
  formStateErrors$

  constructor(private studentAdditionService: StudentAdditionService) {}

  ngOnInit(): void {
    this.formState$ = this.studentAdditionService.formState$
    this.formStateErrors$ = this.studentAdditionService.formStateErrors$
  }

  onSubmit() {
    this.markAsLoading.emit()
    this.studentAdditionService.addNewStudent()
  }
}
