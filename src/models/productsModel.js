const { pool } = require('../config/conn');

const getAllProductsFromBD = async () => {
    try {
        const [products] = await pool.query("SELECT p.*, c.collection_name, c.collection_sku FROM product p JOIN collection c ON p.collection_id = c.collection_id")
        return products
    } catch (error) {
        throw(error)
    }
}

const getProductsByCollectionFromBD = async (collectionID) => {
    try {
        const [products] = await pool.query("SELECT p.*, c.collection_name, c.collection_sku FROM product p JOIN collection c ON p.collection_id = c.collection_id WHERE p.collection_id = ?", collectionID)
        return products
    } catch (error) {
        throw(error)
    }
}

const getProductByIDFromBD = async (id) => {
    try {
        const [[product]] = await pool.query("SELECT p.*, c.collection_id,  c.collection_sku, c.collection_name FROM product p JOIN collection c ON p.collection_id = c.collection_id WHERE p.product_id = ?", id)
        return product
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    getAllProductsFromBD,
    getProductsByCollectionFromBD,
    getProductByIDFromBD
}