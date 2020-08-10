import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LayoutService } from '../../layout/layout.service'
import { ProfileService } from '../profile.service'
import { passwordValidator } from './validators'
@Component({
  selector: 'change-password-form',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  passwordForm: FormGroup
  passwordType: string = 'password'
  confirmPassType: string = 'password'

  constructor(
    private formBuilder: FormBuilder,
    private layoutService: LayoutService,
    private profileService: ProfileService
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validator: passwordValidator(),
      }
    )
  }

  get password() {
    return this.passwordForm.get('password')
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword')
  }

  get formControls() {
    return this.passwordForm.controls
  }

  toggleShowPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
  }

  toggleShowConfirmPass() {
    this.confirmPassType =
      this.confirmPassType === 'password' ? 'text' : 'password'
  }

  onSubmit() {
    this.passwordForm.markAllAsTouched()

    const {
      passwordInvalid,
      passwordMatchError,
    } = this.formControls.password.errors
    if (passwordInvalid || passwordMatchError) {
      return
    }
    this.profileService.changePassword(this.passwordForm.value.password)
  }

  closeSidebar() {
    this.layoutService.closeSidebar()
  }
}
