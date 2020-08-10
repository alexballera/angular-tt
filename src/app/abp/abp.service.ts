import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class AbpService {
  url$ = new BehaviorSubject<string>(null)
  messages$ = new BehaviorSubject<{ type: string; [x: string]: any }>(null)

  toggleSidebar() {
    this.messages$.next({ type: 'toggle_sidebar' })
  }

  search(q) {
    this.messages$.next({ type: 'search', q })
  }
}
