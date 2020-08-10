import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { DistributionGroupActions } from '../../../actions'
import { LoadingActions } from '../../../actions/loading'
import { State } from '../../../reducers'
import { PlanificationService } from '../../../services/planification.service'
import { LayoutService } from '../../layout/layout.module'

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
  form: FormGroup
  selected
  indexSelect = []

  constructor(
    private fb: FormBuilder,
    public sidebar: LayoutService,
    public planification: PlanificationService,
    private store: Store<State>
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      users: [[]],
      description: [''],
    })
  }

  get name() {
    return this.form.get('name')
  }

  get description() {
    return this.form.get('description')
  }

  get users() {
    return this.form.get('users')
  }

  userSelect(u) {
    this.indexSelect.push(u.sub)
    this.store.dispatch(DistributionGroupActions.addUserForm(u))
  }

  removeUser(u) {
    const i = this.indexSelect.indexOf(u.sub)
    this.indexSelect.splice(i, 1)
    this.store.dispatch(DistributionGroupActions.removeUserForm(u))
  }

  changeGroup() {
    this.indexSelect = []
    this.form.reset()
    this.store.dispatch(DistributionGroupActions.removeUsersForm())
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.planification.usersForm$.subscribe(usrs => {
      this.users.setValue(usrs)
    })
    this.store.dispatch(LoadingActions.loadingSite(true))
    this.store.dispatch(
      DistributionGroupActions.createSubgroup(this.form.value)
    )
    this.closeSidebar()
  }

  closeSidebar() {
    this.form.reset()
    this.sidebar.closeSidebar()
  }
}
