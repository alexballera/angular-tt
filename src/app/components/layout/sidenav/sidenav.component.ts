import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Event, Router, RouterEvent } from '@angular/router'
import { NbMenuItem, NbPopoverDirective } from '@nebular/theme'
import { DistributionGroupInContext, Group } from '@ticmas/common-interfaces'
import { has } from 'lodash'
import { Observable, Subscription } from 'rxjs'
import { filter, map, takeWhile, tap } from 'rxjs/operators'
import { OnboardingService } from 'src/app/services/onboarding.service'
import { PlanificationService } from 'src/app/services/planification.service'

@Component({
  selector: 'ticmas-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective
  @Input() items: NbMenuItem
  coursesSub: Subscription
  routerSub: Subscription
  courses$: Observable<
    Array<
      Group & {
        parentGroup: DistributionGroupInContext
      }
    >
  >

  constructor(
    private planification: PlanificationService,
    private onboardingSrv: OnboardingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courses$ = this.planification.distributionGroups$.pipe(
      map(groups =>
        groups
          .filter(g => !has(g, 'parent'))
          .map(g => ({
            ...g.course,
            parentGroup: g,
          }))
      )
    )
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe()
    this.routerSub.unsubscribe()
  }

  ngAfterViewInit() {
    this.coursesSub = this.courses$
      .pipe(
        tap(courses => {
          if (
            !this.onboardingSrv.isPreventOpenOnboarding(true) &&
            !this.onboardingSrv.isOnboardingFlagSetted('library-onboarding') &&
            courses.length
          ) {
            this.popover.show()
          }
        }),
        takeWhile((courses: any) => {
          return !courses.length
        })
      )
      .subscribe()

    this.routerSub = this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        this.closeOnboarding('')
      })
  }

  closeOnboarding(val) {
    if (val === 'notShowAgain') {
      this.onboardingSrv.setOnboardingFlag('library-onboarding')
    }
    this.popover.hide()
  }
}
