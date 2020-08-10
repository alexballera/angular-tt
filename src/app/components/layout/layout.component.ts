import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { NbMenuItem } from '@nebular/theme'
import { Observable } from 'rxjs'
import { IntegrationsService } from 'src/app/services/integrations.service'

@Component({
  selector: 'ticmas-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  @Input() logo: string
  @Input() defaultAvatar: string
  @Input() sidenavItems: NbMenuItem[]

  classroomLoading$: Observable<boolean>

  constructor(private integrationsService: IntegrationsService) {}

  ngOnInit() {
    this.classroomLoading$ = this.integrationsService.classroomLoading$
  }
}
