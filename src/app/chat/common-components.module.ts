import { NgModule } from '@angular/core'
import {
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme'

@NgModule({
  imports: [
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbTabsetModule,
    NbListModule,
    NbUserModule,
    NbChatModule,
    NbLayoutModule,
    NbSpinnerModule,
  ],
  exports: [
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbTabsetModule,
    NbListModule,
    NbUserModule,
    NbChatModule,
    NbLayoutModule,
    NbSpinnerModule,
  ],
})
export class CommonComponentsModule {}
