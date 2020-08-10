import { Config, JID, Stanza, Status } from '@bidi/chat-client'
import { Action } from '@ngrx/store'
import { Channel, ChannelGroup, DistributionGroup } from '../models'

export const ChatActionTypes = {
  SET_USER: '@ticmas/common-components Chat SET_USER',
  CREATE_CHANNELS_FROM_DISTRIBUTION_GROUPS:
    '@ticmas/common-components Chat CREATE_CHANNELS_FROM_DISTRIBUTION_GROUPS',
  SELECT_GROUP: '@ticmas/common-components Chat SELECT_GROUP',
  SELECT_CHANNEL: '@ticmas/common-components Chat SELECT_CHANNEL',
  LOGIN: '@ticmas/common-components Chat LOGIN',
  LOGIN_SUCCESS: '@ticmas/common-components Chat LOGIN_SUCCESS',
  LOGIN_FAILURE: '@ticmas/common-components Chat LOGIN_FAILURE',
  LOGOUT: '@ticmas/common-components Chat LOGOUT',
  STATUS_CHANGE: '@ticmas/common-components Chat STATUS_CHANGE',
  JOIN_ROOM: '@ticmas/common-components Chat JOIN_ROOM',
  INCOMING_MESSAGE: '@ticmas/common-components Chat INCOMING_MESSAGE',
  OUTGOING_MESSAGE: '@ticmas/common-components Chat OUTGOING_MESSAGE',
  MARK_AS_READ_CHANNEL: '@ticmas/common-components Chat MARK_AS_READ_CHANNEL',
}

export class CreateChannelsFromDistributionGroups implements Action {
  readonly type = ChatActionTypes.CREATE_CHANNELS_FROM_DISTRIBUTION_GROUPS

  constructor(
    readonly payload: { groups: DistributionGroup[]; host: string }
  ) {}
}

export class SelectGroup implements Action {
  readonly type = ChatActionTypes.SELECT_GROUP

  constructor(readonly payload: ChannelGroup) {}
}

export class SelectChannel implements Action {
  readonly type = ChatActionTypes.SELECT_CHANNEL

  constructor(readonly payload: Channel) {}
}

export class MarkAsReadChannel implements Action {
  readonly type = ChatActionTypes.MARK_AS_READ_CHANNEL

  constructor(readonly payload: Channel) {}
}

export class ChatLogin implements Action {
  readonly type = ChatActionTypes.LOGIN

  constructor(readonly payload: Config) {}
}

export class ChatLoginSuccess implements Action {
  readonly type = ChatActionTypes.LOGIN_SUCCESS

  constructor(readonly payload: { timestamp: number; jid: JID }) {}
}

export class ChatLoginFailure implements Action {
  readonly type = ChatActionTypes.LOGIN_FAILURE

  constructor(readonly payload: { timestamp: number }) {}
}

export class ChatLogout implements Action {
  readonly type = ChatActionTypes.LOGOUT
}

export class StatusChange implements Action {
  readonly type = ChatActionTypes.STATUS_CHANGE

  constructor(readonly payload: Status) {}
}

export class JoinRoom implements Action {
  readonly type = ChatActionTypes.JOIN_ROOM

  constructor(
    readonly payload: {
      roomJid: string
      userNick: string
      since?: string
      isJustJoin?: boolean
    }
  ) {}
}

export class IncomingMessage implements Action {
  readonly type = ChatActionTypes.INCOMING_MESSAGE

  constructor(readonly payload: Stanza, public timestamp = new Date()) {}
}

export class OutgoingMessage implements Action {
  readonly type = ChatActionTypes.OUTGOING_MESSAGE

  constructor(readonly payload: { to: Channel; message: string }) {}
}
