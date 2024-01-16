const usersModels = require('../models/usersModels')
const collectionsModels = require('../models/collectionsModels')
const productsModels = require('../models/productsModels')

const adminView = (req, res) => {
    res.render('pages/admin/admin', {layout: 'layouts/adminLayout'})
}

const productsView = async (req, res) => {
    const products = await productsModels.getAllProductsFromBD()
    res.render('pages/admin/productsAdmin', {products ,layout: 'layouts/adminLayout'})
}

const collectionsView = async (req, res) => {
    const collections = await collectionsModels.getAllCollectionsFromBD()
    res.render('pages/admin/collectionsAdmin', {collections ,layout: 'layouts/adminLayout'})
}

const usersViews = async (req, res) => {
    const users = await usersModels.getAllUsersFromDB()
    res.render('pages/admin/usersAdmin', {users, layout: 'layouts/adminLayout'})
}

module.exports = {
    adminView,
    productsView,
    collectionsView,
    usersViews
}