import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { ChatPanelComponent } from './chat-panel/chat-panel.component'
import { ChatComponent } from './chat.component'
import { ChatService } from './chat.service'
import { CommonComponentsModule } from './common-components.module'
import { FilterPipe } from './filter.pipe'
import { GroupListComponent } from './group-list/group-list.component'
import { ChatEffects } from './ngrx/effects'
import { metaReducers } from './ngrx/metaReducers'
import { reducers } from './ngrx/reducers'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(ChatService.featureName, reducers, { metaReducers }),
    EffectsModule.forFeature([ChatEffects]),
    CommonComponentsModule,
  ],
  declarations: [
    ChatComponent,
    GroupListComponent,
    ChatPanelComponent,
    FilterPipe,
  ],
  exports: [ChatComponent],
  providers: [ChatService],
  entryComponents: [ChatPanelComponent],
})
export class ChatModule {}
