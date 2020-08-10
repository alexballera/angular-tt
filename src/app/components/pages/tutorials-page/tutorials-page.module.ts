import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TutorialsModule } from '../../tutorials/tutorials.module'
import { TutorialsPageRoutingModule } from './tutorials-page-routing.module'
import { TutorialsPageComponent } from './tutorials-page.component'

@NgModule({
  imports: [CommonModule, TutorialsPageRoutingModule, TutorialsModule],
  exports: [],
  declarations: [TutorialsPageComponent],
  providers: [],
})
export class TutorialsPageModule {}
