import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import {
  S3UploadService,
  ToastModule,
  UsersService,
} from '@ticmas/common-services'
import { ChangeEmailComponent } from './change-email-component/change-email.component'
import { ChangePasswordComponent } from './change-password-component/change-password.component'
import { InstructionsDialogComponent } from './instructions-dialog/instructions-dialog.component'
import { ProfileEffects } from './ngrx/effects'
import { reducers } from './ngrx/reducers'
import { ProfileComponent } from './profile.component'
import { ProfileService } from './profile.service'
import { SafePipe } from './safe.pipe'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbButtonModule,
    NbIconModule,
    StoreModule.forFeature(
      ProfileService.featureName,
      ProfileService.injectionToken
    ),
    EffectsModule.forFeature([ProfileEffects]),
    ToastModule,
  ],
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    InstructionsDialogComponent,
    SafePipe,
  ],
  exports: [
    ProfileComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    InstructionsDialogComponent,
  ],
  providers: [
    ProfileService,
    S3UploadService,
    UsersService,
    { provide: ProfileService.injectionToken, useValue: reducers },
  ],
  entryComponents: [
    ProfileComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    InstructionsDialogComponent,
  ],
})
export class ProfileModule {}
