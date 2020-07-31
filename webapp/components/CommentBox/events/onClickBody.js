/**
 * Creates the onClick body event handler.
 * It closes the userMentions dialog when user clicks outside the commentBox element.
 *
 * @param {object} params - Function params.
 * @param {Element} params.commentBox - CommentBox dom element.
 * @param {Function} params.setUserMentionsProps - UserMentions props setter.
 *
 * @returns {Function} - Event handler.
 */
export const onClickBody = ({ commentBox, setUserMentionsProps }) => (event) => {
  if (!commentBox.contains(event.target)) {
    setUserMentionsProps(null)
  }
}
