// @dynamic
export class LoadingActions {
  static LOADING_SITE = '[loading] LOADING_SITE'

  static loadingSite = payload => ({
    type: LoadingActions.LOADING_SITE,
    payload,
  })
}
