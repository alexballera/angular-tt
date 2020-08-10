export class CurriculaActions {
  static GET_CURRICULA = '[Curricula] GET_CURRICULA';
  static SUCCES_CURRICULA = '[Curricula] SUCCES_CURRICULA';
  static FAILURE_CURRICULA = '[Curricula] FAILURE_CURRICULA';
  static SET_THEMES_SUCCESS = '[Curricula] SET_THEMES_SUCCESS';
  static IMPORT_CURRICULA = '[Curricula] IMPORT_CURRICULA';
  static SHOW_ERROR_CURRICULA = '[Curricula] SHOW_ERROR_CURRICULA';

  static getCurricula = payload => ({ type: CurriculaActions.GET_CURRICULA, payload});
  static getCurriculaSucces = payload => ({ type: CurriculaActions.SUCCES_CURRICULA, payload});
  static getCurriculaFailure = payload => ({ type: CurriculaActions.FAILURE_CURRICULA, payload});
  static setThemesSuccess = payload => ({ type: CurriculaActions.SET_THEMES_SUCCESS, payload });
  static importCurricula = payload => ({ type: CurriculaActions.IMPORT_CURRICULA, payload });
  static showErrorCurricula = payload => ({ type: CurriculaActions.SHOW_ERROR_CURRICULA, payload });
}
