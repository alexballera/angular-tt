import { Component, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { UsersActions } from '../../../actions'
import { State } from '../../../reducers'
import { StudentService } from '../../../services/student.service'

@Component({
  selector: 'app-student-reset-pass',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
})
export class StudentPassResetComponent implements OnInit {
  constructor(
    private store: Store<State>,
    public student: StudentService,
    protected dialogRef: NbDialogRef<any>
  ) {}

  userSelect$: Observable<any>
  recentUserResetData$: Observable<any>

  ngOnInit() {
    this.userSelect$ = this.store.select('userResetData')
    this.recentUserResetData$ = this.store.select('recentUserResetData')
  }

  resetPass(u) {
    this.store.dispatch(UsersActions.resetPassword(u))
  }

  closeDialog() {
    this.store.dispatch(UsersActions.resetPasswordSuccess(null))
    this.dialogRef.close()
  }
}
