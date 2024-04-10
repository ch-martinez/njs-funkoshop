const cartModel = require('../models/cartModel')
const cookieService = require('../services/cookieService')

const cartView = async (req, res) => {
    const cart_id = await cookieService.getCartIdFromCookie(req.headers.cookie)
    const page = {
        title: 'Carrito de compras - FS',
        isEmpty: await cartModel.cartDetailEmptyInDB(cart_id),
    }
    if (page.isEmpty) {
        res.render('pages/shop/cart/cart', {page})
    }else{
        const cart = {
            resume: await cartModel.getCartFromDB(cart_id),
            list: await cartModel.getCartListFromDB(cart_id)
        }
        res.render('pages/shop/cart/cart', {page, cart})
    }
}

// FUNCION MOMENTANEA PARA EL POST
const cartViewPost = async (req, res) => {
    console.log(req.body)
}

const checkoutView = async (req, res) => {

    const page = {
        title: 'Carrito de compras - FS',
    }
    res.render('pages/shop/cart/checkout', {page})
}

module.exports = {
    cartView,
    cartViewPost,
    checkoutView
}