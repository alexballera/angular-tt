import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { filter, first, pluck } from 'rxjs/operators'
import { DistributionGroupActions } from '../../../actions'
import { State } from '../../../reducers'

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
})
export class LibraryPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(pluck('distributiongroupId'), filter(Boolean), first())
      .subscribe(distributiongroupId => {
        this.store.dispatch(
          DistributionGroupActions.select(distributiongroupId)
        )
      })
  }
}
