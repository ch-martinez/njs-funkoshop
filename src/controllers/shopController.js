const {
    getAllProductsFromBD,
    getProductByIDFromBD,
    getProductsByCollectionFromBD
} = require('../models/productsModel')

const shopView = async (req, res) => {
    const collectionID = req.query.c
    let products = null
    const page = {
        title: 'Funkos - FS'
    }
    if (collectionID == undefined){
        products = await getAllProductsFromBD()
    }else{
        products = await getProductsByCollectionFromBD(collectionID)
    }
    res.render('pages/shop/shop', {page, products})
}

const productView = async (req, res) => {
    const products = await getAllProductsFromBD()
    const product = await getProductByIDFromBD(req.params.id)
    req.session.product = product
    const page = {
        title: `${product.product_name} - FS`,
        glide: true,
        lot: true
    }
    res.render('pages/shop/product', {page, product, products})
}

module.exports = {
    shopView,
    productView
}