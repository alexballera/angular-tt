import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  ResourcesService,
  RmService,
  TagsService,
} from '@ticmas/common-services'
import {
  debounce,
  deburr,
  flow,
  get,
  isEmpty,
  lowerCase,
  orderBy,
  sortBy,
  uniqBy,
} from 'lodash/fp'
import flatten from 'lodash/fp/flatten'
import { combineLatest, Observable } from 'rxjs'
import { filter, map, pluck, tap } from 'rxjs/operators'
import { ContextService } from '../../services/context.service'
import { PlanificationService } from '../../services/planification.service'
export interface SearchForm {
  q?: string
  tags?: {
    [type: string]: string
  }
  filter_my_resources?: boolean
  status?: 'all' | 'error' | 'processed'
  limit?: number
}

@Component({
  selector: 'ticmas-contents-library',
  host: { class: 'container-fluid' },
  templateUrl: './contents-library.component.html',
  styleUrls: ['./contents-library.component.scss'],
})
export class ContentsLibraryComponent implements OnInit {
  @Input() params: SearchForm = {}
  @Output() resourceAsign = new EventEmitter<any>()
  @Output() selection = new EventEmitter<any>()
  searchResults: boolean = false
  itemSelected: boolean
  allTagsShowCount = 2
  form: SearchForm
  resource
  tags$
  levelsBySubjects$
  allTags$
  resources = []
  loading = false
  levels$
  subjects$
  allSubjectsAndTags$: Observable<any[]>

  private fetch = debounce(500, () => {
    this.search()
  })

  constructor(
    public ts: TagsService,
    public rs: ResourcesService,
    public rm: RmService,
    private contextService: ContextService,
    private planificationService: PlanificationService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.tags$ = this.contextService.school$.pipe(
      filter(Boolean),
      pluck('config'),
      map(({ levels, subjects }) =>
        []
          .concat(subjects.map(subject => subject))
          .concat(levels.map(level => level))
      )
    )
    this.levels$ = this.contextService.schools$.pipe(
      filter(Boolean),
      map((schools: any) => flatten(schools.map(get('config.levels')))),
      map(uniqBy((s: any) => s.name)),
      map(orderBy('name', 'asc'))
    )
    this.subjects$ = this.contextService.schools$.pipe(
      filter(Boolean),
      map((schools: any) => flatten(schools.map(get('config.subjects')))),
      map(uniqBy((s: any) => s.name)),
      map(orderBy('name', 'asc'))
    )
    this.levelsBySubjects$ = this.planificationService.distributionGroup$.pipe(
      map(data =>
        uniqBy(
          sbl => sbl.subject + sbl.level,
          data
            .filter(lbs => lbs.category !== 'sin asignatura asociada')
            .map(({ category, level }) => {
              if (category && level) {
                return { subject: category, level }
              } else {
                return {}
              }
            })
        )
      )
    )
    this.allSubjectsAndTags$ = combineLatest(
      this.levelsBySubjects$,
      this.tags$
    ).pipe(map(list => flatten(list).filter(l => !isEmpty(l))))
    this.cleanFilters()

    const breakpoints = [
      '(min-width: 1200px) and (max-width: 1439px)',
      '(min-width: 1440px) and (max-width: 1739px)',
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
            this.allTagsShowCount = key + this.allTagsShowCount + 2
          }
        })
      })
  }

  search() {
    const transforn = flow((r: any) => r.title, deburr, lowerCase)
    this.searchResults = true
    this.loading = true
    this.resources = []
    this.rm
      .getResources({
        ...this.form,
        tags: Object.values(this.form.tags).filter(Boolean),
        limit: 100,
      })
      .pipe(pluck('data'), map(sortBy(transforn)))
      .subscribe(result => {
        this.loading = false
        this.resources = result
      })
  }

  cleanFilters() {
    this.searchResults = false
    this.form = { q: '', tags: {}, ...this.params }
  }

  inputChange() {
    this.fetch()
    this.loading = true
    this.searchResults = true
  }

  selectResource(resource) {
    this.selection.emit(resource)
  }

  asignResource(resource) {
    this.resourceAsign.emit(resource)
  }

  onScroll() {
    this.allTagsShowCount++
  }
}
