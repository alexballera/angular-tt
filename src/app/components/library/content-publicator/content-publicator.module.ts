import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NbDatepickerModule, NbSpinnerModule } from '@nebular/theme'
import { TagInputModule } from 'ngx-chips'
import { SharedModule } from '../../../shared.module'
import { CommonComponentsModule } from '../../common/common-components.module'
import { AttachContentComponent } from '../attach-content/attach-content.component'
import { LibraryComponent } from '../library.component'
import { ContentUploadFileComponent } from '../upload-file/upload-file.component'
import { ContentPublicatorComponent } from './content-publicator.component'
import { SafePipe } from './safe.pipe'

TagInputModule.withDefaults({
  tagInput: {
    modelAsStrings: true,
    placeholder: '+ Tag',
  },
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    TagInputModule,
    SharedModule,
    CommonComponentsModule,
    NbDatepickerModule.forRoot(),
    NbSpinnerModule,
  ],
  exports: [
    ContentPublicatorComponent,
    AttachContentComponent,
    ContentUploadFileComponent,
  ],
  declarations: [
    ContentPublicatorComponent,
    SafePipe,
    AttachContentComponent,
    ContentUploadFileComponent,
  ],
  entryComponents: [ContentPublicatorComponent, LibraryComponent],
  providers: [],
})
export class ContentPublicatorModule {}
