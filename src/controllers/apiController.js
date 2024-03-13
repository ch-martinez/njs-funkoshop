const cartModel = require('../models/cartModel')


const addProductToCartInDB = async (req, res) => {
    cartModel.addProductToCartDB(req.body)
    res.send()
}

const updateProductInCartDB = async (req, res) => {
    cartModel.updateCartDetailDB(req.body)
    res.send()
}

const updateCartDB = async (req, res) => {
    cartModel.updateCartDB(req.body)
    res.send()
}

const deletProductInCartDB = async(req, res) => {
    cartModel.deletProductInCartDetailDB(req.body.product_id)
    res.send()
}

module.exports = {
    addProductToCartInDB,
    updateProductInCartDB,
    updateCartDB,
    deletProductInCartDB
}