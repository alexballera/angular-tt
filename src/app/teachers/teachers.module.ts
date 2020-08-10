import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbStepperModule,
} from '@nebular/theme'
import { S3UploadService } from '@ticmas/common-services'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { RegistrationComponent } from './registration/registration.component'
import { TeachersRoutingModule } from './teachers-routing.module'
import { UploadFileComponent } from './upload-file/upload-file.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersRoutingModule,
    NbStepperModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbAlertModule,
    NbSpinnerModule,
    AutoCompleteModule,
  ],
  exports: [],
  declarations: [RegistrationComponent, UploadFileComponent],
  providers: [S3UploadService],
})
export class TeachersModule {}
