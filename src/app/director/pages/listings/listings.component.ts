import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { resetTeacher, State } from '../../ngrx'
import { DirectorService } from '../../services/director.service'
import { DirectorMetricsService } from '../../services/metrics.service'

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent {
  showDetail = false
  constructor(
    private store: Store<State>,
    public director: DirectorService,
    public metricsServices: DirectorMetricsService
  ) {}

  goDetail(e) {
    this.showDetail = true
  }

  backList() {
    this.store.dispatch(resetTeacher())
    this.showDetail = false
  }
}
