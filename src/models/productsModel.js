const { pool } = require('../config/conn');

// Devuelve listado de todos los productos
const getAllProductsFromBD = async () => {
    try {
        const [products] = await pool.query("SELECT p.*, c.collection_name, p2.provider_name  FROM product p JOIN collection c ON p.collection_id = c.collection_id JOIN providers p2 ON p.provider_id = p2.provider_id")
        return products
    } catch (error) {
        console.log({message:'getAllProductsFromBD ERROR', reference: error.message})
    }
}

// Devuelve el producto segun el id indicado
const getProductByIDFromBD = async (product_id) => {
    try {
        const [[product]] = await pool.query(`SELECT p.*, c.collection_id,  c.collection_sku, c.collection_name FROM product p JOIN collection c ON p.collection_id = c.collection_id WHERE p.product_id = ${product_id}`)
        return product
    } catch (error) {
        console.log({message:'getProductByIDFromBD ERROR', reference: error.message})
    }
}

// Devuelve listado de todos los productos pertenecientes a la coleccion indicada
const getProductsByCollectionFromBD = async (collection_id) => {
    try {
        const [products] = await pool.query(`SELECT p.*, c.collection_name, c.collection_sku FROM product p JOIN collection c ON p.collection_id = c.collection_id WHERE p.collection_id = ${collection_id}`)
        return products
    } catch (error) {
        console.log({message:'getProductsByCollectionFromBD ERROR', reference: error.message})
    }
}

module.exports = {
    getAllProductsFromBD,
    getProductByIDFromBD,
    getProductsByCollectionFromBD
}