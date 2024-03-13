const { query } = require('express');
const { pool } = require('../config/conn');

const getCartFromBD = async () => {
    try {
        const [[response]] = await pool.query('SELECT c.* FROM cart c')
        return response
    } catch (error) {
        throw(error)
    }
}


const getCartListFromBD = async () => {
    try {
        //OPTIMIZAR CONSULTA
        const [response] = await pool.query('SELECT * FROM (product p JOIN collection c ON p.collection_id = c.collection_id) JOIN cart_detail cd ON p.product_id = cd.product_id;')
        return response
    } catch (error) {
        throw(error)
    }
}

/* CRUD */

const addProductToCartDB = async (product) => {
    try {
        await pool.query(`INSERT INTO cart_detail (cart_id, product_id, cd_lot, cd_total) VALUES (1, ${product.product_id}, ${product.product_quantity}, ${product.product_price})`)
    } catch (error) {
        throw(error)
    }
}

const updateCartDB = async (cart) => {
    try {
        await pool.query(`UPDATE cart SET cart_ship = ${cart.ship}, cart_subtotal = ${cart.subtotal}, cart_total = ${cart.total}, cart_coupon = ${cart.coupon} WHERE user_id = ${2}`)
    } catch (error) {
        throw(error)
    }
}

const deletProductInCartDetailDB = async (product_id) => {
    try {
        await pool.query(`DELETE FROM cart_detail WHERE product_id = ${product_id} AND cart_id = ${1}`)
    } catch (error) {
        throw(error)
    }
}

const updateCartDetailDB = async (product) => {
    try {
        await pool.query(`UPDATE cart_detail SET cd_lot = ${product.product_quantity} WHERE product_id = ${product.product_id}`)
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    getCartFromBD,
    getCartListFromBD,
    deletProductInCartDetailDB,
    addProductToCartDB,
    updateCartDB,
    updateCartDetailDB
}
