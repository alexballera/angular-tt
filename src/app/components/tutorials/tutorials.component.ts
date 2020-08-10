import { Location } from '@angular/common'
import { Component, Inject } from '@angular/core'

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent {
  constructor(private location: Location, @Inject('ENV') public environment) {}

  goBack() {
    this.location.back()
  }
}
