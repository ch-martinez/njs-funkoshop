const express = require('express')
const router = express.Router()
const userPanelController = require('../controllers/userPanelController')
const authAuthorization = require('../middlewares/authAuthorization')


router.get('/', authAuthorization.userAuthorize, userPanelController.userPanelView)

module.exports = router