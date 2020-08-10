import { combineReducers } from '@ngrx/store';
import { PlanningActions } from '../actions';

function libraryOpen (state = false, { type, payload }) {
  switch (type) {
    case PlanningActions.SHOW_LIBRARY:
      return payload;
    default:
      return state;
  }
}

export const planning = combineReducers({ libraryOpen });
