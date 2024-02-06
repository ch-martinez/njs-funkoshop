const { pool } = require('../config/conn');

const getCartFromBD = async (userId) => {
    try {
        const [[cart]] = await pool.query('SELECT * FROM cart WHERE user_id = ?', userId)
        return cart
    } catch (error) {
        throw(error)
    }
}

const getCartDetailFromDB = async (cartId) => {
    try {
        const [cartDetail] = await pool.query('SELECT p.product_id , p.product_name , p.product_price, p.product_stock , p.img_front , col.collection_name , cd.cd_lot , cd.cd_total FROM  cart c JOIN cart_detail cd ON c.cart_id = cd.cart_id JOIN product p ON cd.product_id = p.product_id JOIN collection col ON p.collection_id = col.collection_id WHERE c.cart_id = ?;',cartId)
        return cartDetail
    } catch (error) {
        throw(error)
    }
}

const addProductToCart = async () => {
    try {
        let n = [[1,3]]
        const [res] = await pool.query(`SELECT p.product_id , p.product_name , p.product_price, p.product_stock , p.img_front , c.collection_name FROM  product p join collection c ON p.collection_id = c.collection_id WHERE p.product_id IN (?)`, n)
        return res
    } catch (error) {
        throw(error)
    }
}

const getCartProductsFromDB = async (cart) => {
    try{
        const res = await pool.query('SELECT p.*, c.collection_name FROM product p JOIN collection c ON p.collection_id = c.collection_id WHERE p.product_id IN (?)', [cart])
    } catch(error) {
        throw(error)
    }
}

module.exports = {
    getCartFromBD,
    getCartDetailFromDB,
    addProductToCart,
    getCartProductsFromDB
}
