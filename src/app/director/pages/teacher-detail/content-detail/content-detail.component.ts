import { Component, Input } from '@angular/core'
import { LayoutService } from '../../../../components/layout/layout.module'

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss'],
})
export class ContentDetailComponent {
  @Input() url: string
  @Input() youtubeUrl: boolean

  constructor(private sidebar: LayoutService) {}

  close() {
    this.sidebar.closeSidebar()
  }
}
