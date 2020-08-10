import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '@ticmas/auth-service'
import { LayoutService } from '../../layout/layout.service'
import { ProfileService } from '../profile.service'
@Component({
  selector: 'change-email-form',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent {
  emailForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private layoutService: LayoutService,
    public auth: AuthService,
    private profileService: ProfileService
  ) {
    this.emailForm = this.formBuilder.group({
      email: [null, Validators.email],
    })
  }

  get formControls() {
    return this.emailForm.controls
  }

  onSubmit() {
    this.profileService.changeEmail(this.emailForm.value.email)
    this.closeSidebar()
  }

  closeSidebar() {
    this.layoutService.closeSidebar()
  }
}
