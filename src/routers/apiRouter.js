const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')
const authAuthorization = require('../middlewares/authAuthorization')

router.get('/getCart', authAuthorization.isLoggedCart, apiController.getCart)
router.get('/getProductsTotalQuantity', authAuthorization.isLoggedCart, apiController.getProductsTotalQuantity)
router.post('/addProduct', authAuthorization.isLoggedCart, apiController.addProductToCart)
router.post('/updateProduct', authAuthorization.isLoggedCart, apiController.addProductToCart)
router.post('/deletProduct', authAuthorization.isLoggedCart, apiController.deletProductInCart)

module.exports = router