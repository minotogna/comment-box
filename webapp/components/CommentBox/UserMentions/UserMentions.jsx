import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import style from './UserMentions.scss'
import UserMention from './UserMention'

const UserMentions = (props) => {
  const { left, top, mention } = props

  const userMentionsRef = useRef(null)
  useEffect(() => {
    userMentionsRef.current.focus()
  }, [])

  return (
    <div ref={userMentionsRef} className={style.userMentions} style={{ left: `${left}px`, top: `${top}px` }}>
      {[0, 1, 2, 3, 4, 5].map((num) => (
        <UserMention key={num} user={{ name: mention }} />
      ))}
    </div>
  )
}

UserMentions.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  mention: PropTypes.string.isRequired,
}

export default UserMentions
