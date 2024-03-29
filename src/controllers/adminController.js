const authModel = require('../models/authModel')
const productsModels = require('../models/productsModel')
const providersModel = require('../models/providersModel')
const collectionsModels = require('../models/collectionsModel')

const adminView = (req, res) => {
    res.render('pages/admin/admin', {layout: 'layouts/adminLayout'})
}

/* *******************************************************************
                            Products
******************************************************************* */

const productsView = async (req, res) => {
    const products = await productsModels.getAllProductsFromBD()
    res.render('pages/admin/productsAdmin', {products ,layout: 'layouts/adminLayout'})
}

const productAddView = async (req, res) => {
    const collections = await collectionsModels.getAllCollectionsFromBD()
    res.render('pages/admin/add/productAddView', {collections, layout: 'layouts/adminLayout'})
}

const productEditView = async (req, res) => {
    const collections = await collectionsModels.getAllCollectionsFromBD()
    const product = await productsModels.getProductByIDFromBD(req.params.id)
    res.render('pages/admin/edit/productEditView', {product, collections, layout: 'layouts/adminLayout'})
}

const productDetailView = async (req, res) => {
    const product = await productsModels.getProductDetailByIDFromBD(req.params.id)
    res.render('pages/admin/detail/productDetailView', {product, layout: 'layouts/adminLayout'})
}

/* *******************************************************************
                            Collections
******************************************************************* */

const collectionsView = async (req, res) => {
    const collections = await collectionsModels.getAllCollectionsFromBD()
    res.render('pages/admin/collectionsAdmin', {collections ,layout: 'layouts/adminLayout'})
}

const collectionAddView = async (req,res) => {
    res.render('pages/admin/add/collectionAddView', {layout: 'layouts/adminLayout'})
}

const collectionEditView = async (req, res) => {
    const [collection] = await collectionsModels.getCollectionByIDFromBD(req.params.id)
    res.render('pages/admin/edit/collectionEditView', {collection, layout: 'layouts/adminLayout'})
}

const collectionDetailView = async (req, res) => {
    const [collection] = await collectionsModels.getCollectionByIDFromBD(req.params.id)
    const products = await productsModels.getProductsByCollectionFromBD(req.params.id)
    res.render('pages/admin/detail/collectionDetailView', {collection, products, layout: 'layouts/adminLayout'})
}

const collectionsHomeView = async (req, res) => {
    const collections = await collectionsModels.getAllCollectionsHomeFromDB()
    const isCollectionHome = true
    res.render('pages/admin/collectionsHomeAdmin', { isCollectionHome, collections, layout: 'layouts/adminLayout'})
}

// Actualiza el listado de coleciones mostrados en home
const collectionsHomeUpdate = (req, res) => {
    req.body.forEach(collection => {
        collectionsModels.updateCollectionHome(collection)
    })
    res.status(200)
}

/* *******************************************************************
                            Users
******************************************************************* */

const usersViews = async (req, res) => {
    const users = await authModel.getAllUsersFromDB()
    res.render('pages/admin/usersAdmin', {users, layout: 'layouts/adminLayout'})
}

/* *******************************************************************
                            Providers
******************************************************************* */

const providersView = async (req, res) => {
    const providers = await providersModel.getAllProvidersFromDB()
    res.render('pages/admin/providersAdmin', {providers, layout: 'layouts/adminLayout'})
}

const providerAddView = async (req,res) => {
    res.render('pages/admin/add/providerAddView', {layout: 'layouts/adminLayout'})
}

const providerEditView = async (req, res) => {
    const [provider] = await providersModel.getProviderByIdFromDB(req.params.id)
    res.render('pages/admin/edit/providerEditView', {provider, layout: 'layouts/adminLayout'})
}

const providerDetailView = async (req, res) => {
    const [provider] = await providersModel.getProviderByIdFromDB(req.params.id)
    const products = await productsModels.getProductsByProviderFromBD(req.params.id)
    res.render('pages/admin/detail/providerDetailView', {provider, products, layout: 'layouts/adminLayout'})
}

module.exports = {
    adminView,
    productsView,
    productAddView,
    productEditView,
    productDetailView,
    collectionsView,
    collectionAddView,
    collectionEditView,
    collectionDetailView,
    collectionsHomeView,
    collectionsHomeUpdate,
    usersViews,
    providersView,
    providerAddView,
    providerEditView,
    providerDetailView
}