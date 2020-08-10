import { UserInfo } from '@ticmas/common-interfaces'
import { createAction, createAsyncAction } from 'typesafe-actions'

export const togglePasswordForm = createAction(
  '[@ticmas/common-components Profile] TOGGLE_PASSWORD_FORM'
)<void>()

export const showPasswordForm = createAction(
  '[@ticmas/common-components Profile] SHOW_PASSWORD_FORM'
)<boolean>()

export const passwordChange = createAsyncAction(
  '[@ticmas/common-components Profile] PASSWORD_CHANGE_REQUEST',
  '[@ticmas/common-components Profile] PASSWORD_CHANGE_SUCCESS',
  '[@ticmas/common-components Profile] PASSWORD_CHANGE_FAILURE'
)<string, void, Error>()

export const toggleEmailForm = createAction(
  '[@ticmas/common-components Profile] TOGGLE_EMAIL_FORM'
)<void>()

export const showEmailForm = createAction(
  '[@ticmas/common-components Profile] SHOW_EMAIL_FORM'
)<boolean>()

export const avatarChange = createAsyncAction(
  '[@ticmas/common-components Profile] AVATAR_CHANGE_REQUEST',
  '[@ticmas/common-components Profile] AVATAR_CHANGE_SUCCESS',
  '[@ticmas/common-components Profile] AVATAR_CHANGE_FAILURE'
)<File, void, Error>()

export const updateUser = createAsyncAction(
  '[@ticmas/common-components Profile] USER_UPDATE_REQUEST',
  '[@ticmas/common-components Profile] USER_UPDATE_SUCCESS',
  '[@ticmas/common-components Profile] USER_UPDATE_FAILURE'
)<Omit<UserInfo, 'sub' | 'preferred_username'>, void, Error>()
