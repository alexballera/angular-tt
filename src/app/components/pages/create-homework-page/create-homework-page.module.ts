import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CreateHomeworkModule } from '../../homework/create/create.module'
import { CreateHomeworkPagePageRoutingModule } from './create-homework-page-routing.module'
import { CreateHomeworkPageComponent } from './create-homework-page.component'

@NgModule({
  imports: [
    CommonModule,
    CreateHomeworkPagePageRoutingModule,
    CreateHomeworkModule,
  ],
  exports: [],
  declarations: [CreateHomeworkPageComponent],
  providers: [],
})
export class CreateHomeWorkPageModule {}
