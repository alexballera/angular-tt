export class EjabberdActions {
    static CREATE_CHAT_USER = '[chatuser] CREATE_CHAT_USER';
    static CREATE_CHAT_USER_SUCCESS = '[chatuser] CREATE_CHAT_USER_SUCCESS';
    static CREATE_CHAT_USER_FAILURE = '[chatuser] CREATE_CHAT_USER_FAILURE';

    static createChatUser = (payload) => ({
        type: EjabberdActions.CREATE_CHAT_USER,
        payload
    })

    static createChatUserSuccess = payload => ({
        type: EjabberdActions.CREATE_CHAT_USER_SUCCESS,
        payload
    })

    static createChatUserFailure = payload => ({
        type: EjabberdActions.CREATE_CHAT_USER_FAILURE,
        payload
    })
}
