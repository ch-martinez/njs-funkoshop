const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const authAuthorization = require('../middlewares/authAuthorization')

router.get('/', authAuthorization.adminAuthorize, adminController.adminView)

// Productos
router.get('/products', authAuthorization.adminAuthorize, adminController.productsView)
router.get('/product/add', authAuthorization.adminAuthorize, adminController.productAddView)
router.get('/product/edit/:id', authAuthorization.adminAuthorize, adminController.productEditView)
router.post('/product/edit/:id', authAuthorization.adminAuthorize, adminController.productEdit)
router.get('/product/detail/:id', authAuthorization.adminAuthorize, adminController.productDetailView)

//Colecciones
router.get('/collections', authAuthorization.adminAuthorize, adminController.collectionsView)
router.get('/collection/add', authAuthorization.adminAuthorize, adminController.collectionAddView)
router.get('/collection/edit/:id', authAuthorization.adminAuthorize, adminController.collectionEditView)
router.post('/collection/edit/:id', authAuthorization.adminAuthorize, adminController.collectionEdit)
router.get('/collection/detail/:id', authAuthorization.adminAuthorize, adminController.collectionDetailView)
router.get('/collections/home', authAuthorization.adminAuthorize, adminController.collectionsHomeView)
router.post('/collections/home', authAuthorization.adminAuthorize, adminController.collectionsHomeUpdate)

//Proveedores
router.get('/providers', authAuthorization.adminAuthorize, adminController.providersView)
router.get('/provider/add', authAuthorization.adminAuthorize, adminController.providerAddView)
router.get('/provider/edit/:id', authAuthorization.adminAuthorize, adminController.providerEditView)
router.post('/provider/edit/:id', authAuthorization.adminAuthorize, adminController.providerEdit)
router.get('/provider/detail/:id', authAuthorization.adminAuthorize, adminController.providerDetailView)

//Usuarios
router.get('/users', authAuthorization.adminAuthorize, adminController.usersViews)

module.exports = router

