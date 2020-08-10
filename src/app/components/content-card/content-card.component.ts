import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { NbPopoverDirective } from '@nebular/theme'
import { Store } from '@ngrx/store'
import {
  ContentData,
  DistributionGroupInContext,
  Group,
  GroupMetrics,
} from '@ticmas/common-interfaces'
import { ToastService } from '@ticmas/common-services'
import get from 'lodash/get'
import map from 'lodash/map'
import { Observable } from 'rxjs'
import { map as rxMap } from 'rxjs/operators'
import { DistributionGroupActions } from '../../actions'
import { State } from '../../reducers'
import { CreateCourseComponent } from '../course/create-course/create-course.component'
import { LayoutService } from '../layout/layout.module'

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent implements OnInit {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective
  @Input() course: Group & {
    parentGroup: DistributionGroupInContext
  }
  @Input() openOnboarding: boolean
  @Input() onboardingNameOpened: string
  @Output() closeOnboardingEvent = new EventEmitter<any>()

  courseMetrics$: Observable<{
    all: ContentData
    active: ContentData
    fromLastWeek: ContentData
    activeContentList: string[]
  }>

  constructor(
    private router: Router,
    public sidebar: LayoutService,
    private store: Store<State>,
    private toast: ToastService
  ) {}

  closeOnboarding(val) {
    this.closeOnboardingEvent.emit(val)
    this.popover.hide()
  }

  ngOnInit() {
    this.courseMetrics$ = this.store.select('metrics', 'courses').pipe(
      rxMap(metrics => {
        const generalMetrics: GroupMetrics = get(
          metrics.general,
          this.course._id,
          {}
        )
        const lastWeekMetrics: GroupMetrics = get(
          metrics.fromLastWeek,
          this.course._id,
          {}
        )
        const activeContents = get(generalMetrics, 'contents.active', {})
        const lastWeekGeneralMetrics = get(lastWeekMetrics, 'contents.all', {})
        return {
          all: get(generalMetrics, 'contents.all', {}),
          active: activeContents,
          fromLastWeek: lastWeekGeneralMetrics,
          activeContentList: map(activeContents.list, content => content.title),
        }
      })
    )
  }

  ngAfterViewInit() {
    if (this.openOnboarding) {
      this.popover.show()
    }
  }

  editCourse(event: Event, course) {
    event.stopPropagation()
    this.sidebar.openSidebar(CreateCourseComponent, { context: { course } })
  }

  openDetailPage() {
    this.store.dispatch(
      DistributionGroupActions.select(this.course.parentGroup._id)
    )
    this.router.navigate(['/clases/aulas'])
  }

  selectCode(event: Event, code: string) {
    event.stopPropagation()
    const elem = document.createElement('textarea')
    elem.style.position = 'fixed'
    elem.style.left = '0'
    elem.style.top = '0'
    elem.style.opacity = '0'
    elem.value = code
    document.body.appendChild(elem)
    elem.focus()
    elem.select()
    document.execCommand('copy')
    document.body.removeChild(elem)

    this.toast.showToast('Código de la clase copiado exitosamente', null, {
      status: 'success',
    })
  }
}
