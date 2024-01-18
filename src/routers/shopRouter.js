const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shopController')

router.get('/', shopController.shopView)
router.get('/?c=', shopController.shopView)
router.get('/item/:id', shopController.productView)

module.exports = router