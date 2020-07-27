import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import User from '@common/model/user'
import { useUsers } from '@webapp/store/users'

import style from './UserMentions.scss'
import UserMention from './UserMention'

const UserMentions = (props) => {
  const { left, top, mention, onSelect } = props

  const userMentionsRef = useRef(null)

  const users = useUsers()
  let usersFiltered = mention !== '' ? users.filter(User.matches(mention)) : users
  // shows max 6 users
  usersFiltered = usersFiltered.slice(0, 6)

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
