import { Component, OnInit } from '@angular/core'
import { ChartConfig } from '@ticmas/common-interfaces'
import { format } from 'date-fns'
import { Observable } from 'rxjs'
import {
  DirectorService,
  GeneralMetrics,
} from '../../services/director.service'
@Component({
  selector: 'app-director-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  today = format(Date.now(), 'dd/MM/yyyy')
  generalMetrics$: Observable<GeneralMetrics>
  progressOnSubjects$: Observable<any>
  quarterlyInteractions$: Observable<Array<{ valueX: string; valueY: number }>>
  monthlyAvgInteraction$: Observable<{
    hours: number
    minutes: number
  }>
  subjectsChartConfig$: Observable<ChartConfig>
  quarterlyChartConfig$: Observable<ChartConfig>

  constructor(private directorService: DirectorService) {}

  ngOnInit() {
    this.generalMetrics$ = this.directorService.generalMetrics$
    this.progressOnSubjects$ = this.directorService.progressOnSubjects$
    this.quarterlyInteractions$ = this.directorService.quarterlyInteractions$
    this.monthlyAvgInteraction$ = this.directorService.monthlyAvgInteraction$
    this.subjectsChartConfig$ = this.directorService.subjectsChartConfig$
    this.quarterlyChartConfig$ = this.directorService.quarterlyChartConfig$
  }
}
