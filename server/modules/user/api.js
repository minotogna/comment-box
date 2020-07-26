const { Router } = require('express')

const userData = require('./UserData.json')

/**
 * Initialize the user api.
 *
 * @param {Router} router - The express router.
 */
const init = (router) => {
  router.get('/users', (req, res) => {
    res.json(userData)
  })
}

module.exports = {
  init,
}
