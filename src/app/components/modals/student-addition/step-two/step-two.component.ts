import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { StudentAdditionService } from '../../../../services/student-addition.service'

@Component({
  selector: 'app-student-addition-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StudentAdditionStepTwoComponent implements OnInit {
  @Output() prev = new EventEmitter()
  @Output() next = new EventEmitter()

  formState$
  formStateErrors$

  constructor(private studentAdditionService: StudentAdditionService) {}

  ngOnInit(): void {
    this.formState$ = this.studentAdditionService.formState$
    this.formStateErrors$ = this.studentAdditionService.formStateErrors$
  }
}
