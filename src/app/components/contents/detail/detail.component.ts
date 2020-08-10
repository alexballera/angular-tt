import { Component, Input, OnChanges } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Resource } from '@ticmas/common-interfaces'
import { ContentList } from '@ticmas/common-interfaces'
import has from 'lodash/has'
import { GroupEditActions } from '../../../actions'
import { Content, DistributionGroup } from '../../../models/metrics'
import { State } from '../../../reducers'
import { ContentsService } from '../../../services/contents.service'
import { LayoutService } from '../../layout/layout.module'
import { ContentPublicatorComponent } from '../../library/content-publicator/content-publicator.component'

@Component({
  selector: 'app-content-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class ContentDetailComponent implements OnChanges {
  @Input() isGroup: boolean = false
  @Input() isCourseView: boolean = false
  @Input() metrics: ContentList
  @Input() selectedGroup: DistributionGroup

  contents: Content[]

  constructor(
    private store: Store<State>,
    public sidebar: LayoutService,
    public contentsService: ContentsService,
    private router: Router
  ) {}

  ngOnChanges() {
    this.contents = this.contentsService.sortByValidity(
      this.selectedGroup.contents.map(content => ({
        ...content,
        attachments: content.attachments.map(attachment => ({
          ...attachment,
          cover_url: attachment.cover_url.replace(/\s/g, '%20'),
        })),
      }))
    )
  }

  edit(event: Event, content: ContentList) {
    event.stopPropagation()
    this.contentsService.setResource(content.resource)
    this.sidebar.openSidebar(ContentPublicatorComponent, {
      context: {
        isEditing: true,
        content,
        groupPreselected: has(this.selectedGroup, 'parent')
          ? this.selectedGroup._id
          : null,
      },
    })
  }

  goToContent(resource: Resource) {
    this.contentsService.openContentPreview(resource)
  }

  delete(content: Content) {
    this.store.dispatch(
      GroupEditActions.deleteContent({ group: this.selectedGroup, content })
    )
  }
}
