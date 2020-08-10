import {BidiActions} from '../actions';

export function bidi(state = null, { type, payload }) {
  switch (type) {
    case BidiActions.GET_TOKEN_SUCCESS:
      return payload;
    case BidiActions.GET_TOKEN_FAILURE:
      return null;
    default:
      return state;
  }
}
