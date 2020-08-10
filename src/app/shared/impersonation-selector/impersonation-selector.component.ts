import { Component, Optional } from '@angular/core'
import { Router } from '@angular/router'
import { ImpersonationService } from '@ticmas/auth-service'

@Component({
  selector: 'app-impersonation-selector',
  templateUrl: './impersonation-selector.component.html',
  styleUrls: ['./impersonation-selector.component.scss'],
})
export class ImpersonationSelectorComponent {
  constructor(
    @Optional() public impersonationService: ImpersonationService,
    private router: Router
  ) {}

  async stopImpersonation() {
    await this.impersonationService.stopImpersonation()
  }
}
