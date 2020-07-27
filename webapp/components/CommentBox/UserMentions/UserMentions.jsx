import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import User from '@common/model/user'
import { useUsers } from '@webapp/store/users'

import style from './UserMentions.scss'
import UserMention from './UserMention'

const UserMentions = (props) => {
  const { left, top, mention, onSelect } = props

  const userMentionsRef = useRef(null)

  const users = useUsers()
  let usersFiltered = mention === '' ? users : users.filter(User.matches(mention))
  // shows max 6 users
  usersFiltered = usersFiltered.slice(0, 6)

  useEffect(() => {
    if (usersFiltered.length > 0) {
      userMentionsRef.current.children[0].focus()
    }
  }, [usersFiltered])

  return (
    <div ref={userMentionsRef} className={style.userMentions} style={{ left: `${left}px`, top: `${top}px` }}>
      {usersFiltered.map((user) => (
        <UserMention key={User.getUsername(user)} user={user} onSelect={onSelect} />
      ))}
    </div>
  )
}

UserMentions.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  mention: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default UserMentions
