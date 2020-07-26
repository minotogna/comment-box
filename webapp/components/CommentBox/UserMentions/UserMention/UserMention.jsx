import React from 'react'
import PropTypes from 'prop-types'

import style from './UserMention.scss'

const UserMention = (props) => {
  const { user } = props

  return (
    <button type="button" className={style.userMention} onClick={() => {}}>
      {user.name}
    </button>
  )
}

UserMention.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

export default UserMention
