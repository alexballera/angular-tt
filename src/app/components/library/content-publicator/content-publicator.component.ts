import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core'
import { NbDialogService } from '@nebular/theme'

import { Store } from '@ngrx/store'
import { PlannedContent, Resource } from '@ticmas/common-interfaces'
import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'
import { Observable, Subscription } from 'rxjs'
import {
  DistributionGroupActions,
  GroupEditActions,
  ResourcesActions,
} from '../../../actions/'
import { State } from '../../../reducers'
import { ContentsService } from '../../../services/contents.service'
import { ContextService } from '../../../services/context.service'
import { DistributionGroupService } from '../../../services/distribution-group.service'
import { OnboardingService } from '../../../services/onboarding.service'
import { PlanificationService } from '../../../services/planification.service'
import { LayoutService } from '../../layout/layout.module'

@Component({
  selector: 'app-content-publicator',
  templateUrl: './content-publicator.component.html',
  styleUrls: ['./content-publicator.component.scss'],
})
export class ContentPublicatorComponent implements OnInit, OnDestroy {
  @Input() content: PlannedContent & { dueDate: string } = null
  @Input() isEditing: boolean = false
  @Input() groupPreselected: string = null

  @Output() resSelected = new EventEmitter<any>()
  @Output() newThemenewTheme = new EventEmitter<boolean>()

  startDate: Date = new Date()
  endDate: Date = new Date()

  dateIsOverlap: boolean = false
  noClassSelected: boolean = false
  repeatedContents: PlannedContent[]

  contentOverlap$: Observable<boolean>
  courseSelected$: Observable<boolean>
  invalidForm$: Observable<boolean>
  assignContentLoading$: Observable<boolean>

  items: Array<{ title: string; data: any }> = []

  private subscriptions$: Subscription

  @Output() close = new EventEmitter()

  resource$: Observable<Resource>
  editableResource$: Observable<Resource>

  noAssetsSelected: boolean

  constructor(
    public contextService: ContextService,
    private store: Store<State>,
    public sidebar: LayoutService,
    private dialogService: NbDialogService,
    public planificationService: PlanificationService,
    public distributionGroupService: DistributionGroupService,
    public contentsService: ContentsService,
    private onboardingSrv: OnboardingService
  ) {}

  ngOnInit() {
    if (this.isEditing) {
      this.startDate = this.recoverDate(this.content.startDate)
      this.endDate = this.recoverDate(this.content.dueDate)
      this.store.dispatch(
        DistributionGroupActions.addAttachContentSuccess(
          this.content.attachments
        )
      )
    } else {
      this.startDate.setHours(0, 0, 0, 0)
      this.endDate.setHours(0, 0, 0, 0)
    }

    this.subscriptions$ = this.contentsService
      .getRepeatedContents(this.content && this.content._id)
      .subscribe(data => (this.repeatedContents = data))

    this.subscriptions$ = this.distributionGroupService.haveSelectedGroup$.subscribe(
      data => (this.noClassSelected = !data)
    )

    this.resource$ = this.contentsService.resource$
    this.editableResource$ = this.contentsService.editableResource$

    this.subscriptions$ = this.editableResource$.subscribe(
      resource => (this.noAssetsSelected = !resource.assets.length)
    )

    this.assignContentLoading$ = this.contentsService.assignContentLoading$

    this.contentsService.resource$
      .subscribe(resource => {
        this.items = resource.assets.map(asset => ({
          title: asset.title,
          data: asset,
        }))
      })
      .unsubscribe()
  }

  onSelectedDate() {
    this.dateIsOverlap = this.contentsService.checkOverlap(
      this.repeatedContents,
      this.startDate,
      this.endDate
    )
  }

  recoverDate(date) {
    const splitted = date.split('/')
    return new Date(splitted[2], splitted[1] - 1, splitted[0])
  }

  saveResourceSelected() {
    this.dateIsOverlap = this.contentsService.checkOverlap(
      this.repeatedContents,
      this.startDate,
      this.endDate
    )

    if (this.dateIsOverlap || this.noClassSelected || this.noAssetsSelected) {
      return
    }

    const startDate = format(this.startDate, 'yyyy-MM-dd')
    const dueDate = format(this.endDate, 'yyyy-MM-dd')
    const duration = differenceInDays(this.endDate, this.startDate)

    if (!this.isEditing) {
      this.store.dispatch(
        GroupEditActions.saveContents({
          duration,
          startDate,
          dueDate,
        })
      )
    } else {
      const content = {
        ...this.content,
        startDate,
        dueDate,
        duration,
        resource: this.content.resource,
      }

      this.store.dispatch(
        GroupEditActions.updateContent({
          content,
        })
      )
    }
  }

  deleteAttach(url) {
    this.content.attachments = this.content.attachments.filter(
      r => r.url !== url
    )
  }

  onStartDateChange(event) {
    if (event > this.endDate) {
      this.endDate = event
    }
  }

  closeSidebar() {
    this.onboardingSrv.setPreventOpenOnboarding(false)
    this.store.dispatch(DistributionGroupActions.resetAttachContent())
    this.sidebar.closeSidebar()
  }

  attachContent(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { dialogClass: 'dialog-fullwidth' })
  }

  deleteUrl(url) {
    this.store.dispatch(DistributionGroupActions.removeAttachContent(url))
  }

  toggleSelected(assets: any[]) {
    this.store.dispatch(ResourcesActions.toggleAssetSelection(assets))
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe()
  }
}
