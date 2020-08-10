import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { UserInfo } from '@ticmas/common-interfaces'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { DistributionGroupActions } from '../../../actions'
import { State } from '../../../reducers'
import { StudentService } from '../../../services/student.service'

@Component({
  selector: 'app-student-addition-subgroup',
  templateUrl: './student-addition-subgroup.component.html',
  styleUrls: ['./student-addition-subgroup.component.scss'],
})
export class StudentAdditionSubgroupComponent implements OnInit {
  @Input() isModalActive
  @Input() selectedGroup
  @Output() selectedStudent = new EventEmitter()
  @Output() openStudentAdditionModal = new EventEmitter()

  isLoading = false
  isSubmitted = false
  students$: Observable<UserInfo[]>
  selectedStudents: UserInfo[] = []
  submittedSuccess$
  submittedFailure$

  constructor(
    private store: Store<State>,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.students$ = this.store.select('distributionGroup').pipe(
      map(groups => {
        const parentGroup = groups.list.find(
          group => group._id === this.selectedGroup.parent
        )
        return parentGroup.users.filter(
          user =>
            !this.selectedGroup.users.some(
              u => u.preferred_username === user.preferred_username
            )
        )
      })
    )

    this.submittedSuccess$ = this.studentService.additionToSubgroupSucceeded$.pipe(
      tap(success => {
        if (success) {
          this.markAsSubmitted()
        }
      })
    )

    this.submittedFailure$ = this.studentService.additionToSubgroupFailed$.pipe(
      tap(error => {
        if (error) {
          this.markAsSubmitted()
        }
      })
    )
  }

  onCheckStudent(user, selected) {
    if (selected) {
      this.selectedStudents.push(user)
    } else {
      this.selectedStudents = this.selectedStudents.filter(u => u !== user)
    }
  }

  markAsSubmitted() {
    this.isLoading = !this.isLoading
    this.isSubmitted = true
  }

  markAsUnsubmitted() {
    this.isLoading = false
    this.isSubmitted = false
  }

  close() {
    this.reset()
    this.openStudentAdditionModal.emit()
  }

  reset() {
    this.markAsUnsubmitted()
    this.selectedStudents = []
    this.store.dispatch(
      DistributionGroupActions.resetSubgroupUsersAdditionForm()
    )
  }

  onSubmit() {
    this.isLoading = !this.isLoading
    this.store.dispatch(
      DistributionGroupActions.addUsersSubgroup(this.selectedStudents)
    )
  }
}
