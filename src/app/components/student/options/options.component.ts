import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core'
import { NbDialogService } from '@nebular/theme'
import { Store } from '@ngrx/store'
import { DistributionGroup, UserInfo } from '@ticmas/common-interfaces'
import { ToastService } from '@ticmas/common-services'
import uniqBy from 'lodash/fp/uniqBy'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { DistributionGroupActions, UsersActions } from '../../../actions'
import { DistributionGroupInContext } from '../../../models'
import { State } from '../../../reducers'
import { DistributionGroupService } from '../../../services/distribution-group.service'
import { StudentPassResetComponent } from '../pass-reset/pass-reset.component'

@Component({
  selector: 'app-student-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class StudentOptionsComponent implements OnInit {
  @Input() isInAgroup: boolean
  @Input() student: UserInfo
  @Input() distributionGroup: DistributionGroupInContext
  @Output() optionSelect = new EventEmitter<void>()

  displayGroupList = false
  subGroups$: Observable<DistributionGroup[]>
  filterGroups = []

  constructor(
    private store: Store<State>,
    private toast: ToastService,
    private dialogService: NbDialogService,
    private distributionGroupService: DistributionGroupService
  ) {}

  ngOnInit() {
    this.subGroups$ = this.distributionGroupService.subGroups$.pipe(
      tap(groups => {
        this.filterGroups = []
        groups.map(grp => {
          const userIsThere = grp.users.find(
            usr => usr.sub === this.student.sub
          )
          if (!userIsThere) {
            this.filterGroups.push(grp)
          }
        })
      })
    )
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog)
  }

  displayGroups() {
    this.displayGroupList = !this.displayGroupList
  }

  removeStudent() {
    this.store.dispatch(
      DistributionGroupActions.removeStudentGoups({
        distributionGroup: this.distributionGroup._id,
        student: this.student.preferred_username,
      })
    )
    this.optionSelect.emit()
    this.toast.showToast(
      `Se ha eliminado al estudiante del grupo correctamente`,
      null,
      {
        status: 'success',
      }
    )
  }

  resetStudentPassword() {
    this.store.dispatch(UsersActions.userResetPassword(this.student))
    this.dialogService.open(StudentPassResetComponent)
  }

  addToSubGroup(subGroup: DistributionGroup) {
    const found = subGroup.users.find(
      user => user.preferred_username === this.student.preferred_username
    )
    if (found) {
      this.toast.showToast(
        `${this.student.given_name} ${this.student.family_name}`,
        `ya pertenece al grupo ${subGroup.name}`,
        {
          status: 'danger',
        }
      )
      return
    }
    const users = subGroup.users.concat(this.student)
    this.store.dispatch(
      DistributionGroupActions.addUsersSubgroup({
        groupId: subGroup._id,
        users: uniqBy('sub', users),
      })
    )
    this.toast.showToast(
      `Se ha añadido al estudiante al grupo ${subGroup.name} correctamente`,
      null,
      {
        status: 'success',
      }
    )
  }
}
