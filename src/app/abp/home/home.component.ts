import { Component } from '@angular/core'
import { AbpService } from '../abp.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public service: AbpService) {}
}
