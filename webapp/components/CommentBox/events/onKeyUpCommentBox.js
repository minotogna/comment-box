/**
 * Creates the onKeyUp commentBox event handler.
 * It closes the userMentions dialog when `Escape` character is pressed.
 *
 * @param {object} params - Function params.
 * @param {{left: number, top: number, mention: string}} params.userMentionsProps - UserMentions props.
 * @param {Function} params.setUserMentionsProps - UserMentions props setter.
 * @param {Element} params.input - The input element.
 *
 * @returns {Function} - Event handler.
 */

export const onKeyUpCommentBox = ({ userMentionsProps, setUserMentionsProps, input }) => (event) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()

    // close userMentions dialog
    setUserMentionsProps(null)

    // restore cursor at previous position
    // eslint-disable-next-line no-param-reassign
    input.selectionStart = userMentionsProps.indexEnd
    // eslint-disable-next-line no-param-reassign
    input.selectionEnd = userMentionsProps.indexEnd

    // focus on textarea
    input.focus()
  }
}
