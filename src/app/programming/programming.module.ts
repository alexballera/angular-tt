import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbPopoverModule,
} from '@nebular/theme'
import { SafeIframeModule } from '../shared/safe-iframe/safe-iframe.module'
import { CompilerComponent } from './compiler/compiler.component'
import { ForumComponent } from './forum/forum.component'
import { ProgrammingRoutingModule } from './programming-routing.module'

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbPopoverModule,
    ProgrammingRoutingModule,
    SafeIframeModule,
  ],
  declarations: [ForumComponent, CompilerComponent],
  entryComponents: [],
  providers: [],
})
export class ProgrammingModule {}
