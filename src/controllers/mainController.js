const collectionsModels = require('../models/collectionsModel')
const productsModels = require('../models/productsModel')

const homeView = async (req, res) => {
    const products = await productsModels.getAllProductsFromBD()
    const collections = await collectionsModels.getCollectionsHomeActiveFromDB()
    const page = {
        title: 'FunkoShop',
        glide: true
    }
    res.render('pages/main/home', {page, products, collections})
}

module.exports = {
    homeView
}