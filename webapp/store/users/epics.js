import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { map, switchMap } from 'rxjs/operators'

import * as UsersActions from './actions'

export const fetchUsers = (action$) =>
  action$.pipe(
    ofType(UsersActions.USERS_INIT),
    switchMap(() =>
      ajax.get('/api/users').pipe(map(({ response }) => ({ type: UsersActions.USERS_UPDATE, users: response })))
    )
  )
