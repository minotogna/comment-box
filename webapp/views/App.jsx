import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import CommentBox from '@webapp/components/CommentBox'
import { UsersActions } from '@webapp/store/users'

import style from './App.scss'

const App = () => {
  const dispatch = useDispatch()

  // on App mount, init users (assuming users can be pre-fetched)
  useEffect(() => {
    dispatch(UsersActions.initUsers())
  }, [])

  return (
    <div className={style.app}>
      <h2>Please leave a comment</h2>
      <CommentBox />
    </div>
  )
}

export default App
