/**
 * @typedef {object} User
 *
 * @property {string} avatar_url - The avatar url.
 * @property {string} name - The name.
 * @property {string} username - The username.
 */

export const keys = {
  avatar_url: 'avatar_url',
  name: 'name',
  username: 'username',
}

/**
 * User avatarUrl getter.
 *
 * @param {User} user - The user.
 *
 * @returns {string} - The avatar url.
 */
export const getAvatarUrl = (user) => user[keys.avatar_url]

/**
 * User name getter.
 *
 * @param {User} user - The user.
 *
 * @returns {string} - The name.
 */
export const getName = (user) => user[keys.name]

/**
 * User username getter.
 *
 * @param {User} user - The user.
 *
 * @returns {string} - The username.
 */
export const getUsername = (user) => user[keys.username]

/**
 * Checks whether the given searchString is included in the name or username.
 * The search is case insensitive.
 *
 * @param {string} searchString - The searchString.
 *
 * @returns {boolean} - True if the searchString is included in the name or username; false otherwise.
 */
export const matches = (searchString = '') => (user) => {
  const search = searchString.toLowerCase()
  const name = getName(user).toLowerCase()
  const username = getUsername(user).toLowerCase()
  return name.indexOf(search) >= 0 || username.indexOf(search) >= 0
}
