const { Router } = require('express')

const { UserApi } = require('./modules/user')

const router = Router()
UserApi.init(router)

module.exports = router
