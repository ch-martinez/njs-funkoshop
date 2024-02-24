const cartModel = require('../models/cartModel')

const cartView = async (req, res) => {
    const cart = {
        list: await cartModel.getCartListFromBD(),
        resume: await cartModel.getCartFromBD()
    }
    const page = {
        title: 'Carrito de compras - FS'
    }
    res.render('pages/shop/cart', {page, cart})
}


const cartViewPost = async (req, res) => {
    console.log(req.body)
}

module.exports = {
    cartView,
    cartViewPost
}