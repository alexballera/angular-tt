import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { RmService } from '@ticmas/common-services'

import deburr from 'lodash/fp/deburr'
import flow from 'lodash/fp/flow'
import lowerCase from 'lodash/fp/lowerCase'
import sortBy from 'lodash/fp/sortBy'
import { SwiperConfigInterface } from 'ngx-swiper-wrapper'
import { Subscription } from 'rxjs'
import { map, pluck } from 'rxjs/operators'
@Component({
  selector: 'ticmas-contents-sliders',
  templateUrl: './contents-sliders.component.html',
  styleUrls: ['../contents-library.component.scss'],
})
export class ContentsSlidersComponent implements OnInit, OnDestroy {
  @Input() tags: string[]
  @Input() titleTop
  @Output() resourceSelected = new EventEmitter<any>()
  @Output() resourceAsign = new EventEmitter<any>()

  sliderCount = 6
  slideShadow = 4
  list$
  activeIndex = 0
  resources = []
  loading = true
  show = true
  subscription: Subscription
  public config: SwiperConfigInterface = {
    navigation: true,
    slidesPerView: 5,
    spaceBetween: 5,
    width: 1150,
  }

  constructor(
    private rm: RmService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    const transforn = flow((r: any) => r.title, deburr, lowerCase)

    this.subscription = this.rm
      .getResources({ tags: Object.values(this.tags).filter(Boolean) })
      .pipe(pluck('data'), map(sortBy(transforn)))
      .subscribe(result => {
        this.resources = result
        this.loading = false
        if (result.length === 0) {
          this.show = false
        }
      })

    const md = ['(min-width: 1200px) and (max-width: 1439px)']

    this.breakpointObserver.observe(md).subscribe((state: BreakpointState) => {
      Object.values(state.breakpoints).forEach((item, key) => {
        if (item) {
          this.slideShadow = key + this.slideShadow + 1
          this.sliderCount = key + this.sliderCount + 1
        }
      })
    })

    const lg = ['(min-width: 1440px) and (max-width: 1739px)']

    this.breakpointObserver.observe(lg).subscribe((state: BreakpointState) => {
      Object.values(state.breakpoints).forEach((item, key) => {
        if (item) {
          this.slideShadow = key + this.slideShadow + 2
          this.sliderCount = key + this.sliderCount + 2
        }
      })
    })

    const breakpoints = [
      '(min-width: 1740px) and (max-width: 2019px)',
      '(min-width: 2020px) and (max-width: 2299px)',
      '(min-width: 2300px) and (max-width: 2569px)',
      '(min-width: 2570px) and (max-width: 2839px)',
      '(min-width: 2840px) and (max-width: 3129px)',
      '(min-width: 3130px)',
    ]

    this.breakpointObserver
      .observe(breakpoints)
      .subscribe((state: BreakpointState) => {
        Object.values(state.breakpoints).forEach((item, key) => {
          if (item) {
            this.slideShadow = key + this.slideShadow + 3
            this.sliderCount = key + this.sliderCount + 3
          }
        })
      })
  }

  contentClick(resource) {
    this.resourceSelected.emit(resource)
  }

  asignResource(resource) {
    this.resourceAsign.emit(resource)
  }

  sliderChange(e) {
    this.sliderCount++
    this.activeIndex = e
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
