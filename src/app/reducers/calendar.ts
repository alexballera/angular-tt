import { combineReducers } from '@ngrx/store';
import { addMonths, addWeeks } from 'date-fns';
import { CalendarActions } from '../actions';

function selectedDate (state = new Date(), { type, payload }) {
  switch (type) {
    case CalendarActions.SET_DATE:
      return payload;
    case CalendarActions.INCREMENT_MONTH:
      return addMonths(state, 1);
    case CalendarActions.DECREMENT_MONTH:
      return addMonths(state, -1);
    case CalendarActions.INCREMENT_WEEK:
      return addWeeks(state, 1);
    case CalendarActions.DECREMENT_WEEK:
      return addWeeks(state, -1);
    default:
      return state;
  }
}

function view (state = 'week', { type, payload }) {
  switch (type) {
    case CalendarActions.SET_VIEW:
      return payload;
    default:
      return state;
  }
}

function weekDays (state = [0, 1, 2, 3, 4, 5, 6], { type, payload }) {
  return state;
}

function weekStartsOn (state = 1, {}) {
  return state;
}

export const calendar = combineReducers({ selectedDate, view, weekDays, weekStartsOn });
