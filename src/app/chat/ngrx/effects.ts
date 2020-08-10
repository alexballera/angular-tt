import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import last from 'lodash/fp/last'
import { from, Observable, of } from 'rxjs'
import {
  catchError,
  filter,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import { ChatService } from '../chat.service'
import {
  ChatActionTypes,
  ChatLogin,
  ChatLoginFailure,
  ChatLoginSuccess,
  CreateChannelsFromDistributionGroups,
  JoinRoom,
  MarkAsReadChannel,
  OutgoingMessage,
  SelectChannel,
  StatusChange,
} from './actions'

@Injectable()
export class ChatEffects {
  constructor(private actions$: Actions, private chatService: ChatService) {}

  @Effect()
  login$: Observable<ChatLoginSuccess | ChatLoginFailure> = this.actions$.pipe(
    ofType<ChatLogin>(ChatActionTypes.LOGIN),
    switchMap(({ payload }) => {
      this.chatService.initClient(payload)
      return from(this.chatService.chatClient.connect()).pipe(
        switchMap(jid =>
          of(new ChatLoginSuccess({ jid, timestamp: Date.now() }))
        ),
        catchError(() => of(new ChatLoginFailure({ timestamp: Date.now() })))
      )
    })
  )

  @Effect()
  joinRoomsOnOnlineOrNewChannelsAdded: Observable<
    JoinRoom
  > = this.actions$.pipe(
    filter<
      ChatLoginSuccess | StatusChange | CreateChannelsFromDistributionGroups
    >(
      action =>
        action.type === ChatActionTypes.LOGIN_SUCCESS ||
        (action.type ===
          ChatActionTypes.CREATE_CHANNELS_FROM_DISTRIBUTION_GROUPS &&
          action.payload.groups.length) ||
        (action.type === ChatActionTypes.STATUS_CHANGE &&
          action.payload === 'online')
    ),
    withLatestFrom(this.chatService.userJid$, this.chatService.channels$),
    filter(([, userJid]) => Boolean(userJid)),
    switchMap(([, userJid, channels]) =>
      of(
        ...channels.map(({ jid, history }) => {
          let since
          if (history.length) {
            const lastTimestamp = new Date(last(history).timestamp).valueOf()
            since = new Date(lastTimestamp + 1).toISOString()
          }
          return new JoinRoom({
            roomJid: jid,
            userNick: userJid.bare().toString(),
            since,
            isJustJoin: true,
          })
        })
      )
    )
  )

  @Effect({ dispatch: false })
  joinRoom$: Observable<any> = this.actions$.pipe(
    ofType(ChatActionTypes.JOIN_ROOM),
    tap<JoinRoom>(({ payload: { roomJid, userNick, since, isJustJoin } }) => {
      if (!isJustJoin) {
        this.chatService.markAsReadInChannel(roomJid)
      }
      this.chatService.chatClient.joinRoom(roomJid, { nick: userNick, since })
    })
  )

  @Effect({ dispatch: false })
  outgoingMessage$: Observable<any> = this.actions$.pipe(
    ofType(ChatActionTypes.OUTGOING_MESSAGE),
    tap<OutgoingMessage>(({ payload: { message, to } }) => {
      this.chatService.markAsReadInChannel(to.jid)
      this.chatService.chatClient.send(message, to.jid, { group: to.groupchat })
    })
  )

  // @Effect({ dispatch: false })
  // selectChannel$: Observable<any> = this.actions$.pipe(
  //   ofType(ChatActionTypes.SELECT_CHANNEL),
  //   tap<SelectChannel>(({ payload: { jid } }) => {
  //     console.log(jid)
  //   })
  // )

  // @Effect({ dispatch: false })
  // markasread$: Observable<any> = this.actions$.pipe(
  //   ofType(ChatActionTypes.MARK_AS_READ_CHANNEL),
  //   tap<MarkAsReadChannel>(({ payload: { jid } }) => {
  //     console.log(jid)
  //     // this.chatService.markAsReadInChannel(jid)
  //   })
  // )
}
