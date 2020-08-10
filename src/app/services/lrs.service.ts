import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { LrsClient } from '@ticmas/common-services'
import { State } from './../reducers'

@Injectable({
  providedIn: 'root',
})
export class LrsService {
  constructor(
    @Inject('ENV') private environment,
    private store: Store<State>,
    private httpClient: HttpClient
  ) {}

  getSingleStatement(auth, statement) {
    return new LrsClient(
      this.environment.lrs.endpoint,
      this.httpClient
    ).getStatement(
      {
        Authorization: auth,
        'X-Experience-API-Version': this.environment.lrs.auth
          .xExperienceApiVersion,
      },
      {
        statementId: statement,
      }
    )
  }

  getStatements(auth, params) {
    return new LrsClient(
      this.environment.lrs.endpoint,
      this.httpClient
    ).getStatements(
      {
        Authorization: auth,
        'X-Experience-API-Version': this.environment.lrs.auth
          .xExperienceApiVersion,
      },
      params
    )
  }

  storeStatements(auth, statements, params?: {}) {
    return new LrsClient(
      this.environment.lrs.endpoint,
      this.httpClient
    ).postStatement(
      {
        Authorization: auth,
        'X-Experience-API-Version': this.environment.lrs.auth
          .xExperienceApiVersion,
        'Content-Type': 'application/json',
      },
      params,
      statements
    )
  }

  updateStatements(auth, statementId, data) {
    return new LrsClient(
      this.environment.lrs.endpoint,
      this.httpClient
    ).putStatement(
      {
        Authorization: auth,
        'X-Experience-API-Version': this.environment.lrs.auth
          .xExperienceApiVersion,
        'Content-Type': 'application/json',
      },
      statementId,
      data
    )
  }

  voidStatements(auth, test) {
    const statements = []
    Object.entries(test.results)
      .filter(([student, result]) => !!result['lrsId'])
      .forEach(([student, result]) => {
        statements.push({
          actor: {
            name: student,
            account: {
              homePage: 'http://bidi.com',
              name: student,
            },
          },
          verb: {
            id: 'http://adlnet.gov/expapi/verbs/voided',
            display: { und: 'voided' },
          },
          object: {
            objectType: 'StatementRef',
            id: result['lrsId'],
          },
        })
      })
    return this.storeStatements(auth, statements)
  }
}
