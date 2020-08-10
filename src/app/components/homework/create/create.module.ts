import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme'
import { DateSelectorModule } from '../../common/date-selector/date-selector.module'
import { GroupSelectorModule } from '../../common/group-selector/group-selector.module'
import { HomeworkUploadFileModule } from '../upload-file/upload-file.module'
import { CreateHomeworkComponent } from './create.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbSpinnerModule,
    NbButtonModule,
    HomeworkUploadFileModule,
    GroupSelectorModule,
    DateSelectorModule,
  ],
  exports: [CreateHomeworkComponent],
  declarations: [CreateHomeworkComponent],
  providers: [],
})
export class CreateHomeworkModule {}
