export class CommentsActions {
  static GET_COMMENTS = '[Comments] GET_COMMENTS';
  static GET_COMMENTS_SUCCESS = '[Comments] GET_COMMENTS_SUCCESS';
  static SAVE_COMMENT =  '[Comments] SAVE_COMMENT';
  static SAVE_COMMENT_SUCCESS = '[Comments] SAVE_COMMENT_SUCCESS';
  static UPDATE_COMMENT = '[Comments] UPDATE_COMMENT';
  static DELETE_COMMENT = '[Comments] DELETE_COMMENT';
  static DELETE_COMMENT_SUCCESS = '[Comments] DELETE_COMMENT_SUCCESS';
  static CLEAR_LIST_COMMENTS = '[Comments] CLEAR_LIST_COMMENTS';

  static getComments = payload => ({ type: CommentsActions.GET_COMMENTS, payload });
  static getCommentsSuccess = payload => ({ type: CommentsActions.GET_COMMENTS_SUCCESS, payload });
  static saveComment = payload => ({ type: CommentsActions.SAVE_COMMENT, payload });
  static saveCommentSuccess = payload => ({ type: CommentsActions.SAVE_COMMENT_SUCCESS, payload });
  static updateComment = payload => ({ type: CommentsActions.UPDATE_COMMENT, payload });
  static deleteComment = payload => ({ type: CommentsActions.DELETE_COMMENT, payload });
  static deleteCommentSuccess = payload => ({ type: CommentsActions.DELETE_COMMENT_SUCCESS, payload });
  static clearListComments = () => ({ type: CommentsActions.CLEAR_LIST_COMMENTS });
}
