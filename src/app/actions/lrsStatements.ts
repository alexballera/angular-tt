export class LrsStatementsActions {

  static FETCH = '[LrsStatements] FETCH';
  static FETCH_SUCCESS = '[LrsStatements] FETCH_SUCCESS';
  static FETCH_FAILURE = '[LrsStatements] FETCH_FAILURE';

  static fetch = payload => ({ type: LrsStatementsActions.FETCH, payload });
  static fetchSuccess = payload => ({ type: LrsStatementsActions.FETCH_SUCCESS, payload });
  static fetchFailure = () => ({ type: LrsStatementsActions.FETCH_FAILURE });
}
