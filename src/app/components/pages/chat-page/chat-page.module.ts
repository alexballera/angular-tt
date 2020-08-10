import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AuthService } from '@ticmas/auth-service'
import { UserInfo } from '@ticmas/common-interfaces'
import { filter } from 'rxjs/operators'
import { ChatModule } from '../../../chat/chat.module'
import { ChatService } from '../../../chat/chat.service'
import { PlanificationService } from '../../../services/planification.service'
import { ChatPageRoutingModule } from './chat-page-routing.module'
import { ChatPageComponent } from './chat-page.component'
@NgModule({
  imports: [CommonModule, ChatModule, ChatPageRoutingModule],
  exports: [],
  declarations: [ChatPageComponent],
  providers: [ChatService],
})
export class ChatPageModule {
  constructor(
    public auth: AuthService,
    private planification: PlanificationService,
    private chat: ChatService
  ) {
    this.auth.userInfo$
      .pipe<UserInfo>(
        filter(x => {
          return Boolean(x)
        })
      )
      .subscribe(user => {
        this.chat.login(
          user.preferred_username,
          this.planification.distributionGroups$
        )
      })
  }
}
