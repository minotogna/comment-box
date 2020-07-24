import React from 'react'

import CommentBox from '@webapp/components/CommentBox'

import style from './App.scss'

const App = () => {
  return (
    <div className={style.app}>
      <h2>Please leave a comment</h2>
      <CommentBox />
    </div>
  )
}

export default App
