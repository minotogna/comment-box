import DOMUtils from '@webapp/utils/dom'

/**
 * Extracts the user mention between @ and space or new line.
 *
 * @param {Element} target - The target element to extract the mention from.
 *
 * @returns {string|null} - Returns the user mentions if text starts with @, null otherwise.
 */
const getMention = ({ target }) => {
  const { selectionStart, value } = target

  // find indexes between @ and space or new line
  let indexStart = selectionStart - 1
  let indexEnd = selectionStart
  const isBlank = (index) => [' ', '\n'].includes(value[index])

  // caret is at the beginning of the target element
  if (indexStart < 0) return null

  for (; indexStart >= 0; indexStart -= 1) {
    const triggerChar = value[indexStart] === '@'
    // index start found
    if (triggerChar && (indexStart === 0 || isBlank(indexStart - 1))) break
    // index start not found
    if (isBlank(indexStart) || (indexStart === 0 && !triggerChar)) return null
  }

  for (; indexEnd < value.length; indexEnd += 1) {
    if (isBlank(indexEnd)) break
  }

  return value.substring(indexStart + 1, indexEnd)
}

/**
 * Creates the onKeyUp event handler.
 *
 * @param {object} params - Function params.
 * @param {{left: number, top: number, mention: string}} params.userMentionsProps - UserMentions props.
 * @param {Function} params.setUserMentionsProps - UserMentions props setter.
 *
 * @returns {Function} - Event handler.
 */
export const onKeyUp = ({ userMentionsProps, setUserMentionsProps }) => (event) => {
  const { target } = event
  const mention = getMention({ target })

  if (mention !== null && userMentionsProps) {
    // userMentions dialog already opened: need to pass the updated mention only
    setUserMentionsProps((userMentionsPrev) => ({ ...userMentionsPrev, mention }))
  } else if (mention !== null && !userMentionsProps) {
    // opening userMentions dialog for the first time: need to pass left, top coordinates and mention
    const { selectionStart } = target
    const { top, left } = DOMUtils.getCaretCoordinates(target, selectionStart)
    setUserMentionsProps({ left: left - 10, top: top + 20, mention })
  } else {
    // close userMentions dialog
    setUserMentionsProps(null)
  }
}
