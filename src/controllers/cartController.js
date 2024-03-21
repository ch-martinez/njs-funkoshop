const cartModel = require('../models/cartModel')
const cookieService = require('../services/cookieService')

const cartView = async (req, res) => {
    const cart_id = await cookieService.getCartIdFromCookie(req.headers.cookie)
    const page = {
        title: 'Carrito de compras - FS',
        isEmpty: await cartModel.cartDetailEmptyInDB(cart_id),
    }
    if (page.isEmpty) {
        res.render('pages/shop/cart', {page})
    }else{
        const cart = {
            resume: await cartModel.getCartFromDB(cart_id),
            list: await cartModel.getCartListFromDB(cart_id)
        }
        res.render('pages/shop/cart', {page, cart})
    }
}

// FUNCION MOMENTANEA PARA EL POST
const cartViewPost = async (req, res) => {
    console.log(req.body)
}

module.exports = {
    cartView,
    cartViewPost
}