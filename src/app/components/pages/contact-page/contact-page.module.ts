import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ContactModule } from '../../contact/contact.module'
import { ContactPageRoutingModule } from './contact-page-routing.module'
import { ContactPageComponent } from './contact-page.component'

@NgModule({
  imports: [CommonModule, ContactPageRoutingModule, ContactModule],
  exports: [],
  declarations: [ContactPageComponent],
  providers: [],
})
export class ContactPageModule {}
