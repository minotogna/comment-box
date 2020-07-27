import { exportReducer } from '@webapp/store/utils'

import * as UsersActions from './actions'
import * as UsersState from './state'

const actionHandlers = {
  [UsersActions.USERS_UPDATE]: (state, { users }) => users,
}

export default exportReducer(actionHandlers, UsersState.initialState)
