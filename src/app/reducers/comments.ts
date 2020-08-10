import {CommentsActions} from '../actions';

export function comments(state = {comments: []}, { type, payload }) {
  switch (type) {
    case CommentsActions.GET_COMMENTS_SUCCESS:
      return payload;
    case CommentsActions.DELETE_COMMENT_SUCCESS:
      return {...state, comments: state.comments.filter(c => c._id !== payload)};
    case CommentsActions.CLEAR_LIST_COMMENTS:
      return {};
    default:
      return state;
  }
}
