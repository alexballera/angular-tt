import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { DistributionGroupInContext, Group } from '@ticmas/common-interfaces'
import has from 'lodash/has'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { IntegrationsService } from 'src/app/services/integrations.service'
import { OnboardingService } from 'src/app/services/onboarding.service'
import { PlanificationService } from '../../../services/planification.service'
import { LayoutService } from '../../layout/layout.module'
import { CreateCourseComponent } from './../../course/create-course/create-course.component'

@Component({
  selector: 'app-contents-page',
  templateUrl: './contents-page.component.html',
  styleUrls: ['./contents-page.component.scss'],
})
export class ContentsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  onboardingIndex: number = -1
  onboardingNameOpened: string = ''
  isOpenOnboarding: boolean = false
  coursesSub: Subscription
  courses: any
  courses$: Observable<
    Array<
      Group & {
        parentGroup: DistributionGroupInContext
      }
    >
  >
  classroomLoading$: Observable<boolean>
  loadingCourses = '/loading-courses.svg'

  constructor(
    public sidebar: LayoutService,
    private planification: PlanificationService,
    private onboardingService: OnboardingService,
    private integrationsService: IntegrationsService
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

    this.classroomLoading$ = this.integrationsService.classroomLoading$
  }
  ngOnDestroy() {
    this.coursesSub.unsubscribe()
  }

  ngAfterViewInit() {
    const preventOpenOnboarding = this.onboardingService.isPreventOpenOnboarding(
      true
    )
    this.coursesSub = this.courses$.subscribe(courses => {
      if (!preventOpenOnboarding) {
        const firstCourseWithoutStudents = this.getFirstCourseWithoutStudents(
          courses
        )
        if (
          courses.length === 1 &&
          this.onboardingService.isOnboardingFlagSetted('library-onboarding') &&
          !this.onboardingService.isOnboardingFlagSetted(
            'courses-onboarding-home'
          )
        ) {
          this.onboardingIndex = 0
          this.onboardingNameOpened = 'courses-onboarding-home'
          this.openOnboarding('courses-onboarding-home')
          this.onboardingService.setOnboardingFlag('courses-onboarding-home')
        } else if (
          courses.length &&
          firstCourseWithoutStudents !== -1 &&
          this.onboardingService.isOnboardingFlagSetted('library-onboarding') &&
          !this.onboardingService.isOnboardingFlagSetted(
            'courses-2-onboarding-home'
          )
        ) {
          this.onboardingIndex = firstCourseWithoutStudents
          this.onboardingNameOpened = 'courses-2-onboarding-home'
          this.openOnboarding('courses-2-onboarding-home')
        }
      }
    })
  }

  getFirstCourseWithoutStudents(courses) {
    return courses.findIndex(course => course.persons.length < 3)
  }

  openOnboarding(onboarding) {
    if (!this.onboardingService.isOnboardingFlagSetted(onboarding)) {
      this.isOpenOnboarding = true
    }
  }

  closeOnboarding(val) {
    if (val === 'notShowAgain') {
      this.onboardingService.isOnboardingFlagSetted(this.onboardingNameOpened)
    }
  }

  openCreateClass() {
    this.sidebar.openSidebar(CreateCourseComponent)
  }
}
