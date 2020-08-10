import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbButtonModule, NbIconModule } from '@nebular/theme'
import { SwiperModule } from 'ngx-swiper-wrapper'
import { SafeUrlPipe } from './safe-url.pipe'
import { FileViewerComponent } from './viewer/file-viewer.component'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule,
    SwiperModule,
  ],
  declarations: [FileViewerComponent, SafeUrlPipe],
  exports: [FileViewerComponent],
})
export class FileModule {}
