import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
} from '@nebular/theme'
import { TagInputModule } from 'ngx-chips'
import { OnboardingModule } from '../onboarding/onboarding.module'
import { ContentPreviewComponent } from './content-preview.component'
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
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    TagInputModule,
    NbIconModule,
    NbCardModule,
    NbListModule,
    NbInputModule,
    NbButtonModule,
    NbPopoverModule,
    OnboardingModule,
  ],
  exports: [ContentPreviewComponent],
  declarations: [ContentPreviewComponent, SafePipe],
  providers: [],
})
export class ContentPreviewModule {}
