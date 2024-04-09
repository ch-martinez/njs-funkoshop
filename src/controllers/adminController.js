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
    const product = await productsModels.getProductByIDFromBD(req.params.id)
    const collections = await collectionsModels.getAllCollectionsFromBD()
    const providers = await providersModel.getAllProvidersFromDB()
    res.render('pages/admin/edit/productEditView', {product, collections, providers, layout: 'layouts/adminLayout'})
}

const productEdit = async (req, res) => {
    const product = {
        product_id: req.params.id,
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: Number(req.body.product_price),
        product_discount: Number(req.body.product_discount),
        product_dues: Number(req.body.product_dues),
        product_interes: Number(req.body.product_interes),
        product_sku: req.body.product_sku,
        product_stock: Number(req.body.product_stock),
        product_state: req.body.product_state == 'on' ? 1 : 0,
        collection_id: Number(req.body.collection_id),
        provider_id: Number(req.body.provider_id),
        img_front: req.body.img_front,
        img_back: req.body.img_back,
    }
    await productsModels.updateProductByID(product)
    res.redirect('/admin/products')
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

const collectionEdit = async (req, res) => {
    const collection = {
        collection_id: Number(req.params.id),
        collection_name: req.body.collection_name,
        collection_description: req.body.collection_description,
        collection_sku: req.body.collection_sku,
        ch_active: req.body.ch_active == 'on' ? 1 : 0
    }
    await collectionsModels.updateCollectionByID(collection)
    res.redirect('/admin/collections')
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
    try {
        req.body.forEach(collection => {
            const res = collectionsModels.updateCollectionHome(collection)
            if (res.status == 500) {
                throw new Error(res)
            }
        })
        res.status(200).send({message:'Se actualizo la colecction'})
    } catch (error) {
        return res.status(500).send({message: 'Se produjo un error al actualizar las colecciones en home', reference: error.message})
    }
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

const providerEdit = async (req, res) => {
    const provider = {
        provider_id: Number(req.params.id),
        provider_name: req.body.provider_name,
        provider_tel: req.body.provider_tel,
        provider_observation: req.body.provider_observation
    }
    await providersModel.updateProviderByID(provider)
    res.redirect('/admin/providers')
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
    productEdit,
    productDetailView,
    collectionsView,
    collectionAddView,
    collectionEditView,
    collectionEdit,
    collectionDetailView,
    collectionsHomeView,
    collectionsHomeUpdate,
    usersViews,
    providersView,
    providerAddView,
    providerEditView,
    providerEdit,
    providerDetailView
}