const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/', adminController.adminView)

// Productos
router.get('/products', adminController.productsView)
router.get('/product/add', adminController.productAddView)
router.get('/product/edit/:id', adminController.productEditView)

//Colecciones
router.get('/collections', adminController.collectionsView)
router.get('/collection/add', adminController.collectionAddView)
router.get('/collection/edit/:id', adminController.collectionEditView)
router.get('/collections/home', adminController.collectionsHomeView)
router.post('/collections/home', adminController.collectionsHomeUpdate)

//Proveedores
router.get('/providers', adminController.providersView)
router.get('/provider/add', adminController.providerAddView)
router.get('/provider/edit/:id', adminController.providerEditView)

//Usuarios
router.get('/users', adminController.usersViews)

module.exports = router