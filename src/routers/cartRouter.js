const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const authAuthorization = require('../middlewares/authAuthorization')

router.get('/', authAuthorization.userAuthorize, authAuthorization.isLoggedCart, cartController.cartView)
router.post('/', authAuthorization.isLoggedCart, cartController.cartViewPost)
router.get('/checkout', authAuthorization.userAuthorize, authAuthorization.isLoggedCart, cartController.checkoutView)

module.exports = router