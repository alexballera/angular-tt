import { EjabberdActions } from '../actions';

export function ejabberd(state = [], action) {
  switch (action.type) {
    case EjabberdActions.CREATE_CHAT_USER_SUCCESS:
      return state.concat([action.payload]);
    case EjabberdActions.CREATE_CHAT_USER_FAILURE:
      return [];
    default:
      return state;
  }
}
