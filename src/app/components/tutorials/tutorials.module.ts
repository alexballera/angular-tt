import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { TutorialsComponent } from './tutorials.component';

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    NbIconModule
  ],
  exports: [TutorialsComponent],
  declarations: [TutorialsComponent],
  providers: [],
})
export class TutorialsModule { }
