import { Component } from '@angular/core'
import { ContentsService } from '../../../services/contents.service'
import { LayoutService } from '../../layout/layout.module'
import { ContentPublicatorComponent } from '../content-publicator/content-publicator.component'

@Component({
  selector: 'app-content-preview-detail',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss'],
})
export class ContentPreviewDetailComponent {
  activePlubicator = false
  constructor(
    public contentService: ContentsService,
    private layoutService: LayoutService
  ) {}

  showPublicator() {
    this.layoutService.openSidebar(ContentPublicatorComponent)
  }
}
