const express = require('express')
const router = express.Router()
const {
    adminView,
    productsView,
    collectionsView,
    usersViews
} = require('../controllers/adminController')

router.get('/', adminView)
router.get('/products', productsView)
router.get('/collections', collectionsView)
router.get('/users', usersViews)

module.exports = router