import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbPopoverModule,
} from '@nebular/theme'
import { AppSelectorComponent } from './app-selector.component'
import { InfoDialogComponent } from './info-dialog/info-dialog.component'

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbPopoverModule,
    NbListModule,
  ],
  exports: [AppSelectorComponent],
  declarations: [AppSelectorComponent, InfoDialogComponent],
  providers: [],
  entryComponents: [InfoDialogComponent],
})
export class AppSelectorModule {}
