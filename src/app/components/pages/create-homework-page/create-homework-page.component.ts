import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { ContextService } from 'src/app/services/context.service'

@Component({
  selector: 'app-create-homework-page',
  templateUrl: './create-homework-page.component.html',
  styleUrls: ['./create-homework-page.component.scss'],
})
export class CreateHomeworkPageComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription
  hasHomework$: Observable<boolean>

  constructor(private contextService: ContextService, private router: Router) {}

  ngOnInit() {
    this.hasHomework$ = this.contextService.hasHomework$
    this.subscriptions$ = this.hasHomework$.subscribe(hasHomework => {
      if (!hasHomework) {
        this.router.navigateByUrl('clases')
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe()
  }
}
