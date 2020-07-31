import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import User from '@common/model/user'
import { useUsers } from '@webapp/store/users'

import style from './UserMentions.scss'
import { onKeyUp } from './events'
import UserMention from './UserMention'

const numberUsersMax = 6

const UserMentions = (props) => {
  const { left, top, itemFocusIndex, mention, onSelect, setUserMentionsProps } = props

  const userMentionsRef = useRef(null)

  const users = useUsers()
  let usersFiltered = mention === '' ? users : users.filter(User.matches(mention))
  // shows max 6 users
  usersFiltered = usersFiltered.slice(0, numberUsersMax)

  // on itemFocusIndex update, set the focus to respective button
  useEffect(() => {
    if (itemFocusIndex >= 0) {
      userMentionsRef.current.children[itemFocusIndex].focus()
    }
  }, [itemFocusIndex])

  return (
    <div
      id="user-mentions"
      ref={userMentionsRef}
      className={style.userMentions}
      role="menuitem"
      tabIndex={0}
      style={{ left: `${left}px`, top: `${top}px` }}
      onKeyUp={onKeyUp({ itemFocusIndex, numberUsers: usersFiltered.length, numberUsersMax, setUserMentionsProps })}
    >
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
  itemFocusIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  setUserMentionsProps: PropTypes.func.isRequired,
}

export default UserMentions
