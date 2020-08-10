import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { FormGroupState, SetUserDefinedPropertyAction } from 'ngrx-forms'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { DistributionGroupActions } from '../../../../actions'
import { State } from '../../../../reducers'
import {
  InitialStudentAdditionFormValue,
  StudentAdditionFormValue,
} from '../../../../reducers/studentAddtionForm'
import { StudentAdditionService } from '../../../../services/student-addition.service'

@Component({
  selector: 'app-student-addition-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StudentAdditionStepOneComponent implements OnInit {
  @Input() isLoading
  @Output() next = new EventEmitter()
  @Output() markAsLoading = new EventEmitter()

  timeout = null
  formState$: Observable<FormGroupState<StudentAdditionFormValue>>
  formStateErrors$
  restrictPassword$: Observable<any>

  constructor(
    private store: Store<State>,
    private studentAdditionService: StudentAdditionService
  ) {}

  ngOnInit() {
    this.formState$ = this.studentAdditionService.formState$
    this.formStateErrors$ = this.studentAdditionService.formStateErrors$
    this.restrictPassword$ = this.formState$.pipe(
      filter(
        form =>
          !form.controls.password.userDefinedProperties.show ||
          form.controls.preferred_username.userDefinedProperties.registered
      )
    )
  }

  onKey(event) {
    if (event.code === 'Enter') {
      return
    }
    this.store.dispatch(
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.controls.preferred_username.id,
        'success',
        false
      )
    )
    clearTimeout(this.timeout)
    this.timeout = setTimeout(
      () => this.store.dispatch(DistributionGroupActions.update()),
      1000
    )
  }

  onSubmit() {
    this.markAsLoading.emit()
    this.studentAdditionService.associateStudent()
  }
}
