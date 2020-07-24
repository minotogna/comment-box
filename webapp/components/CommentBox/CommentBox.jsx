import React from 'react'

import style from './CommentBox.scss'

const CommentBox = () => {
  return (
    <div className={style.commentBox}>
      <textarea className={style.textarea} placeholder="Leave a comment" />
    </div>
  )
}

export default CommentBox
