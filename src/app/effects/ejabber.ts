import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EjabberdActions } from '../actions';

@Injectable()
export class EjabberdEffects {
  constructor (
    private actions$: Actions,
    private client: HttpClient,
    @Inject('ENV') private environment
  ) {
  }

  @Effect()
  createChatUser$ = this.actions$.pipe(
  ofType(EjabberdActions.CREATE_CHAT_USER),
  switchMap<any, any>(({payload}) => this.createChatUser(payload).pipe(
    switchMap(() => of(EjabberdActions.createChatUserSuccess(payload))),
    catchError(err => of(EjabberdActions.createChatUserSuccess(err.message)))
  )));

  createChatUser(payload) {
    return this.client.post(
      this.environment.apis.xmpp + '/register',
      { user: payload.user, password: '1234', host: this.environment.chat.host },
      { headers: { Authorization: '' }}
    );
  }
}
