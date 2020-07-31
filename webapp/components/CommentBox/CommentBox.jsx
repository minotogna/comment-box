import React, { useLayoutEffect, useRef, useState } from 'react'

import style from './CommentBox.scss'
import { onClickBody, onKeyUpCommentBox, onKeyUpTextarea, onSelectUser } from './events'
import UserMentions from './UserMentions'

const CommentBox = () => {
  const [userMentionsProps, setUserMentionsProps] = useState(null)

  const commentBoxRef = useRef(null)
  const textareaRef = useRef(null)

  // onMount add body onClick event listener.
  useLayoutEffect(() => {
    const onClick = onClickBody({ commentBox: commentBoxRef.current, setUserMentionsProps })
    document.body.addEventListener('click', onClick)

    // onUnmount remove body onClick event listener.
    return () => {
      document.body.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div
      ref={commentBoxRef}
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
