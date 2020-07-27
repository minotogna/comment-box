/**
 * Creates the onKeyUp event handler.
 * Used to let users navigate with keyboard arrow keys.
 *
 * @param {object} params - The function parameters.
 * @param {number} params.itemFocusIndex - The current item focused index.
 * @param {Function} params.setUserMentionsProps - UserMentionsProps setter.
 * @param {number} params.numberUsers - The current number of displayed users.
 * @param {number} params.numberUsersMax - The maximum number of users allowed to display.
 *
 * @returns {Function} - The event handler.
 */
export const onKeyUp = ({ itemFocusIndex, setUserMentionsProps, numberUsers, numberUsersMax }) => (event) => {
  const { key } = event

  let itemFocusIndexUpdated = null
  if (['ArrowDown', 'ArrowRight'].includes(key)) itemFocusIndexUpdated = itemFocusIndex + 1
  if (['ArrowUp', 'ArrowLeft'].includes(key)) itemFocusIndexUpdated = itemFocusIndex - 1

  if (itemFocusIndexUpdated !== null) {
    const numberUsersCurrent = Math.min(numberUsersMax, numberUsers)

    if (itemFocusIndexUpdated < 0) itemFocusIndexUpdated = numberUsersCurrent - 1
    if (itemFocusIndexUpdated >= numberUsersCurrent) itemFocusIndexUpdated = 0

    setUserMentionsProps((userMentionsPropPrev) => ({
      ...userMentionsPropPrev,
      itemFocusIndex: itemFocusIndexUpdated,
    }))
  }
}
