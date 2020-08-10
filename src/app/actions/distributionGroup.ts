export class DistributionGroupActions {
  static SELECT = '[DistributionGroup] SELECT'

  static SELECT_SUBGROUP = '[DistributionGroup] SELECT_SUBGROUP'

  static SET_METRICS = '[DistributionGroup] SET_METRICS'

  static FETCH = '[DistributionGroup] FETCH'
  static FETCH_SUCCESS = '[DistributionGroup] FETCH_SUCCESS'
  static FETCH_FAILURE = '[DistributionGroup] FETCH_FAILURE'

  static UPDATE = '[DistributionGroup] UPDATE'
  static UPDATE_SUCCESS = '[DistributionGroup] UPDATE_SUCCESS'
  static UPDATE_FAILURE = '[DistributionGroup] UPDATE_FAILURE'

  static CREATE = '[DistributionGroup] CREATE'
  static CREATE_MANY = '[DistributionGroup] CREATE_MANY'
  static CREATE_SUCCESS = '[DistributionGroup] CREATE_SUCCESS'
  static CREATE_FAILURE = '[DistributionGroup] CREATE_FAILURE'

  static CREATE_SUBGROUP = '[DistributionGroup] CREATE_SUBGROUP'

  static ADD_USERS_SUBGROUP = '[DistributionGroup] ADD_USERS_SUBGROUP'
  static ADD_USERS_SUBGROUP_SUCCESS =
    '[DistributionGroup] ADD_USERS_SUBGROUP_SUCCESS'
  static ADD_USERS_SUBGROUP_FAILURE =
    '[DistributionGroup] ADD_USERS_SUBGROUP_FAILURE'

  static RESET_SUBGROUP_USERS_ADDITION_FORM =
    '[DistributionGroup] RESET_SUBGROUP_USERS_ADDITION_FORM'

  static DELETE_DISTRIBUTION_GROUP =
    '[DistributionGroup] DELETE_DISTRIBUTION_GROUP'
  static DELETE_DISTRIBUTION_GROUP_SUCCESS =
    '[DistributionGroup] DELETE_DISTRIBUTION_GROUP_SUCCESS'
  static DELETE_DISTRIBUTION_GROUP_BY_COURSE =
    '[DistributionGroup] DELETE_DISTRIBUTION_GROUP_BY_COURSE'
  static DELETE_DISTRIBUTION_GROUP_BY_COURSE_SUCCESS =
    '[DistributionGroup] DELETE_DISTRIBUTION_BY_COURSE_GROUP_SUCCESS'

  static EMPTY_DISTRIBUTION_GROUP =
    '[DistributionGroup] EMPTY_DISTRIBUTION_GROUP'
  static EMPTY_THEMES_DISTRIBUTION_GROUP =
    '[DistributionGroup] EMPTY_THEMES_DISTRIBUTION_GROUP'
  static EMPTY_CONTENTS_DISTRIBUTION_GROUP =
    '[DistributionGroup] EMPTY_CONTENTS_DISTRIBUTION_GROUP'

  static SELECT_DISTRIBUTION_GROUP =
    '[DistributionGroup] SELECT_DISTRIBUTION_GROUP'

  static ADD_USER_FORM = '[DistributionGroup] ADD_USER_FORM'
  static REMOVE_USER_FORM = '[DistributionGroup] REMOVE_USER_FORM'
  static REMOVE_USERS_FORM = '[DistributionGroup] REMOVE_USERS_FORM'

  static REMOVE_STUDENT_GROUPS = '[DistributionGroup] REMOVE_STUDENT_GROUPS'

  static ADD_ATTACH_CONTENT = '[DistributionGroup] ADD_ATTACH_CONTENT'
  static ADD_ATTACH_CONTENT_SUCCESS =
    '[DistributionGroup] ADD_ATTACH_CONTENT_SUCCESS'
  static REMOVE_ATTACH_CONTENT = '[DistributionGroup] REMOVE_ATTACH_CONTENT'
  static RESET_ATTACH_CONTENT = '[DistributionGroup] RESET_ATTACH_CONTENT'
  static UPLOAD_COVER_ATTACH_CONTENT =
    '[DistributionGroup] UPLOAD_COVER_ATTACH_CONTENT'
  static UPLOAD_COVER_ATTACH_CONTENT_SUCCESS =
    '[DistributionGroup] UPLOAD_COVER_ATTACH_CONTENT_SUCCESS'
  static UPLOAD_FILE_ATTACH_CONTENT =
    '[DistributionGroup] UPLOAD_FILE_ATTACH_CONTENT'
  static UPLOAD_FILE_ATTACH_CONTENT_SUCCESS =
    '[DistributionGroup] UPLOAD_FILE_ATTACH_CONTENT_SUCCESS'
  static RESET_FILE_ATTACH_CONTENT =
    '[DistributionGroup] RESET_FILE_ATTACH_CONTENT'

  static UPDATE_GROUP = '[DistributionGroup] UPDATE_GROUP'
  static UPDATE_GROUP_SUCCESS = '[DistributionGroup] UPDATE_GROUP_SUCCESS'
  static UPDATE_GROUP_FAILURE = '[DistributionGroup] UPDATE_GROUP_FAILURE'

  static select = payload => ({
    type: DistributionGroupActions.SELECT,
    payload,
  })

  static selectSubgroup = payload => ({
    type: DistributionGroupActions.SELECT_SUBGROUP,
    payload,
  })

  static setMetrics = payload => ({
    type: DistributionGroupActions.SET_METRICS,
    payload,
  })

  static fetch = () => ({ type: DistributionGroupActions.FETCH })
  static fetchSuccess = payload => ({
    type: DistributionGroupActions.FETCH_SUCCESS,
    payload,
  })
  static fetchFailure = payload => ({
    type: DistributionGroupActions.FETCH_FAILURE,
    payload,
  })

  static update = () => ({ type: DistributionGroupActions.UPDATE })
  static updateSuccess = payload => ({
    type: DistributionGroupActions.UPDATE_SUCCESS,
    payload,
  })
  static updateFailure = payload => ({
    type: DistributionGroupActions.UPDATE_FAILURE,
    payload,
  })

  static create = payload => ({
    type: DistributionGroupActions.CREATE,
    payload,
  })
  static createMany = payload => ({
    type: DistributionGroupActions.CREATE_MANY,
    payload,
  })
  static createSuccess = payload => ({
    type: DistributionGroupActions.CREATE_SUCCESS,
    payload,
  })
  static createFailure = payload => ({
    type: DistributionGroupActions.CREATE_FAILURE,
    payload,
  })
  static createSubgroup = payload => ({
    type: DistributionGroupActions.CREATE_SUBGROUP,
    payload,
  })

  static addUsersSubgroup = payload => ({
    type: DistributionGroupActions.ADD_USERS_SUBGROUP,
    payload,
  })
  static addUsersSubgroupSuccess = payload => ({
    type: DistributionGroupActions.ADD_USERS_SUBGROUP_SUCCESS,
    payload,
  })
  static addUsersSubgroupFailure = payload => ({
    type: DistributionGroupActions.ADD_USERS_SUBGROUP_FAILURE,
    payload,
  })

  static resetSubgroupUsersAdditionForm = () => ({
    type: DistributionGroupActions.RESET_SUBGROUP_USERS_ADDITION_FORM,
  })

  static deleteDistributionGroup = payload => ({
    type: DistributionGroupActions.DELETE_DISTRIBUTION_GROUP,
    payload,
  })

  static deleteDistributionGroupSuccess = payload => ({
    type: DistributionGroupActions.DELETE_DISTRIBUTION_GROUP_SUCCESS,
    payload,
  })

  static deleteDistributionGroupByCourse = payload => ({
    type: DistributionGroupActions.DELETE_DISTRIBUTION_GROUP_BY_COURSE,
    payload,
  })

  static deleteDistributionGroupByCourseSuccess = payload => ({
    type: DistributionGroupActions.DELETE_DISTRIBUTION_GROUP_BY_COURSE_SUCCESS,
    payload,
  })
  static emptyDistributionGroup = payload => ({
    type: DistributionGroupActions.EMPTY_DISTRIBUTION_GROUP,
    payload,
  })
  static emptyThemesDistributionGroup = payload => ({
    type: DistributionGroupActions.EMPTY_THEMES_DISTRIBUTION_GROUP,
    payload,
  })
  static emptyContentsDistributionGroup = payload => ({
    type: DistributionGroupActions.EMPTY_CONTENTS_DISTRIBUTION_GROUP,
    payload,
  })
  static addUserForm = payload => ({
    type: DistributionGroupActions.ADD_USER_FORM,
    payload,
  })
  static removeUserForm = payload => ({
    type: DistributionGroupActions.REMOVE_USER_FORM,
    payload,
  })
  static removeUsersForm = () => ({
    type: DistributionGroupActions.REMOVE_USERS_FORM,
  })
  static removeStudentGoups = payload => ({
    type: DistributionGroupActions.REMOVE_STUDENT_GROUPS,
    payload,
  })
  static addAttachContent = payload => ({
    type: DistributionGroupActions.ADD_ATTACH_CONTENT,
    payload,
  })
  static addAttachContentSuccess = payload => ({
    type: DistributionGroupActions.ADD_ATTACH_CONTENT_SUCCESS,
    payload,
  })
  static removeAttachContent = payload => ({
    type: DistributionGroupActions.REMOVE_ATTACH_CONTENT,
    payload,
  })
  static resetAttachContent = () => ({
    type: DistributionGroupActions.RESET_ATTACH_CONTENT,
  })
  static uploadCoverAttachContent = payload => ({
    type: DistributionGroupActions.UPLOAD_COVER_ATTACH_CONTENT,
    payload,
  })
  static uploadCoverAttachContentSuccess = payload => ({
    type: DistributionGroupActions.UPLOAD_COVER_ATTACH_CONTENT_SUCCESS,
    payload,
  })
  static uploadFileAttachContent = payload => ({
    type: DistributionGroupActions.UPLOAD_FILE_ATTACH_CONTENT,
    payload,
  })
  static uploadFileAttachContentSuccess = payload => ({
    type: DistributionGroupActions.UPLOAD_FILE_ATTACH_CONTENT_SUCCESS,
    payload,
  })
  static resetFileAttachContent = () => ({
    type: DistributionGroupActions.RESET_FILE_ATTACH_CONTENT,
  })
  static updateGroup = payload => ({
    type: DistributionGroupActions.UPDATE_GROUP,
    payload,
  })
  static updateGroupSuccess = payload => ({
    type: DistributionGroupActions.UPDATE_GROUP_SUCCESS,
    payload,
  })
  static updateGroupFailure = payload => ({
    type: DistributionGroupActions.UPDATE_GROUP_FAILURE,
    payload,
  })
}
