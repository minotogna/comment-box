import React, { useRef, useState } from 'react'

import style from './CommentBox.scss'
import { onKeyUpCommentBox, onKeyUpTextarea, onSelectUser } from './events'
import UserMentions from './UserMentions'

const CommentBox = () => {
  const [userMentionsProps, setUserMentionsProps] = useState(null)

  const textareaRef = useRef(null)

  return (
    <div
      className={style.commentBox}
      role="textbox"
      tabIndex={0}
      onKeyUp={onKeyUpCommentBox({ userMentionsProps, setUserMentionsProps, input: textareaRef.current })}
    >
      <textarea
        ref={textareaRef}
        className={style.textarea}
        placeholder="Leave a comment"
        onKeyUp={onKeyUpTextarea({ userMentionsProps, setUserMentionsProps })}
      />

      {userMentionsProps && (
        <UserMentions
          mention={userMentionsProps.mention}
          left={userMentionsProps.left}
          top={userMentionsProps.top}
          itemFocusIndex={userMentionsProps.itemFocusIndex}
          onSelect={onSelectUser({ input: textareaRef.current, userMentionsProps, setUserMentionsProps })}
          setUserMentionsProps={setUserMentionsProps}
        />
      )}
    </div>
  )
}

export default CommentBox
