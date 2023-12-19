const collectionsModels = require('../models/collectionsModels')

const productsModels = require('../models/productsModels')

const homeView = async (req, res) => {
    const products = await productsModels.getAllProductsFromBD()
    const collections = await collectionsModels.getAllCollectionsFromBD()
    const page = {
        title: 'FunkoShop',
        glide: true
    }
    res.render('pages/main/home', {page, products, collections})
}

module.exports = {
    homeView
}