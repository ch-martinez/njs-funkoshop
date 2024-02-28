const cartController = require('../models/cartModel')


const addProductToCartInDB = async (req, res) => {
    cartController.addProductToCartDB(req.body)
    res.send()
}

const updateProductInCartDB = async (req, res) => {
    cartController.updateCartDetailDB(req.body)
    res.send()
}

const updateCartDB = async (req, res) => {
    cartController.updateCartDB(req.body)
    res.send()
}

const deletProductInCartDB = async(req, res) => {
    cartController.deletProductInCartDetailDB(req.body.product_id)
    res.send()
}

module.exports = {
    addProductToCartInDB,
    updateProductInCartDB,
    updateCartDB,
    deletProductInCartDB
}