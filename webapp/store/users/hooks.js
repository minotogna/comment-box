import { useSelector } from 'react-redux'

import * as UsersState from './state'

export const useUsers = () => useSelector(UsersState.getUsers)
