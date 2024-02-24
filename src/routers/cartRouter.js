const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.get('/',cartController.cartView)
router.post('/',cartController.cartViewPost)

module.exports = router