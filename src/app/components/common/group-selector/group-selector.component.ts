import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'

import { Store } from '@ngrx/store'
import { ToastService } from '@ticmas/common-services'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { DistributionGroupActions } from '../../../actions'
import { DistributionGroupInContext } from '../../../models'
import { State } from '../../../reducers'
import { ContentsService } from '../../../services/contents.service'
import { PlanificationService } from '../../../services/planification.service'

@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GroupSelectorComponent implements OnInit {
  @Output() changeGroup = new EventEmitter<boolean>()
  @Input() showGroups: boolean = false
  @Input() isDisabled: boolean = false
  @Input() isError: boolean = false
  @Input() groupPreselected: string = null
  @Input() smallFont: boolean = false

  mixedGroups$: Observable<DistributionGroupInContext[]>
  classes$: Observable<DistributionGroupInContext[]>
  currentClass: DistributionGroupInContext
  groups$: Observable<any[]> = of([])
  selectedGroup = null

  constructor(
    private store: Store<State>,
    public planification: PlanificationService,
    private toast: ToastService,
    public contentService: ContentsService
  ) {}

  ngOnInit() {
    this.classes$ = this.planification.distributionGroups$.pipe(
      map(groups => groups.filter(group => !group.parent))
    )

    if (this.groupPreselected) {
      this.selectedGroup = this.groupPreselected
    }
  }

  ngAfterViewInit(): void {
    if (!this.isDisabled) {
      this.planification.groupId$
        .subscribe(id => {
          this.selectClass(id)
        })
        .unsubscribe()
    }
    if (this.groupPreselected) {
      this.store.dispatch(
        DistributionGroupActions.selectSubgroup(this.groupPreselected)
      )
    }
  }

  selectClass(group) {
    if (group) {
      this.selectedGroup = null
      this.store.dispatch(DistributionGroupActions.selectSubgroup(null))
      this.currentClass = group
      this.groups$ = this.planification.distributionGroups$.pipe(
        map(groups => groups.filter(g => g.parent && g.parent === group))
      )
      this.changeGroup.emit(true)
      this.store.dispatch(DistributionGroupActions.select(group))
    }
  }

  selectGroup(group) {
    if (group) {
      this.store.dispatch(DistributionGroupActions.selectSubgroup(group))
    } else {
      this.store.dispatch(DistributionGroupActions.selectSubgroup(null))
      this.store.dispatch(DistributionGroupActions.select(this.currentClass))
    }
  }
}
