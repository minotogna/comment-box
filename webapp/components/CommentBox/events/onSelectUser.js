import User from '@common/model/user'

/**
 * Creates the onSelectUser event handler.
 *
 * @param {object} params - Function params.
 * @param {Element} params.input - The input element.
 * @param {{left: number, top: number, mention: string}} params.userMentionsProps - UserMentions props.
 * @param {Function} params.setUserMentionsProps - UserMentions props setter.
 *
 * @returns {Function} - Event handler.
 */
export const onSelectUser = ({ input, userMentionsProps, setUserMentionsProps }) => (user) => {
  // close userMentions dialog
  setUserMentionsProps(null)

  // update text area value
  const { indexStart, indexEnd } = userMentionsProps
  const { value } = input
  const valueStart = value.substring(0, indexStart)
  const valueEnd = value.substring(indexEnd) || ' ' // add a space when selected user is last word
  const valueWithUsername = `${valueStart}${User.getUsername(user)}`
  // eslint-disable-next-line no-param-reassign
  input.value = `${valueWithUsername}${valueEnd}`

  // position caret at the end of selected user before re-focusing
  // eslint-disable-next-line no-param-reassign
  input.selectionStart = valueWithUsername.length + 1
  // eslint-disable-next-line no-param-reassign
  input.selectionEnd = valueWithUsername.length + 1
  input.focus()
}
