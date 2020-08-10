import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import uniqBy from 'lodash/fp/uniqBy'
import { Observable } from 'rxjs'
import { filter, map, pluck } from 'rxjs/operators'
import { ContentsService } from '../../services/contents.service'
import { ContextService } from '../../services/context.service'
import { PlanificationService } from '../../services/planification.service'
import { LayoutService } from '../layout/layout.module'
import { ContentPublicatorComponent } from './content-publicator/content-publicator.component'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  contentEdit: any
  tags$: Observable<any>
  levelsBySubjects$: Observable<any>
  constructor(
    public contentsService: ContentsService,
    private router: Router,
    private contextService: ContextService,
    private planificationService: PlanificationService,
    private layoutService: LayoutService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.tags$ = this.contextService.school$.pipe(
      filter(Boolean),
      pluck('config'),
      map(({ levels, subjects }) =>
        []
          .concat(levels.map(level => level))
          .concat(subjects.map(subject => subject))
      )
    )

    this.levelsBySubjects$ = this.planificationService.distributionGroup$.pipe(
      map(data =>
        uniqBy(
          sbl => sbl.subject + sbl.level,
          data.map(({ category, level }) => ({ subject: category, level }))
        )
      )
    )
  }

  detailResourse(resource) {
    this.contentsService.openContentPreview(resource)
  }

  resourceAsign(r) {
    this.contentsService.setResource(r)
    this.layoutService.openSidebar(ContentPublicatorComponent)
  }
}
