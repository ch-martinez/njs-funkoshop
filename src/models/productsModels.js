const { conn } = require('../config/conn');

const getAllProductsFromBD = async () => {
    try {
        const [products] = await conn.query("SELECT `product`.`product_id`, `product`.`product_name`, `product`.`product_description`, `product`.`product_price`, `product`.`product_stock`, `product`.`product_discount`, `product`.`product_sku`, `product`.`product_dues`, `product`.`img_front`, `product`.`img_back`, `collection`.`collection_name` FROM `collection` LEFT JOIN `product` ON `collection`.`collection_id` = `product`.`collection_id`")
        return products
    } catch (error) {
        throw(error)
    }
}

const getProductByIDFromBD = async (id) => {
    try {
        const [product] = await conn.query("SELECT `product`.`product_id`, `product`.`product_name`, `product`.`product_description`, `product`.`product_price`, `product`.`product_stock`, `product`.`product_discount`, `product`.`product_sku`, `product`.`product_dues`, `product`.`img_front`, `product`.`img_back`, `collection`.`collection_name` FROM `collection` LEFT JOIN `product` ON `collection`.`collection_id` = `product`.`collection_id` WHERE `product`.`product_id` = ?", id)
        return product
    } catch (error) {
        throw(error)
    }
}

module.exports = {  
    getAllProductsFromBD,
    getProductByIDFromBD
}