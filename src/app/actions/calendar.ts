export class CalendarActions {
  static SET_VIEW = '[Calendar] SET_VIEW';
  static SET_DATE = '[Calendar] SET_DATE';
  static INCREMENT_MONTH = '[Calendar] INCREMENT_MONTH';
  static DECREMENT_MONTH = '[Calendar] DECREMENT_MONTH';
  static INCREMENT_WEEK = '[Calendar] INCREMENT_WEEK';
  static DECREMENT_WEEK = '[Calendar] DECREMENT_WEEK';

  static setView = payload => ({ type: CalendarActions.SET_VIEW, payload });
  static setDate = (payload: Date) => ({ type: CalendarActions.SET_DATE, payload });
  static incrementMonth = () => ({ type: CalendarActions.INCREMENT_MONTH });
  static decrementMonth = () => ({ type: CalendarActions.DECREMENT_MONTH });
  static incrementWeek = () => ({ type: CalendarActions.INCREMENT_WEEK });
  static decrementWeek = () => ({ type: CalendarActions.DECREMENT_WEEK });
}
