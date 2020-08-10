export class BidiActions {
    static GET_TOKEN = '[Bidi] GET_TOKEN';
    static GET_TOKEN_SUCCESS = '[Bidi] GET_TOKEN_SUCCESS';
    static GET_TOKEN_FAILURE = '[Bidi] GET_TOKEN_FAILURE';


    static getToken = () => ({ type: BidiActions.GET_TOKEN });
    static getTokenSuccess = (payload) => ({ type: BidiActions.GET_TOKEN_SUCCESS, payload });
    static getTokenFailure = (payload) => ({ type: BidiActions.GET_TOKEN_FAILURE, payload });
  }
