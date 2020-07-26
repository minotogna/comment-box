import React, { useRef, useState } from 'react'

import style from './CommentBox.scss'
import { onKeyUp } from './events'
import UserMentions from './UserMentions'

const CommentBox = () => {
  const textareaRef = useRef(null)
  const [userMentionsProps, setUserMentionsProps] = useState(null)

  return (
    <div className={style.commentBox}>
      <textarea
        ref={textareaRef}
        className={style.textarea}
        placeholder="Leave a comment"
        onKeyUp={onKeyUp({ userMentionsProps, setUserMentionsProps })}
      />

      {userMentionsProps && (
        <UserMentions mention={userMentionsProps.mention} left={userMentionsProps.left} top={userMentionsProps.top} />
      )}
    </div>
  )
}

export default CommentBox
