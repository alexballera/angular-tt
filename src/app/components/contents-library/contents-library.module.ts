import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ControllersServicesModule } from '@ticmas/common-services'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { SwiperModule } from 'ngx-swiper-wrapper'
import { SharedModule } from '../../shared.module'
import { ContentComponent } from './content/content.component'
import { ContentsLibraryComponent } from './contents-library.component'
import { ContentsSlidersComponent } from './contents-sliders/contents-sliders.component'
import { FilterTitle } from './filter.pipe'
import { TagsSelectComponent } from './tags-select/tags-select.component'

@NgModule({
  imports: [
    LazyLoadImageModule,
    SwiperModule,
    CommonModule,
    FormsModule,
    ControllersServicesModule,
    SharedModule,
  ],
  declarations: [
    ContentsLibraryComponent,
    ContentComponent,
    TagsSelectComponent,
    FilterTitle,
    ContentsSlidersComponent,
  ],
  exports: [ContentsLibraryComponent],
})
export class ContentsLibraryModule {}

export { SearchForm as ContentsLibrarySearchParams } from './contents-library.component'
