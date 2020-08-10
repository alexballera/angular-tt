import { combineReducers } from '@ngrx/store';
import {LrsStatementsActions} from '../actions';

function list(state = [], { type, payload }) {
  switch (type) {
    case LrsStatementsActions.FETCH_SUCCESS:
    return payload;

    case LrsStatementsActions.FETCH_FAILURE:
      return state;

    default:
      return state;
  }
}

export const lrsStatements = combineReducers({
  list
});
