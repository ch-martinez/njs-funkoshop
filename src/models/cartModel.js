//const { query } = require('express');
const { pool } = require('../config/conn');

// ************************** sirve aun?
/* const initializeCartInDB = async (user_id) => {
    try {
        await pool.query(`INSERT INTO cart (user_id) VALUES (${user_id})`)
    } catch (error) {
        console.log({message:'initializeCartInDB ERROR', reference: error.message})
    }
} */

// AUX: Indica si el carrito esta vacio en la DB
const cartDetailEmptyInDB = async (cart_id) => {
    try {
        const [[response]] = await pool.query(`SELECT COUNT(*) AS products_quantity  FROM cart_detail cd WHERE cart_id = ${cart_id}`)
        return (response.products_quantity == 0) ? true : false
    } catch (error) {
        console.log({message:'cartDetailEmptyInDB ERROR', reference: error.message})
    }
}

// Consulta si el producto ya existe en la BD
const isProductInCartDB = async (cart_id, product_id) => {
    try {
        const [response] = await pool.query(`SELECT product_id FROM cart_detail WHERE product_id = ${product_id} AND cart_id = ${cart_id}`)
        return response
    } catch (error) {
        console.log({message:'isProductInCartDB ERROR', reference: error.message})
    }
}

// Devuelve la cantidad total de productos en el carrito
const getProductsTotalQuantityFromDB = async (cart_id) => {
    try {
        const [[respone]] = await pool.query(`SELECT SUM(product_quantity) AS products_total FROM cart_detail cd WHERE cart_id = ${cart_id}`)
        return respone.products_total
    } catch (error) {
        console.log({message:'getProductsTotalQuantityFromDB ERROR', reference: error.message})
    }
}

// Devuelve el cart_id segun el user_id indicado
const getCartIdFromDB = async (user_id) => {
    try {
        const [[response]] = await pool.query(`SELECT cart_id FROM cart WHERE user_id = ${user_id}`)
        return response.cart_id
    } catch (error) {
        console.log({message:'getCartIdFromDB ERROR', reference: error.message})
    }
}

// Devuelve el carrito de la DB
const getCartFromDB = async (cart_id) => {
    try {
        const [[response]] = await pool.query(`SELECT cart_subtotal, cart_ship, cart_coupon, cart_total  FROM cart c WHERE cart_id = ${cart_id} `)
        return response
    } catch (error) {
        console.log({message:'getCartFromDB ERROR', reference: error.message})
    }
}

// Devuelve el listado de productos del carrito en DB
const getCartListFromDB = async (cart_id) => {
    try {
        //OPTIMIZAR CONSULTA
        const [response] = await pool.query(`
            SELECT * 
            FROM
                (product p JOIN collection c ON p.collection_id = c.collection_id)
            JOIN
                cart_detail cd
            ON
                p.product_id = cd.product_id
            WHERE cd.cart_id = ${cart_id}
            ORDER BY cd.create_time ASC `)
        return response
    } catch (error) {
        console.log({message:'getCartListFromDB ERROR', reference: error.message})
    }
}

// Añade un producto al carrito en DB
const addProductToCartDB = async (cart_id, product) => {
    try {
        await pool.query(`INSERT INTO cart_detail (cart_id, product_id, product_quantity) VALUES ( ${cart_id}, ${product.product_id},${product.product_quantity})`)
        return {status:201, message:'Se añado producto al carrito'}
    } catch (error) {
        console.log({message:'addProductToCartDB ERROR', reference: error.message})
    }
}

// Borra un producto del carrito en DB
const deletProductInCartDetailDB = async (cart_id, product) => {
    try {
        await pool.query(`DELETE FROM cart_detail WHERE cart_id = ${cart_id} AND product_id = ${product.product_id}`)
        return {status:200, message:'Se elimino el producto del carrito'}
    } catch (error) {
        console.log({message:'deletProductInCartDetailDB ERROR', reference: error.message})
    }
}

// Actualiza la informacion del carrito
const updateCartDB = async (cart_id) => {
    try {
        const cartEmpty = await cartDetailEmptyInDB(cart_id)
        if (cartEmpty) {
            await pool.query(`UPDATE cart
            SET 
                cart_subtotal = (0),
                cart_total = (((cart_subtotal * cart_coupon) / 100) + cart_ship )
            WHERE cart_id = ${cart_id}`)
        }else{
            await pool.query(`UPDATE cart
            SET 
                cart_subtotal = (
                    SELECT
                        SUM(p.product_price * cd.product_quantity)
                    FROM 
                        product p 
                    INNER JOIN
                        cart_detail cd 
                    ON
                        cd.product_id = p.product_id
                    WHERE cd.cart_id = ${cart_id}
                ),
                cart_total = (((cart_subtotal * cart_coupon) / 100) + cart_ship )
            WHERE cart_id = ${cart_id}`)
        }
        return {status:201, message:'Se actualizo la informacion del carrito'}
    } catch (error) {
        console.log({message:'updateCartDB ERROR', reference: error.message})
    }
}

// Actualiza la cantidad de un producto en el carrito en DB
const updateProductInCartDB = async (cart_id, product) => {
    try {
        await pool.query(`
            UPDATE cart_detail
            SET product_quantity = (${product.product_quantity})
            WHERE cart_id = ${cart_id} AND cart_detail.product_id = ${product.product_id}`)
        return {status:200, message:'Se actualizo producto en el carrito'}
    } catch (error) {
        console.log({message:'updateProductInCartDB ERROR', reference: error.message})
    }
}


module.exports = {
    //initializeCartInDB,
    isProductInCartDB,
    getProductsTotalQuantityFromDB,
    getCartIdFromDB,
    getCartFromDB,
    getCartListFromDB,
    addProductToCartDB,
    deletProductInCartDetailDB,
    updateCartDB,
    updateProductInCartDB
}
