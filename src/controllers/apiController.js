const cartModel = require('../models/cartModel')
const cookieService = require('../services/cookieService')

/* 
********************* FUNCIONES AXULIARES
*/

// Determina si hay que añadir o actualizar el producto en el carrito
const addProductToCartInDB = async (cart_id, product) => {
    const responseModel = await cartModel.isProductInCartDB(cart_id, product.product_id)
    if (!responseModel){
        return await cartModel.addProductToCartDB(cart_id,product)
    }else{
        return await cartModel.updateProductInCartDB(cart_id, product)
    }
}

const deletProductInCartDB = async(cart_id, product) => {
    const responseModel = await cartModel.isProductInCartDB(cart_id, product.product_id)
    if (responseModel){
        return await cartModel.deletProductInCartDetailDB(cart_id, product)
    }else{
        return {status:200, message:'No existe el producto en el carrito'}
    }
}

/* 
********************* API
*/
// Añade/Actualiza el producto en el carrito, luego actualiza la informacion del carrito
const addProductToCart = async (req,res) => {
    try {
        const cart_id = await cookieService.getCartIdFromCookie(req.headers.cookie)
        let responseModel = await addProductToCartInDB(cart_id, req.body)
        if (responseModel.status == 200 || responseModel.status == 201){
            await cartModel.updateCartDB(cart_id)
            return res.status(responseModel.status).send({message: responseModel.message})
        } else {
            throw new Error(responseModel)
        }
    } catch (error) {
        return res.status(500).send({message: 'Se produjo un error al añadir el producto', reference: error.message})
    }
}

const deletProductInCart = async (req,res) => {
    try {
        const cart_id = await cookieService.getCartIdFromCookie(req.headers.cookie)
        let responseModel = await deletProductInCartDB(cart_id, req.body)
        await cartModel.updateCartDB(cart_id)
        return res.status(responseModel.status).send({message: responseModel.message})
    } catch (error) {
        return res.status(501).send({message: 'Se produjo un error al eliminar el producto', reference: error.message})
    }
}

const getCart = async (req, res) => {
    try {
        const cart_id = cookieService.getCartIdFromCookie(req.headers.cookie)
        const responseModel = await cartModel.getCartFromDB(cart_id)
        const cart = {
            resume: await cartModel.getCartFromDB(cart_id),
            list: await cartModel.getCartListFromDB(cart_id)
        }
        return res.status(responseModel.status).send(cart)
    } catch (error) {
        return res.status(responseModel.status).send(responseModel.message, responseModel.reference)
    }
}

const getProductsTotalQuantity = async (req, res) => {
    try {
        const cart_id = await cookieService.getCartIdFromCookie(req.headers.cookie)
        const responseModel = await cartModel.getProductsTotalQuantityFromDB(cart_id)
        return res.status(200).send({productsTotalQuantity: responseModel})
    } catch (error) {
        return res.send({msj: 'error'})
    }
}

module.exports = {
    addProductToCart,
    deletProductInCart,
    getProductsTotalQuantity,
    getCart
}