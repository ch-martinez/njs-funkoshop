const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shopController')

router.get('/', shopController.shopView)
router.get('/item/:id', shopController.productView)
router.post('/cart', shopController.cartView)


router.get('/admin', (req,res) => {
    res.render('pages/admin/admin.ejs',{ layout: '../views/layouts/adminLayout' })
})

module.exports = router