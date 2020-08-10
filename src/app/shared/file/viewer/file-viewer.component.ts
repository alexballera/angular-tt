import { Component, Input } from '@angular/core'
import { SwiperConfigInterface } from 'ngx-swiper-wrapper'

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent {
  @Input() files: any

  public swiperConfig: SwiperConfigInterface = {
    navigation: true,
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true,
    zoom: true,
    height: 400,
  }
}
