const cartModel = require('../models/cartModel')

const cartView = async (req, res) => {
    /* console.log(req.session.cart.list)
    const cart = await cartModel.getCartProductsFromDB(req.session.cart.list)
    console.log(cart)
    const page = {
        title: 'Carrito de compras - FS'
    }
    res.render('pages/shop/cart', {page, cart}) */
    console.log(JSON.parse(localStorage.cart))

}

module.exports = {
    cartView
}