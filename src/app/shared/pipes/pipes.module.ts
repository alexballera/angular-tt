import { NgModule } from '@angular/core'
import { FilterGroupPipe } from './filter-group.pipe'
import { FullNamePipe } from './full-name.pipe'
import { FilterNamePipe } from './name.pipe'

@NgModule({
  declarations: [FullNamePipe, FilterGroupPipe, FilterNamePipe],
  exports: [FullNamePipe, FilterGroupPipe, FilterNamePipe],
})
export class PipesModule {}
