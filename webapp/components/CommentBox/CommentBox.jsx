import React, { useRef, useState } from 'react'

import style from './CommentBox.scss'
import { onKeyUp, onSelectUser } from './events'
import UserMentions from './UserMentions'

const CommentBox = () => {
  const [userMentionsProps, setUserMentionsProps] = useState(null)

  const textareaRef = useRef(null)

  return (
    <div className={style.commentBox}>
      <textarea
        ref={textareaRef}
        className={style.textarea}
        placeholder="Leave a comment"
        onKeyUp={onKeyUp({ userMentionsProps, setUserMentionsProps })}
      />

      {userMentionsProps && (
        <UserMentions
          mention={userMentionsProps.mention}
          left={userMentionsProps.left}
          top={userMentionsProps.top}
          onSelect={onSelectUser({ input: textareaRef.current, userMentionsProps, setUserMentionsProps })}
        />
      )}
    </div>
  )
}

export default CommentBox
