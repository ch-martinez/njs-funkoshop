const usersModels = require('../models/usersModel')
const collectionsModels = require('../models/collectionsModel')
const productsModels = require('../models/productsModel')

const adminView = (req, res) => {
    console.log(req.session.user)
    res.render('pages/admin/admin', {layout: 'layouts/adminLayout'})
}

/* Products */
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
    console.log(req.params.id)
    const product = await productsModels.getProductByIDFromBD(req.params.id)
    res.render('pages/admin/edit/productEditView', {product, collections, layout: 'layouts/adminLayout'})
}

/* Collections */
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

/* Users */
const usersViews = async (req, res) => {
    const users = await usersModels.getAllUsersFromDB()
    res.render('pages/admin/usersAdmin', {users, layout: 'layouts/adminLayout'})
}

module.exports = {
    adminView,
    productsView,
    productAddView,
    productEditView,
    collectionsView,
    collectionAddView,
    collectionEditView,
    collectionsHomeView,
    collectionsHomeUpdate,
    usersViews
}