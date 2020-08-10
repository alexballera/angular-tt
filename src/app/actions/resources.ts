export class ResourcesActions {
  static SAVE_RESOURCE_CUSTOM_RM = '[Resources] SAVE_RESOURCE_CUSTOM_RM'
  static SAVE_RESOURCE_CUSTOM_S3 = '[Resources] SAVE_RESOURCE_CUSTOM_S3'
  static SAVE_RESOURCE_CUSTOM_CDMS = '[Resources] SAVE_RESOURCE_CUSTOM_CDMS'
  static UPDATE_RESOURCE_CUSTOM_RM = '[Resources] UPDATE_RESOURCE_CUSTOM_RM'
  static PUBLISH_RESOURCE_CUSTOM_RM = '[Resources] PUBLISH_RESOURCE_CUSTOM_RM'
  static SAVE_RESOURCE_CUSTOM_SUCCESS =
    '[Resources] SAVE_RESOURCE_CUSTOM_SUCCESS'
  static SAVE_RESOURCE_CUSTOM_FAILURE =
    '[Resources] SAVE_RESOURCE_CUSTOM_FAILURE'
  static PREVIEW_RESOURCE = '[Resources] PREVIEW_RESOURCE'
  static TOGGLE_ASSET_SELECTION = '[Resources] TOGGLE_ASSET_SELECTION'
  static GET_RESOURCE = '[Resource] GET_RESOURCE'
  static GET_RESOURCE_SUCCESS = '[Resource] GET_RESOURCE_SUCCESS'
  static GET_RESOURCE_FAILURE = '[Resource] GET_RESOURCE_FAILURE'

  static saveResourceCustomRm = payload => ({
    type: ResourcesActions.SAVE_RESOURCE_CUSTOM_RM,
    payload,
  })
  static saveResourceCustomS3 = payload => ({
    type: ResourcesActions.SAVE_RESOURCE_CUSTOM_S3,
    payload,
  })
  static saveResourceCustomCdms = payload => ({
    type: ResourcesActions.SAVE_RESOURCE_CUSTOM_CDMS,
    payload,
  })
  static updateResourceCustomRm = payload => ({
    type: ResourcesActions.UPDATE_RESOURCE_CUSTOM_RM,
    payload,
  })
  static publishResourceCustomRm = payload => ({
    type: ResourcesActions.PUBLISH_RESOURCE_CUSTOM_RM,
    payload,
  })
  static saveResourceCustomSuccess = payload => ({
    type: ResourcesActions.SAVE_RESOURCE_CUSTOM_SUCCESS,
    payload,
  })
  static saveResourceCustomFailure = payload => ({
    type: ResourcesActions.SAVE_RESOURCE_CUSTOM_FAILURE,
    payload,
  })
  static previewResource = payload => ({
    type: ResourcesActions.PREVIEW_RESOURCE,
    payload,
  })
  static getResource = payload => ({
    type: ResourcesActions.GET_RESOURCE,
    payload,
  })
  static getResourceSuccess = payload => ({
    type: ResourcesActions.GET_RESOURCE_SUCCESS,
    payload,
  })
  static getResourceFailure = payload => ({
    type: ResourcesActions.GET_RESOURCE_FAILURE,
    payload,
  })
  static toggleAssetSelection = (payload: any[]) => ({
    type: ResourcesActions.TOGGLE_ASSET_SELECTION,
    payload,
  })
}
