import { PlannedContent, PlannedTheme } from '@ticmas/common-interfaces'
import { DistributionGroupInContext } from '../models'

export interface GroupAndContent {
  group: DistributionGroupInContext
  content: PlannedContent
}

export interface GroupAndTheme {
  group: DistributionGroupInContext
  theme: PlannedTheme
}

export class GroupEditActions {
  static CONTENT_SELECT_THEME_SHOW_MODAL =
    '[PlanificationEdit] CONTENT_SELECT_THEME_SHOW_MODAL'
  static SET_CONTENT_THEME = '[PlanificationEdit] SET_CONTENT_THEME'
  static SET_CONTENT_DISTRIBUTION_GROUP =
    '[PlanificationEdit] SET_CONTENT_DISTRIBUTION_GROUP'
  static SET_CONTENT_DATE = '[PlanificationEdit] SET_CONTENT_DATE'
  static SET_CONTENT_RESOURCES = '[PlanificationEdit] SET_CONTENT_RESOURCES'
  static SET_CONTENT_DURATION = '[PlanificationEdit] SET_CONTENT_DURATION'

  static SAVE_CONTENTS = '[PlanificationEdit] SAVE_CONTENTS'
  static SAVE_CONTENTS_SUCCESS = '[PlanificationEdit] SAVE_CONTENTS_SUCCESS'
  static SAVE_CONTENTS_FAILURE = '[PlanificationEdit] SAVE_CONTENTS_FAILURE'

  static DELETE_CONTENT = '[PlanificationEdit] DELETE_CONTENT'
  static DELETE_CONTENT_SUCCESS = '[PlanificationEdit] DELETE_CONTENT_SUCCESS'
  static DELETE_CONTENT_FAILURE = '[PlanificationEdit] DELETE_CONTENT_FAILURE'
  static UPDATE_CONTENT = '[PlanificationEdit] UPDATE_CONTENT'
  static UPDATE_CONTENT_SUCCESS = '[PlanificationEdit] UPDATE_CONTENT_SUCCESS'

  static CONTENT_SHOW_MODAL = '[PlanificationEdit] CONTENT_SHOW_MODAL'

  static SELECT_THEME = '[PlanificationEdit] SELECT_THEME'

  static ADD_THEME = '[PlanificationEdit] ADD_THEME'
  static ADD_THEME_SUCCESS = '[PlanificationEdit] ADD_THEME_SUCCESS'
  static ADD_THEME_FAILURE = '[PlanificationEdit] ADD_THEME_FAILURE'

  static UPDATE_THEME = '[PlanificationEdit] UPDATE_THEME'
  static UPDATE_THEME_SUCCESS = '[PlanificationEdit] UPDATE_THEME_SUCCESS'
  static UPDATE_THEME_FAILURE = '[PlanificationEdit] UPDATE_THEME_FAILURE'

  static DELETE_THEME = '[PlanificationEdit] DELETE_THEME'
  static DELETE_THEME_SUCCESS = '[PlanificationEdit] DELETE_THEME_SUCCESS'
  static DELETE_THEME_FAILURE = '[PlanificationEdit] DELETE_THEME_FAILURE'

  static USER_SHOW_MODAL = '[PlanificationEdit] USER_SHOW_MODAL'

  static showContentSelectThemeModal = (payload: boolean) => ({
    type: GroupEditActions.CONTENT_SELECT_THEME_SHOW_MODAL,
    payload,
  })
  static setContentTheme = payload => ({
    type: GroupEditActions.SET_CONTENT_THEME,
    payload,
  })
  static setContentDistributionGroup = payload => ({
    type: GroupEditActions.SET_CONTENT_DISTRIBUTION_GROUP,
    payload,
  })
  static setContentDate = (payload: Date) => ({
    type: GroupEditActions.SET_CONTENT_DATE,
    payload,
  })
  static setContentResources = payload => ({
    type: GroupEditActions.SET_CONTENT_RESOURCES,
    payload,
  })
  static setContentDuration = payload => ({
    type: GroupEditActions.SET_CONTENT_DURATION,
    payload,
  })

  static saveContents = payload => ({
    type: GroupEditActions.SAVE_CONTENTS,
    payload,
  })
  static saveContentsSuccess = payload => ({
    type: GroupEditActions.SAVE_CONTENTS_SUCCESS,
    payload,
  })
  static saveContentsFailure = payload => ({
    type: GroupEditActions.SAVE_CONTENTS_FAILURE,
    payload,
  })

  static deleteContent = payload => ({
    type: GroupEditActions.DELETE_CONTENT,
    payload,
  })
  static deleteContentSuccess = (payload: GroupAndContent) => ({
    type: GroupEditActions.DELETE_CONTENT_SUCCESS,
    payload,
  })
  static deleteContentsFailure = payload => ({
    type: GroupEditActions.DELETE_CONTENT_FAILURE,
    payload,
  })
  static updateContent = payload => ({
    type: GroupEditActions.UPDATE_CONTENT,
    payload,
  })
  static updateContentSuccess = payload => ({
    type: GroupEditActions.UPDATE_CONTENT_SUCCESS,
    payload,
  })

  static showContentModal = (payload: boolean) => ({
    type: GroupEditActions.CONTENT_SHOW_MODAL,
    payload,
  })

  static selectTheme = (payload: any) => ({
    type: GroupEditActions.SELECT_THEME,
    payload,
  })

  static addTheme = (payload: GroupAndTheme) => ({
    type: GroupEditActions.ADD_THEME,
    payload,
  })
  static addThemeSuccess = (payload: GroupAndTheme) => ({
    type: GroupEditActions.ADD_THEME_SUCCESS,
    payload,
  })
  static addThemeFailure = payload => ({
    type: GroupEditActions.ADD_THEME_FAILURE,
    payload,
  })

  static updateTheme = (payload: GroupAndTheme) => ({
    type: GroupEditActions.UPDATE_THEME,
    payload,
  })
  static updateThemeSuccess = (payload: GroupAndTheme) => ({
    type: GroupEditActions.UPDATE_THEME_SUCCESS,
    payload,
  })
  static updateThemeFailure = payload => ({
    type: GroupEditActions.UPDATE_THEME_FAILURE,
    payload,
  })

  static deleteTheme = (payload: GroupAndTheme) => ({
    type: GroupEditActions.DELETE_THEME,
    payload,
  })
  static deleteThemeSuccess = (payload: GroupAndTheme) => ({
    type: GroupEditActions.DELETE_THEME_SUCCESS,
    payload,
  })
  static deleteThemeFailure = payload => ({
    type: GroupEditActions.DELETE_THEME_FAILURE,
    payload,
  })

  static showUserModal = (payload: boolean) => ({
    type: GroupEditActions.USER_SHOW_MODAL,
    payload,
  })
}
