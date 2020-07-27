import React from 'react'
import PropTypes from 'prop-types'

import User from '@common/model/user'

import style from './UserMention.scss'

const UserMention = (props) => {
  const { user, onSelect } = props

  return (
    <button type="button" className={style.userMention} onClick={() => onSelect(user)}>
      <img className={style.avatar} src={User.getAvatarUrl(user)} alt="" />
      <span className={style.username}>{User.getUsername(user)}</span>
      <span className={style.name}>{User.getName(user)}</span>
    </button>
  )
}

UserMention.propTypes = {
  user: PropTypes.shape({
    [User.keys.avatar_url]: PropTypes.string,
    [User.keys.name]: PropTypes.string,
    [User.keys.username]: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default UserMention
