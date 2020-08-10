import { ResourcesActions } from '../actions'

export function previewResource(state: any = null, { type, payload }) {
  switch (type) {
    case ResourcesActions.PREVIEW_RESOURCE:
      return payload
    case ResourcesActions.GET_RESOURCE_SUCCESS:
      return payload
    default:
      return state
  }
}

export function editableResource(state: any = null, { type, payload }) {
  switch (type) {
    case ResourcesActions.PREVIEW_RESOURCE:
      return payload
    case ResourcesActions.GET_RESOURCE_SUCCESS:
      return payload
    case ResourcesActions.TOGGLE_ASSET_SELECTION:
      return {
        ...state,
        assets: payload,
      }
    default:
      return state
  }
}
