import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { ContentDetailComponent } from './detail/detail.component'
import { ContentListItemComponent } from './detail/item/item.component'

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ContentListItemComponent, ContentDetailComponent],
  exports: [ContentDetailComponent, ContentListItemComponent],
})
export class ContentModule {}
