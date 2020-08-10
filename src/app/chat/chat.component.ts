import { Component } from '@angular/core'
import { ChatService } from './chat.service'

@Component({
  selector: 'ticmas-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  constructor(public chatService: ChatService) {}
}
