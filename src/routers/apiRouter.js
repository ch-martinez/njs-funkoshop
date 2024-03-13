const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')

router.post('/addProduct', apiController.addProductToCartInDB)
router.post('/updateProduct', apiController.updateProductInCartDB)
router.post('/updateCart', apiController.updateCartDB)
router.post('/deletProduct', apiController.deletProductInCartDB)


module.exports = router