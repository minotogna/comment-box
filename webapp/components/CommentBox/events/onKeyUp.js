import DOMUtils from '@webapp/utils/dom'

/**
 * Extracts the user mention between @ and space or new line.
 *
 * @param {Element} target - The target element to extract the mention from.
 *
 * @returns {{mention:string, indexStart:number, indexEnd:number}|null} - Returns the user mentions if text starts with @, null otherwise.
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
    if (triggerChar && (indexStart === 0 || isBlank(indexStart - 1))) {
      indexStart += 1
      break
    }
    // index start not found
    if (isBlank(indexStart) || (indexStart === 0 && !triggerChar)) return null
  }

  for (; indexEnd < value.length; indexEnd += 1) {
    if (isBlank(indexEnd)) break
  }

  return {
    indexStart,
    indexEnd,
    mention: value.substring(indexStart, indexEnd),
  }
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
  const { key, target } = event
  const mention = getMention({ target })

  if (userMentionsProps && key === 'ArrowDown') {
    // userMentions dialog is opened and user presses keyboard ArrowDown to move focus to users
    setUserMentionsProps((userMentionsPropsPrev) => ({ ...userMentionsPropsPrev, itemFocusIndex: 0 }))
  } else if (mention === null || key === 'Escape') {
    // close userMentions dialog
    setUserMentionsProps(null)
  } else if (userMentionsProps) {
    // userMentions dialog already opened: need to pass the updated mention and indexEnd only
    setUserMentionsProps((userMentionsPrev) => ({
      ...userMentionsPrev,
      mention: mention.mention,
      indexEnd: mention.indexEnd,
    }))
  } else if (!userMentionsProps) {
    // opening userMentions dialog for the first time: need to pass left, top coordinates and mention
    const { top, left } = DOMUtils.getCaretCoordinates(target, mention.indexStart)
    setUserMentionsProps({ left: left - 10, top: top + 20, itemFocusIndex: -1, ...mention })
  }
}
